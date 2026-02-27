import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  linkText?: string;
  linkHref?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  linkText,
  linkHref,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`flex items-center justify-between mb-12 ${className}`}>
      <div className="flex items-center gap-4 flex-1">
        <h2 className="text-3xl font-bold text-slate-100 shrink-0">
          <span className="text-primary">#</span>
          {title}
        </h2>
        <div className="h-px bg-primary flex-1 max-w-125" />
      </div>
      {linkText && linkHref && (
        <Link
          href={linkHref}
          className="text-slate-100 hover:text-primary transition-colors text-sm whitespace-nowrap ml-4"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}
