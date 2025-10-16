interface ActionStep {
  title: string
  description: string
}

interface ActionStepsChecklistProps {
  title: string
  steps: ActionStep[]
}

export function ActionStepsChecklist({ title, steps }: ActionStepsChecklistProps) {
  return (
    <div className="my-12">
      <h3 className="font-heading text-xl font-semibold text-[#8B4566] mb-6">
        {title}
      </h3>
      
      <div className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-[#FF6B9D] text-white rounded-full flex items-center justify-center font-heading text-lg font-bold flex-shrink-0">
              {index + 1}
            </div>
            <div>
              <h4 className="font-heading text-lg font-semibold text-[#2C2C2C] mb-2">
                {step.title}
              </h4>
              <p className="font-body text-base leading-relaxed text-[#6B6B6B] m-0">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
