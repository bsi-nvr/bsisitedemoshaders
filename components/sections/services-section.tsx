"use client"

import { useReveal } from "@/hooks/use-reveal"
import { siteContent, type Language } from "@/lib/content"
import { ArrowUpRight } from "lucide-react"

export function ServicesSection({ language = "en" }: { language?: Language }) {
  const { ref, isVisible } = useReveal(0.3)
  const content = siteContent[language].services

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center overflow-y-auto overflow-x-hidden px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
            }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {content.title}
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">{content.subtitle}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          {content.cards.map((service, i) => (
            <ServiceCard key={i} service={{ ...service, direction: "top" }} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// ... (existing code)

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; description: string; detailedDescription?: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group relative transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
        <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-3 font-sans text-4xl font-light text-foreground md:text-5xl lg:text-6xl">{service.title}</h3>
      <p className="max-w-md text-lg leading-relaxed text-foreground/80 md:text-xl mb-6">{service.description}</p>

      {/* Glass Icon Button / Dialog Trigger */}
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label="Read more"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-foreground/60 transition-all duration-300 hover:bg-foreground/10 hover:text-foreground hover:scale-110"
          >
            <ArrowUpRight className="h-5 w-5" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-black/80 backdrop-blur-xl border-white/10 text-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light mb-4">{service.title}</DialogTitle>
            <DialogDescription className="text-base text-foreground/80 leading-relaxed">
              {service.detailedDescription}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
