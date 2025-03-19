import GridPattern from "@/components/grid-pattern"

export default function Loading() {
  return (
    <div className="relative min-h-screen bg-background pb-20">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <GridPattern width={40} height={40} x={-1} y={-1} stroke="black" strokeOpacity={0.1} strokeWidth={1} />
      </div>

      <div className="container px-4 py-12 mt-32">
        <div className="flex justify-center items-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  )
}

