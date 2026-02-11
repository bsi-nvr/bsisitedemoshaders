"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"

import { GrainOverlay } from "@/components/grain-overlay"

import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState, useMemo } from "react"
import { siteContent, type Language } from "@/lib/content"
import { shaderThemes, type ThemeKey, type ShaderTheme } from "@/lib/shader-themes"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [language, setLanguage] = useState<"en" | "nl">("en")
  const buttonText = "Helpdesk"
  const [currentThemeKey, setCurrentThemeKey] = useState<ThemeKey | "custom">("default")
  const [customPrimary, setCustomPrimary] = useState("#3b82f6")
  const [customSecondary, setCustomSecondary] = useState("#10b981")

  const currentTheme: ShaderTheme = useMemo(() => {
    if (currentThemeKey !== "custom") {
      return shaderThemes[currentThemeKey]
    }

    // Dynamic generation for custom theme
    return {
      name: "Custom",
      swirl: {
        colorA: customPrimary,
        colorB: customSecondary,
      },
      chromaFlow: {
        baseColor: customPrimary, // Simplified mapping
        upColor: customPrimary,
        downColor: customSecondary,
        leftColor: customSecondary,
        rightColor: customPrimary,
      },
    }
  }, [currentThemeKey, customPrimary, customSecondary])
  // Removed touch and wheel interaction refs as native scroll snap handles this better
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number | null>(null)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const lang = navigator.language
      if (lang.startsWith("nl")) {
        setLanguage("nl")
      }
    }
  }, [])

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const lang = navigator.language
      if (lang.startsWith("nl")) {
        setLanguage("nl")
      }
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  // Touch and Wheel event listeners removed in favor of CSS Scroll Snap

  // Re-enable wheel support for vertical-to-horizontal scrolling
  // Re-enable wheel support for vertical-to-horizontal scrolling
  // Discrete scroll logic for desktop mouse wheel
  useEffect(() => {
    let wheelTimeout: NodeJS.Timeout
    let wheelDelta = 0
    const WHEEL_THRESHOLD = 50
    const COOLDOWN = 800 // ms

    const handleWheel = (e: WheelEvent) => {
      // Focus on vertical scrolling
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault() // Stop native scroll validation

        // If we are currently scrolling (cooldown active), ignore input
        if (wheelTimeout) return

        wheelDelta += e.deltaY

        if (wheelDelta > WHEEL_THRESHOLD) {
          // Scroll Down / Next
          if (currentSection < 3) {
            scrollToSection(currentSection + 1)
            // Set cooldown
            wheelTimeout = setTimeout(() => {
              wheelDelta = 0
              // @ts-ignore
              wheelTimeout = null
            }, COOLDOWN)
          } else {
            wheelDelta = 0 // Reset if at end
          }
        } else if (wheelDelta < -WHEEL_THRESHOLD) {
          // Scroll Up / Prev
          if (currentSection > 0) {
            scrollToSection(currentSection - 1)
            // Set cooldown
            wheelTimeout = setTimeout(() => {
              wheelDelta = 0
              // @ts-ignore
              wheelTimeout = null
            }, COOLDOWN)
          } else {
            wheelDelta = 0 // Reset if at start
          }
        }
      }
    }

    // Attach to window
    window.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      clearTimeout(wheelTimeout)
    }
  }, [currentSection])

  // Update section monitoring
  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = null
          return
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 3) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = null
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">

      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA={currentTheme.swirl.colorA}
            colorB={currentTheme.swirl.colorB}
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor={currentTheme.chromaFlow.baseColor}
            upColor={currentTheme.chromaFlow.upColor}
            downColor={currentTheme.chromaFlow.downColor}
            leftColor={currentTheme.chromaFlow.leftColor}
            rightColor={currentTheme.chromaFlow.rightColor}
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <div />

        {/* Centered Navigation Links */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
          {["home", "services", "about", "contact"].map((key, index) => (
            <button
              key={key}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                }`}
            >
              {siteContent[language].nav[key as keyof typeof siteContent.en.nav]}
              <span
                className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-foreground transition-transform duration-300 ${currentSection === index ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
              />
            </button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden items-center md:flex">
          <div className="mr-6 flex items-center gap-2 font-mono text-sm">
            <button
              onClick={() => setLanguage("nl")}
              className={`transition-colors hover:text-foreground ${language === "nl" ? "text-foreground font-bold" : "text-foreground/40"
                }`}
            >
              NL
            </button>
            <span className="text-foreground/20">/</span>
            <button
              onClick={() => setLanguage("en")}
              className={`transition-colors hover:text-foreground ${language === "en" ? "text-foreground font-bold" : "text-foreground/40"
                }`}
            >
              EN
            </button>
          </div>
          <MagneticButton variant="secondary" onClick={() => window.open("https://helpdesk.brainsoftict.nl/", "_blank")}>
            {buttonText}
          </MagneticButton>
        </div>
      </nav>

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section */}
        <section className="flex min-h-screen w-screen shrink-0 snap-start flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24">
          <div className="max-w-3xl">

            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-white duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance">
                {siteContent[language].hero.title}
                <br />
                {siteContent[language].hero.subtitle}
              </span>
            </h1>
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-white/90 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                {siteContent[language].hero.description}
              </span>
            </p>

          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">{siteContent[language].hero.scroll}</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>


        <ServicesSection language={language} />
        <AboutSection scrollToSection={scrollToSection} language={language} />
        <ContactSection language={language} />

        {/* Theme Switcher */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 rounded-xl border border-foreground/10 bg-background/50 p-3 backdrop-blur-md transition-opacity duration-700 md:bottom-12 md:right-12">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-foreground/60">Theme</p>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(shaderThemes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setCurrentThemeKey(key as ThemeKey)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${currentThemeKey === key
                  ? "bg-foreground text-background"
                  : "bg-foreground/5 text-foreground hover:bg-foreground/10"
                  }`}
              >
                {theme.name.split(" ")[0]}
              </button>
            ))}
            {/* Custom Theme Button */}
            <button
              onClick={() => setCurrentThemeKey("custom")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${currentThemeKey === "custom"
                ? "bg-foreground text-background"
                : "bg-foreground/5 text-foreground hover:bg-foreground/10"
                }`}
            >
              Custom
            </button>
          </div>

          {/* Custom Color Pickers */}
          {currentThemeKey === "custom" && (
            <div className="mt-2 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="primary-color" className="text-[10px] font-medium uppercase tracking-wider text-foreground/60">Primary</label>
                <input
                  id="primary-color"
                  type="color"
                  value={customPrimary}
                  onChange={(e) => setCustomPrimary(e.target.value)}
                  className="h-8 w-full cursor-pointer rounded border border-foreground/10 bg-transparent p-0"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="secondary-color" className="text-[10px] font-medium uppercase tracking-wider text-foreground/60">Secondary</label>
                <input
                  id="secondary-color"
                  type="color"
                  value={customSecondary}
                  onChange={(e) => setCustomSecondary(e.target.value)}
                  className="h-8 w-full cursor-pointer rounded border border-foreground/10 bg-transparent p-0"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main >
  )
}
