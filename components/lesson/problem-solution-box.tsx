interface ProblemSolutionBoxProps {
  problem: {
    icon: string
    title: string
    description: string
  }
  solution: {
    icon: string
    title: string
    description: string
  }
}

export function ProblemSolutionBox({ problem, solution }: ProblemSolutionBoxProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 bg-white border-2 border-[#2C2C2C] rounded-xl p-6 my-10 shadow-[4px_4px_0px_#2C2C2C]">
      {/* Problem Side */}
      <div className="text-center">
        <div className="text-4xl mb-3">{problem.icon}</div>
        <h4 className="font-heading text-lg font-bold uppercase text-[#2C2C2C] mb-2">
          {problem.title}
        </h4>
        <p className="font-body text-[#2C2C2C] leading-relaxed">
          {problem.description}
        </p>
      </div>
      
      {/* Arrow */}
      <div className="flex items-center justify-center">
        <div className="text-3xl text-[#FF6B9D] font-bold md:block hidden">→</div>
        <div className="text-3xl text-[#FF6B9D] font-bold md:hidden block transform rotate-90">↓</div>
      </div>
      
      {/* Solution Side */}
      <div className="text-center">
        <div className="text-4xl mb-3">{solution.icon}</div>
        <h4 className="font-heading text-lg font-bold uppercase text-[#8B4566] mb-2">
          {solution.title}
        </h4>
        <p className="font-body text-[#2C2C2C] leading-relaxed">
          {solution.description}
        </p>
      </div>
    </div>
  )
}
