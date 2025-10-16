interface KeyInsightBoxProps {
  title: string
  content: string
  icon?: string
}

export function KeyInsightBox({ title, content, icon = "💡" }: KeyInsightBoxProps) {
  return (
    <div className="bg-gradient-to-br from-[#FFF5EE] to-[#FFE5DC] border-l-4 border-[#FF6B9D] rounded-lg p-6 my-8 shadow-[0_2px_12px_rgba(139,69,102,0.08)] flex gap-4">
      <div className="text-3xl flex-shrink-0">{icon}</div>
      <div>
        <h4 className="font-heading text-base font-semibold text-[#8B4566] mb-2">
          {title}
        </h4>
        <p className="font-body text-base leading-relaxed text-[#2C2C2C] m-0">
          {content}
        </p>
      </div>
    </div>
  )
}
