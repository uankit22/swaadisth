import { Star, Trophy, Package } from "lucide-react"
import GridPattern from "./grid-pattern"

const features = [
  {
    icon: Star,
    title: "Swaadishta Exclusives",
    description: "For connoisseurs on the hunt for the latest, greatest, and rarest snacks.",
  },
  {
    icon: Trophy,
    title: "One-stop Snack Shop",
    description: "From traditional mathris to modern treats and beyond. Get 'em all here.",
  },
  {
    icon: Package,
    title: "Free Shipping Over ₹999",
    description: "Load up on snacks, we'll cover shipping. Pretty sweet deal, eh?",
  },
]

export default function Features() {
  return (
    <div className="bg-gradient-to-br from-background via-background to-muted/30 py-24 relative overflow-hidden">
      {/* Premium background effect */}
      <div className="absolute inset-0 z-0">
        <GridPattern opacity={0.1} />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Large Heading */}
          <div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-foreground">
              Want.
              <br />
              All.
              <br />
              Snacks.
            </h2>
            <p className="text-xl mt-6 text-muted-foreground max-w-lg font-medium">
              So many crunchy, cheesy, sweet, and savory reasons to try Swaadishta.
            </p>
          </div>

          {/* Right side - Features */}
          <div className="space-y-16">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-lg text-muted-foreground font-medium">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

