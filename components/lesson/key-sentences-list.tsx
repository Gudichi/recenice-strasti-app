interface KeySentencesListProps {
  title: string
  sentences: string[]
}

export function KeySentencesList({ title, sentences }: KeySentencesListProps) {
  return (
    <div className="bg-gradient-to-br from-[#FF6B9D] to-[#FFB3C6] rounded-2xl p-8 my-12 shadow-[0_8px_30px_rgba(255,107,157,0.25)]">
      <h3 className="font-heading text-xl font-semibold text-white mb-6">
        {title}
      </h3>
      
      <div className="flex flex-col gap-5">
        {sentences.map((sentence, index) => (
          <div key={index} className="flex gap-3 items-start">
            <span className="text-white text-2xl leading-tight flex-shrink-0">•</span>
            <p className="font-body text-base leading-relaxed text-white m-0">
              {sentence}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
