"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"
import { Mail, Phone, ArrowUpRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { siteContent, type Language } from "@/lib/content"

export function AboutSection({ scrollToSection, language = "en" }: { scrollToSection?: (index: number) => void; language?: Language }) {
  const { ref, isVisible } = useReveal(0.3)
  const content = siteContent[language].about

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center overflow-y-auto overflow-x-hidden px-6 pt-32 md:px-12 md:pt-40 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* About Brainsoft Text */}
        <div className="flex flex-col items-start space-y-6 mb-2 md:mb-6 max-w-2xl">
          <div
            className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">{content.title}</h2>
            <p className="mb-6 font-mono text-xs text-foreground/60 md:text-sm">{content.subtitle}</p>
            <p className="text-xl leading-relaxed text-foreground/90 mb-8 md:text-2xl">
              {content.description}
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <div className="mt-8"> {/* Added wrapper div for spacing if needed */}
                  <button
                    type="button"
                    aria-label="Read more"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/5 text-foreground/60 transition-all duration-300 hover:bg-foreground/10 hover:text-foreground hover:scale-110"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl bg-black/80 backdrop-blur-xl border-white/10 text-foreground">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-light mb-4 text-left">{content.modal.title}</DialogTitle>
                  <DialogDescription className="text-base text-foreground/80 leading-relaxed text-left">
                    <p className="mb-4">
                      {content.modal.p1}
                    </p>
                    <p className="mb-4">
                      {content.modal.p2}
                    </p>
                    <p>
                      {content.modal.p3}
                    </p>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-0 md:mt-4">
          <div
            className={`mb-8 transition-all duration-700 md:mb-12 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
            style={{ transitionDelay: "400ms" }}
          >
            <h2 className="font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">{content.meetTeam}</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
            {content.cards.map((person, i) => (
              <PeopleCard key={i} person={person} index={i} isVisible={isVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PeopleCard({
  person,
  index,
  isVisible,
}: {
  person: { name: string; role: string; direction: string; email?: string; phone?: string; bio?: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (person.direction) {
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
      className={`group relative transition-all duration-700 ${getRevealClass()}`} // Added relative
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        <div className="h-px w-6 bg-foreground/30 transition-all duration-300 group-hover:w-10 group-hover:bg-foreground/50" />
        <span className="font-mono text-[10px] text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-1 font-sans text-xl font-light text-foreground md:text-2xl">{person.name}</h3>
      <p className="mb-3 max-w-sm text-xs leading-relaxed text-foreground/80 md:text-sm">{person.role}</p>

      <div className="flex gap-3">
        {person.phone && (
          <a
            href={`tel:${person.phone}`}
            aria-label="Phone"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 text-foreground/60 transition-all hover:bg-foreground/10 hover:text-foreground hover:scale-110"
          >
            <Phone className="h-3.5 w-3.5" />
          </a>
        )}
        {person.email && (
          <a
            href={`mailto:${person.email}`}
            aria-label="Email"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/5 text-foreground/60 transition-all hover:bg-foreground/10 hover:text-foreground hover:scale-110"
          >
            <Mail className="h-3.5 w-3.5" />
          </a>
        )}
      </div>

      {/* Learn More Arrow */}
      <Dialog>
        <DialogTrigger asChild>
          <button className="absolute top-0 right-0 p-3 outline-none" aria-label={`Read more about ${person.name}`}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 text-foreground transition-all duration-300 group-hover:bg-foreground group-hover:text-background group-hover:scale-110">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-black/80 backdrop-blur-xl border-white/10 text-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl font-light mb-2">{person.name}</DialogTitle>
            <DialogDescription className="text-base text-foreground/80 leading-relaxed">
              <span className="block mb-4 font-mono text-xs uppercase tracking-wider text-foreground/60">{person.role}</span>
              {person.bio || "Bio content coming soon..."}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 mt-4">
            {person.phone && (
              <a href={`tel:${person.phone}`} className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" /> <span>Call</span>
              </a>
            )}
            {person.email && (
              <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" /> <span>Email</span>
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
