export default function Quote() {
  return (
    <section className="py-12 md:py-16 flex flex-col items-center md:items-end">
      <div className="relative max-w-xl">
        {/* Opening quote mark */}
        <span className="absolute -top-6 -left-2 text-text-secondary text-4xl font-bold select-none">
          &quot;
        </span>

        {/* Quote text */}
        <blockquote className="border border-border px-8 py-6 text-text-primary text-xl md:text-2xl">
          With great power comes great electricity bill
        </blockquote>

        {/* Closing quote mark */}
        <span className="absolute -bottom-6 -right-2 text-text-secondary text-4xl font-bold select-none">
          &quot;
        </span>
      </div>

      {/* Attribution */}
      <div className="border border-border border-t-0 px-6 py-3 text-text-secondary mr-0 md:mr-8">
        - Dr. Who
      </div>
    </section>
  );
}
