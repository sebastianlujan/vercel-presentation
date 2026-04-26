"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Presentation, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { slides, type Slide } from "@/lib/slides-data"
import { CodeBlock } from "./code-block"
import { Diagram } from "./diagrams"

const sections = [
  { id: "intro", label: "Intro" },
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

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length && !isAnimating) {
      setIsAnimating(true)
      setCurrentSlide(index)
      setTimeout(() => setIsAnimating(false), 300)
    }
  }, [isAnimating])

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1)
  }, [currentSlide, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1)
  }, [currentSlide, goToSlide])

  const goToSection = useCallback((sectionId: string) => {
    const slideIndex = slides.findIndex(s => s.section === sectionId)
    if (slideIndex !== -1) {
      goToSlide(slideIndex)
    }
  }, [goToSlide])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700">
            <Presentation className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-sm font-semibold text-foreground">Vercel AI Stack</h1>
            <p className="text-xs text-muted-foreground">DevRel Workshop</p>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto">
          {sections.filter(s => slides.some(sl => sl.section === s.id)).map((section) => (
            <button
              key={section.id}
              onClick={() => goToSection(section.id)}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap ${
                currentSection === section.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground font-mono">
            {String(currentSlide + 1).padStart(2, "0")} / {slides.length}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="hidden md:flex"
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
      <main className="flex-1 flex items-center justify-center p-4 md:p-6 overflow-hidden">
        <div 
          className={`w-full max-w-5xl transition-all duration-300 ${
            isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <SlideContent slide={slide} />
        </div>
      </main>

      {/* Navigation */}
      <footer className="flex items-center justify-between px-4 md:px-6 py-3 border-t border-border bg-background/80 backdrop-blur-sm">
        <Button
          variant="outline"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* Progress Bar */}
        <div className="flex-1 mx-4 md:mx-8">
          <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>
          {/* Progress Dots - Desktop */}
          <div className="hidden md:flex items-center justify-center gap-1 mt-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-primary w-4"
                    : index < currentSlide
                    ? "bg-primary/50"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        <Button
          variant="outline"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="gap-2"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </footer>

      {/* Keyboard Hints */}
      <div className="fixed bottom-20 right-4 hidden lg:flex items-center gap-2 text-xs text-muted-foreground/50">
        <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono">{"<-"}</kbd>
        <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono">{"->"}</kbd>
        <span>navigate</span>
        <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted font-mono ml-2">F</kbd>
        <span>fullscreen</span>
      </div>
    </div>
  )
}

function SlideContent({ slide }: { slide: Slide }) {
  const hasCode = slide.code
  const hasDiagram = slide.diagram
  const isStepSlide = slide.step !== undefined

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Title Section */}
      <div className="text-center space-y-3">
        {/* Step indicator for tutorial slides */}
        {isStepSlide && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs font-bold">
              {slide.step}
            </span>
            <span className="text-sm font-medium text-blue-400">Step {slide.step} of 10</span>
          </div>
        )}
        {slide.highlight && !isStepSlide && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {slide.highlight}
          </div>
        )}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance text-foreground">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-lg md:text-xl text-muted-foreground">{slide.subtitle}</p>
        )}
      </div>

      {/* Content Grid */}
      <div className={`grid gap-6 md:gap-8 ${hasCode || hasDiagram ? "lg:grid-cols-2" : "lg:grid-cols-1 max-w-2xl mx-auto"}`}>
        {/* Bullet Points */}
        <div className="space-y-3">
          {slide.content.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-muted/30 border border-border/50"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-sm md:text-base text-foreground leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {/* Code or Diagram */}
        {hasCode && (
          <div className="flex flex-col justify-center">
            <CodeBlock code={slide.code!} language={slide.codeLanguage} />
          </div>
        )}
        
        {hasDiagram && (
          <div className="flex items-center justify-center bg-muted/20 rounded-xl border border-border/50 min-h-[280px]">
            <Diagram type={slide.diagram!} />
          </div>
        )}
      </div>
    </div>
  )
}
