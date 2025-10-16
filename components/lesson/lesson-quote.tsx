interface LessonQuoteProps {
  quote: string
  author: string
}

export function LessonQuote({ quote, author }: LessonQuoteProps) {
  return (
    <blockquote className="bg-white border-l-6 border-[#8B4566] p-6 pl-7 my-10 rounded-lg shadow-[0_2px_12px_rgba(139,69,102,0.08)]">
      <p className="font-display text-lg italic leading-relaxed text-[#2C2C2C] mb-4 m-0">
        {quote}
      </p>
      <cite className="font-heading text-sm font-semibold not-italic text-[#8B4566]">
        — {author}
      </cite>
    </blockquote>
  )
}
