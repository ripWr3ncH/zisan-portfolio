interface DotPatternProps {
  className?: string;
}

export default function DotPattern({ className = "" }: DotPatternProps) {
  return <div className={`dot-pattern ${className}`} aria-hidden="true" />;
}
