"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"

// Vercel Triangle Logo - proper upward pointing triangle
function VercelLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 76 65" 
      fill="currentColor" 
      className={className}
    >
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  )
}
import { Button } from "@/components/ui/button"
import { slides, type Slide } from "@/lib/slides-data"
import { CodeBlock } from "./code-block"
import { Diagram } from "./diagrams"

const sections = [
  { id: "intro", label: "Intro" },
  { id: "presenter", label: "Me" },
  { id: "agents", label: "Agents" },
  { id: "ai-sdk", label: "AI SDK" },
  { id: "ai-gateway", label: "Gateway" },
  { id: "mcp", label: "MCP" },
  { id: "database", label: "Database" },
  { id: "storage", label: "Storage" },
  { id: "payments", label: "Payments" },
  { id: "tutorial", label: "Tutorial" },
  { id: "architecture", label: "Stack" },
  { id: "tips", label: "Tips" },
  { id: "resources", label: "Resources" },
]

export function SlideViewer() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Navigation NEVER blocks on isAnimating - the flag only drives the
  // fade-in CSS class. Clearing the previous timer prevents a stuck flag
  // when clicks arrive faster than the 300ms transition.
  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= slides.length) return
    setCurrentSlide(index)
    setIsAnimating(true)
    if (animTimerRef.current) clearTimeout(animTimerRef.current)
    animTimerRef.current = setTimeout(() => setIsAnimating(false), 300)
  }, [])

  useEffect(() => () => {
    if (animTimerRef.current) clearTimeout(animTimerRef.current)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide(i => {
      const next = Math.min(i + 1, slides.length - 1)
      if (next !== i) {
        setIsAnimating(true)
        if (animTimerRef.current) clearTimeout(animTimerRef.current)
        animTimerRef.current = setTimeout(() => setIsAnimating(false), 300)
      }
      return next
    })
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide(i => {
      const prev = Math.max(i - 1, 0)
      if (prev !== i) {
        setIsAnimating(true)
        if (animTimerRef.current) clearTimeout(animTimerRef.current)
        animTimerRef.current = setTimeout(() => setIsAnimating(false), 300)
      }
      return prev
    })
  }, [])

  const goToSection = useCallback((sectionId: string) => {
    const slideIndex = slides.findIndex(s => s.section === sectionId)
    if (slideIndex !== -1) {
      goToSlide(slideIndex)
    }
  }, [goToSlide])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      // Fullscreen API rejects when the page is in a sandboxed iframe
      // (e.g. v0.dev preview pane); swallow so it doesn't poison state.
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      } else if (e.key === "f" || e.key === "F") {
        e.preventDefault()
        toggleFullscreen()
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    window.addEventListener("keydown", handleKeyDown)
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [nextSlide, prevSlide, toggleFullscreen, isFullscreen])

  const slide = slides[currentSlide]
  const currentSection = slide.section

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 md:px-6 py-4 border-b border-[#191919]">
        <div className="flex items-center gap-3">
          {/* Vercel Triangle Logo */}
          <div className="flex items-center justify-center w-8 h-8">
            <VercelLogo className="w-5 h-5 text-white" />
          </div>
          <div className="h-6 w-px bg-[#333]" />
          <div className="hidden sm:block">
            <h1 className="text-sm font-medium text-white tracking-tight">AI Stack Workshop</h1>
          </div>
        </div>

        {/* Section Navigation - Vercel style pill buttons */}
        <div className="hidden lg:flex items-center gap-1 px-1 py-1 bg-black rounded-full border border-[#191919]">
          {sections.filter(s => slides.some(sl => sl.section === s.id)).map((section) => (
            <button
              key={section.id}
              onClick={() => goToSection(section.id)}
              className={`px-3 py-1.5 text-xs rounded-full transition-all duration-200 ${
                currentSection === section.id
                  ? "bg-white text-black font-medium"
                  : "text-[#666] hover:text-white"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#666] font-mono tabular-nums">
            {String(currentSlide + 1).padStart(2, "0")}
            <span className="mx-1 text-[#333]">/</span>
            {slides.length}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="hidden md:flex h-8 w-8 text-[#666] hover:text-white hover:bg-[#1a1a1a]"
          >
            {isFullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </header>

      {/* Slide Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden">
        <div 
          className={`w-full max-w-6xl transition-all duration-300 ease-out ${
            isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          <SlideContent slide={slide} />
        </div>
      </main>

      {/* Navigation - Vercel style */}
      <footer className="relative z-10 flex items-center justify-between px-4 md:px-6 py-4 border-t border-[#191919]">
        <Button
          variant="ghost"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="gap-2 text-[#666] hover:text-white hover:bg-[#111] disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Previous</span>
        </Button>

        {/* Progress Bar - Vercel style */}
        <div className="flex-1 mx-4 md:mx-12 max-w-xl">
          <div className="relative h-0.5 bg-[#191919] rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-white rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="gap-2 text-[#666] hover:text-white hover:bg-[#111] disabled:opacity-30"
        >
          <span className="hidden sm:inline text-sm">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </footer>

      {/* Keyboard Hints - minimal */}
      <div className="absolute bottom-20 right-6 hidden lg:flex items-center gap-3 text-xs text-[#333]">
        <div className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-[#0a0a0a] border border-[#222] font-mono text-[10px]">Space</kbd>
          <span>next</span>
        </div>
        <div className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-[#0a0a0a] border border-[#222] font-mono text-[10px]">F</kbd>
          <span>fullscreen</span>
        </div>
      </div>
    </div>
  )
}

function SlideContent({ slide }: { slide: Slide }) {
  const hasCode = slide.code
  const hasDiagram = slide.diagram
  const isStepSlide = slide.step !== undefined
  const isIntroHero = slide.diagram === "intro-hero" || slide.diagram === "presenter-hero"

  // Special full-width layout for intro hero - SF minimalism
  if (isIntroHero) {
    return (
      <div className="flex flex-col items-center justify-center -mt-8">
        <Diagram type={slide.diagram!} />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-center mt-8">
          {slide.title}
          {slide.diagram === "presenter-hero" && (
            <span className="blink-rect inline-block ml-2 align-baseline">▮</span>
          )}
        </h2>
        {slide.subtitle && (
          <p className="text-base md:text-lg text-[#555] max-w-md mx-auto text-center mt-3 font-light">{slide.subtitle}</p>
        )}
        {/* Buidlers logo - only on the AI Stack intro slide, not on the presenter slide */}
        {slide.diagram === "intro-hero" && (
          <div className="mt-12 flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-xs text-[#444] uppercase tracking-widest">presented by</span>
            <div className="relative">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%2014%20%283%29-akqGQf5UVVZsD0scganOQv3TCYZZzk.png"
                alt="buidlers"
                className="h-6"
                style={{ filter: "brightness(0.95)" }}
              />
              {/* Blinking rectangle overlay - positioned exactly over the static rectangle */}
              <span
                className="absolute blink-rect bg-[#e8e05a]"
                style={{
                  right: "0px",
                  top: "0px",
                  width: "12%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-8 md:space-y-10">
      {/* Title Section */}
      <div className="text-center space-y-4">
        {/* Step indicator for tutorial slides - Vercel style */}
        {isStepSlide && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black border border-[#222]">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-xs font-bold">
              {slide.step}
            </div>
            <span className="text-sm text-[#666]">Step {slide.step} of 10</span>
          </div>
        )}
        {slide.highlight && !isStepSlide && (
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/5 text-white/80 text-sm font-medium border border-white/10">
            {slide.highlight}
          </div>
        )}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance text-white">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-lg md:text-xl text-[#888] max-w-2xl mx-auto">{slide.subtitle}</p>
        )}
      </div>

      {/* Content Grid */}
      <div className={`grid gap-6 md:gap-8 ${hasCode || hasDiagram ? "lg:grid-cols-2" : "lg:grid-cols-1 max-w-3xl mx-auto"}`}>
        {/* Bullet Points - Vercel card style */}
        {slide.content.length > 0 && (
          <div className="space-y-3">
            {slide.content.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-black border border-[#191919] hover:border-[#333] transition-all"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-black text-xs font-bold flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-[15px] text-[#ccc] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        )}

        {/* Code or Diagram */}
        {hasCode && (
          <div className="flex flex-col justify-center">
            <CodeBlock code={slide.code!} language={slide.codeLanguage} />
          </div>
        )}
        
        {hasDiagram && (
          <div className="flex items-center justify-center bg-black rounded-xl border border-[#191919] min-h-[300px]">
            <Diagram type={slide.diagram!} />
          </div>
        )}
      </div>
    </div>
  )
}
