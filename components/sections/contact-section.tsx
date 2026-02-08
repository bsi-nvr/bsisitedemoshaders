"use client"

import { Mail, MapPin, Phone, Building, FileText } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import { siteContent, type Language } from "@/lib/content"

export function ContactSection({ language = "en" }: { language?: Language }) {
  const { ref, isVisible } = useReveal(0.3)
  const content = siteContent[language].contact
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      return
    }

    setIsSubmitting(true)

    // Simulate form submission (replace with actual API call later)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col">
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                }`}
            >
              <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
                {content.title}
              </h2>
              <p className="font-mono text-xs text-foreground/60 md:text-base">{content.subtitle}</p>
            </div>

            <div className="space-y-4 md:space-y-8">
              <a
                href="mailto:info@brainsoftict.nl"
                className={`group block transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                  }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">{content.info.email}</span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-xl">
                  info@brainsoftict.nl
                </p>
              </a>

              <a
                href="tel:+31857010329"
                className={`group block transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                  }`}
                style={{ transitionDelay: "250ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Phone className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">{content.info.phone}</span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-xl">
                  +31 (0)85 7010329
                </p>
              </a>

              <div
                className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">{content.info.address}</span>
                </div>
                <p className="text-base text-foreground md:text-xl">
                  Marconistraat 5<br />1821 BX Alkmaar
                </p>
              </div>

              <div
                className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                style={{ transitionDelay: "400ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">Postal Address</span>
                </div>
                <p className="text-base text-foreground md:text-xl">
                  P.O. Box 500<br />1800 AM Alkmaar, Netherlands
                </p>
              </div>

              <div
                className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                style={{ transitionDelay: "450ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <FileText className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">KVK Number</span>
                </div>
                <p className="text-base text-foreground md:text-xl">
                  82383650
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Minimal form */}
          <div className="flex flex-col pt-12 md:pt-44">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div
                className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                style={{ transitionDelay: "200ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">{content.form.firstName}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder={content.form.firstName}
                />
              </div>

              <div
                className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                style={{ transitionDelay: "350ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">{content.form.email}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder={content.form.email}
                />
              </div>

              <div
                className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                style={{ transitionDelay: "500ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">{content.form.message}</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder={content.form.message}
                />
              </div>

              <div
                className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                  }`}
                style={{ transitionDelay: "650ms" }}
              >
                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="w-full disabled:opacity-50"
                  onClick={isSubmitting ? undefined : undefined}
                >
                  {isSubmitting ? content.form.sending : content.form.submit}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-sm text-foreground/80">Message sent successfully!</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
