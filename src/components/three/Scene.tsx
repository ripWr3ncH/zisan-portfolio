"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { Theme } from "@/components/ThemeProvider";

/*
 * Page-wide 3D backdrop built from the portfolio's own motifs:
 *  - the dot pattern → a drifting field of soft dots
 *  - the 1px outlined squares → wireframe cubes
 *  - the translucent primary square → lit, clear-coated primary cubes
 * The camera travels down the scene with the page scroll and eases toward
 * the pointer. Everything sits behind the content and fades into the page
 * background with fog so the flat layout stays in front.
 */

const FOV = 45;
const CAMERA_Z = 10;
// World units of camera travel per viewport of page scroll (<1 → parallax).
const SCROLL_FACTOR = 0.45;
const VIEW_H = 2 * CAMERA_Z * Math.tan(THREE.MathUtils.degToRad(FOV / 2));

function readPalette() {
  const s = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) => s.getPropertyValue(name).trim() || fallback;
  return {
    primary: new THREE.Color(get("--primary", "#c778dd")),
    bg: new THREE.Color(get("--bg", "#282c33")),
    dot: new THREE.Color(get("--dot-color", "#abb2bf")),
    line: new THREE.Color(get("--text-2", "#abb2bf")),
  };
}

// Deterministic PRNG so the layout is stable between rebuilds.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute float aPhase;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.18 + aPhase * 6.2831) * 0.18;
    p.y += cos(uTime * 0.14 + aPhase * 8.0) * 0.18;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio / -mv.z;
    float twinkle = 0.55 + 0.45 * sin(uTime * 0.9 + aPhase * 40.0);
    vAlpha = twinkle * smoothstep(24.0, 7.0, -mv.z);
  }
`;

const particleFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.15, d);
    gl_FragColor = vec4(uColor, a * vAlpha * uOpacity);
  }
`;

interface Floater {
  obj: THREE.Object3D;
  spin: THREE.Vector3;
  baseY: number;
  bob: number;
  phase: number;
}

export default function Scene({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const applyThemeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL — the flat design stands on its own.
    }
    let pixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 0.1, 60);
    camera.position.set(0, 0, reduced ? CAMERA_Z : CAMERA_Z + 4);

    const palette = readPalette();
    scene.fog = new THREE.Fog(palette.bg, 9, 24);

    // ── Lighting ──────────────────────────────────────
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmrem.dispose();

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(6, 10, 8);
    const rim = new THREE.PointLight(palette.primary, 40, 26, 1.6);
    const cursorLight = new THREE.PointLight(palette.primary, 28, 12, 1.8);
    scene.add(ambient, key, rim, cursorLight);

    // ── Materials ─────────────────────────────────────
    const lineMaterial = new THREE.LineBasicMaterial({
      color: palette.line,
      transparent: true,
      opacity: theme === "light" ? 0.35 : 0.28,
      toneMapped: false,
    });
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: palette.primary,
      emissive: palette.primary,
      emissiveIntensity: 0.12,
      roughness: 0.28,
      metalness: 0.15,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.1,
      transparent: true,
      opacity: 0.55,
    });
    const glassEdgeMaterial = new THREE.LineBasicMaterial({
      color: palette.primary,
      transparent: true,
      opacity: 0.85,
      toneMapped: false,
    });
    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: isMobile ? 26 : 34 },
        uPixelRatio: { value: pixelRatio },
        uColor: { value: palette.dot.clone() },
        uOpacity: { value: theme === "light" ? 0.55 : 0.45 },
      },
    });

    const boxEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1));
    const roundedBox = new RoundedBoxGeometry(1, 1, 1, 3, 0.06);
    const roundedEdges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.002, 1.002, 1.002));

    const world = new THREE.Group();
    scene.add(world);
    let floaters: Floater[] = [];
    let particles: THREE.Points | null = null;
    let travel = 0;

    const halfWidthAt = (z: number) =>
      (CAMERA_Z - z) * Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * camera.aspect;

    // (Re)build the scene contents to span the current page height.
    const build = () => {
      world.clear();
      particles?.geometry.dispose();
      floaters = [];

      const docH = document.documentElement.scrollHeight;
      travel = Math.max(0, (docH - window.innerHeight) / window.innerHeight) * VIEW_H * SCROLL_FACTOR;
      const top = VIEW_H * 0.6;
      const bottom = -travel - VIEW_H * 0.6;
      const span = top - bottom;
      const rand = mulberry32(7);

      // Dot field
      const count = Math.round(Math.min(1600, span * (isMobile ? 9 : 22)));
      const pos = new Float32Array(count * 3);
      const scale = new Float32Array(count);
      const phase = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const z = -12 + rand() * 15;
        const hw = halfWidthAt(z) * 1.15;
        pos[i * 3] = (rand() * 2 - 1) * hw;
        pos[i * 3 + 1] = bottom + rand() * span;
        pos[i * 3 + 2] = z;
        scale[i] = 0.45 + rand() * 1.1;
        phase[i] = rand();
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      pGeo.setAttribute("aScale", new THREE.BufferAttribute(scale, 1));
      pGeo.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
      particles = new THREE.Points(pGeo, particleMaterial);
      particles.frustumCulled = false;
      world.add(particles);

      // Cubes, alternating sides so they frame the centred content column.
      const spacing = isMobile ? 7.5 : 4.2;
      const n = Math.max(3, Math.floor(span / spacing));
      for (let i = 0; i < n; i++) {
        const side = i % 2 === 0 ? 1 : -1;
        // Solid cubes stay on the right, clear of the fixed social sidebar.
        const solid = i % 4 === 0;
        const z = solid ? -1.5 - rand() * 2.5 : -2 - rand() * 6;
        const hw = halfWidthAt(z);
        // Keep cubes in the gutters beside the max-w-6xl content column.
        const contentFrac = Math.min(1, 1104 / window.innerWidth);
        // On phones there is no gutter, so cubes only peek in from the edges.
        const edge = isMobile
          ? 1.1
          : Math.min(Math.max(contentFrac + (solid ? 0.07 : 0.1), solid ? 0.92 : 0.9), solid ? 0.97 : 1.02);
        const x = side * hw * (edge + rand() * ((solid && !isMobile ? 1.0 : 1.14) - edge));
        const y = top - 1.2 - i * spacing - rand() * spacing * 0.5;
        const size = solid ? 0.38 + rand() * 0.3 : 0.7 + rand() * 0.9;

        let obj: THREE.Object3D;
        if (solid) {
          const g = new THREE.Group();
          g.add(new THREE.Mesh(roundedBox, glassMaterial));
          g.add(new THREE.LineSegments(roundedEdges, glassEdgeMaterial));
          obj = g;
        } else {
          obj = new THREE.LineSegments(boxEdges, lineMaterial);
        }
        obj.scale.setScalar(size * (isMobile ? 0.75 : 1));
        obj.position.set(x, y, z);
        obj.rotation.set(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI);
        world.add(obj);
        floaters.push({
          obj,
          spin: new THREE.Vector3((rand() - 0.5) * 0.25, (rand() - 0.5) * 0.35, (rand() - 0.5) * 0.15),
          baseY: y,
          bob: 0.12 + rand() * 0.2,
          phase: rand() * Math.PI * 2,
        });
      }
    };

    const applyTheme = () => {
      const p = readPalette();
      const light = document.documentElement.getAttribute("data-theme") === "light";
      (scene.fog as THREE.Fog).color.copy(p.bg);
      lineMaterial.color.copy(p.line);
      lineMaterial.opacity = light ? 0.35 : 0.28;
      glassMaterial.color.copy(p.primary);
      glassMaterial.emissive.copy(p.primary);
      glassEdgeMaterial.color.copy(p.primary);
      rim.color.copy(p.primary);
      cursorLight.color.copy(p.primary);
      particleMaterial.uniforms.uColor.value.copy(p.dot);
      particleMaterial.uniforms.uOpacity.value = light ? 0.55 : 0.45;
      if (reduced) renderer.render(scene, camera);
    };
    applyThemeRef.current = applyTheme;

    // ── Input ─────────────────────────────────────────
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    let scrollY = window.scrollY;
    let camY = -(scrollY / window.innerHeight) * VIEW_H * SCROLL_FACTOR;
    let velocity = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
      if (reduced) renderFrame(0);
    };

    let width = window.innerWidth;
    let height = window.innerHeight;
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Ignore mobile URL-bar height jitter.
      if (isMobile && w === width && Math.abs(h - height) < 140 && renderer.domElement.width > 0) return;
      width = w;
      height = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      build();
      if (reduced) renderFrame(0);
    };

    // ── Loop ──────────────────────────────────────────
    const clock = new THREE.Clock();
    let elapsed = 0;
    let slowFrames = 0;
    let running = false;
    const lookTarget = new THREE.Vector3();
    const cursorWorld = new THREE.Vector3();

    function renderFrame(dt: number) {
      elapsed += dt;
      const targetY = -(scrollY / window.innerHeight) * VIEW_H * SCROLL_FACTOR;
      const prevY = camY;
      camY = reduced ? targetY : camY + (targetY - camY) * Math.min(1, dt * 6);
      velocity += ((camY - prevY) / Math.max(dt, 1e-3) - velocity) * 0.1;

      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 2.5);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 2.5);

      if (!reduced) {
        camera.position.z += (CAMERA_Z - camera.position.z) * Math.min(1, dt * 1.4);
      }
      camera.position.x = pointer.x * 0.55;
      camera.position.y = camY + pointer.y * 0.35;
      lookTarget.set(pointer.x * 0.15, camY, 0);
      camera.lookAt(lookTarget);
      camera.rotation.z = THREE.MathUtils.clamp(velocity * 0.004, -0.05, 0.05);

      rim.position.set(-7, camY + 4, 3);
      cursorWorld.set(pointer.x * halfWidthAt(1), camY + pointer.y * VIEW_H * 0.45, 1.5);
      cursorLight.position.lerp(cursorWorld, Math.min(1, dt * 4));

      const boost = 1 + Math.min(4, Math.abs(velocity) * 0.35);
      for (const f of floaters) {
        f.obj.rotation.x += f.spin.x * dt * boost;
        f.obj.rotation.y += f.spin.y * dt * boost;
        f.obj.rotation.z += f.spin.z * dt * boost;
        f.obj.position.y = f.baseY + Math.sin(elapsed * 0.6 + f.phase) * f.bob;
      }
      particleMaterial.uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
    }

    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.1);
      // Adaptive quality: drop resolution if frames are consistently slow.
      if (dt > 0.034) slowFrames++;
      else slowFrames = Math.max(0, slowFrames - 1);
      if (slowFrames > 90 && pixelRatio > 1) {
        pixelRatio = 1;
        renderer.setPixelRatio(1);
        renderer.setSize(width, height, false);
        particleMaterial.uniforms.uPixelRatio.value = 1;
        slowFrames = 0;
      }
      renderFrame(dt);
    };

    const setRunning = (on: boolean) => {
      if (reduced || on === running) return;
      running = on;
      if (on) clock.getDelta();
      renderer.setAnimationLoop(on ? tick : null);
    };
    const onVisibility = () => setRunning(!document.hidden);

    // Rebuild when the page height changes (images, fonts, route content).
    let rebuildTimer: ReturnType<typeof setTimeout> | undefined;
    let lastDocH = document.documentElement.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.documentElement.scrollHeight;
      if (Math.abs(h - lastDocH) < 40) return;
      lastDocH = h;
      clearTimeout(rebuildTimer);
      rebuildTimer = setTimeout(() => {
        build();
        if (reduced) renderFrame(0);
      }, 250);
    });
    ro.observe(document.body);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    build();
    renderFrame(0);
    canvas.style.opacity = "1";

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    setRunning(!document.hidden);

    return () => {
      setRunning(false);
      renderer.setAnimationLoop(null);
      ro.disconnect();
      clearTimeout(rebuildTimer);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      applyThemeRef.current = null;
      particles?.geometry.dispose();
      boxEdges.dispose();
      roundedBox.dispose();
      roundedEdges.dispose();
      lineMaterial.dispose();
      glassMaterial.dispose();
      glassEdgeMaterial.dispose();
      particleMaterial.dispose();
      envTexture.dispose();
      renderer.dispose();
    };
    // Theme changes are applied in place below, not by rebuilding.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    applyThemeRef.current?.();
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none opacity-0 transition-opacity duration-1600 ease-out"
    />
  );
}
