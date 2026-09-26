interface CubeProps {
  /** Edge length in px. */
  size: number;
  /** Classes for the positioned wrapper. */
  className?: string;
  /** Classes applied to every face (border / fill). */
  faceClassName?: string;
  reverse?: boolean;
}

/** CSS-3D cube whose faces reuse the flat square styling. */
export default function Cube({ size, className = "", faceClassName = "", reverse = false }: CubeProps) {
  return (
    <div
      className={`cube-scene ${className}`}
      style={{ width: size, height: size, ["--cube-size" as string]: `${size}px` }}
      aria-hidden="true"
    >
      <div className={`cube ${reverse ? "cube-reverse" : ""}`}>
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={`cube-face ${faceClassName}`} />
        ))}
      </div>
    </div>
  );
}
