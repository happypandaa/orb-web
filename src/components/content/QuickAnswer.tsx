interface QuickAnswerProps {
  items: string[];
  locale: "en" | "zh";
}

export function QuickAnswer({ items, locale }: QuickAnswerProps) {
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="quick-answer-title"
      className="quick-answer rounded-[20px] border border-black/10 bg-[#f5f5f7] px-4 py-3 sm:px-5 sm:py-4"
    >
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d65313]">
        {locale === "zh" ? "先看答案" : "Quick answer"}
      </p>
      <h2
        id="quick-answer-title"
        className="text-[18px] font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-[20px]"
      >
        {locale === "zh" ? "这页最重要的内容" : "The essential answer"}
      </h2>
      <ul className="mt-2.5 grid gap-1.5 text-[13px] leading-[1.55] text-[#424245] sm:text-[14px]">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6a1a]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
