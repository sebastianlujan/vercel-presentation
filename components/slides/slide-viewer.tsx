"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Presentation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { slides, type Slide } from "@/lib/slides-data"
import { CodeBlock } from "./code-block"
import { Diagram } from "./diagrams"

export function SlideViewer() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  const slide = slides[currentSlide]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
            <Presentation className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold">AI Agents Workshop</h1>
            <p className="text-xs text-muted-foreground">Vercel Hackathon Guide</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </header>

      {/* Slide Content */}
      <main className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        <div 
          className={`w-full max-w-5xl transition-all duration-300 ${
            isAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <SlideContent slide={slide} />
        </div>
      </main>

      {/* Navigation */}
      <footer className="flex items-center justify-between px-6 py-4 border-t border-border">
        <Button
          variant="outline"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {/* Progress Dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </footer>
    </div>
  )
}

function SlideContent({ slide }: { slide: Slide }) {
  const hasCode = slide.code
  const hasDiagram = slide.diagram

  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="text-center space-y-3">
        {slide.highlight && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {slide.highlight}
          </div>
        )}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xl text-muted-foreground">{slide.subtitle}</p>
        )}
      </div>

      {/* Content Grid */}
      <div className={`grid gap-8 ${hasCode || hasDiagram ? "md:grid-cols-2" : "md:grid-cols-1 max-w-2xl mx-auto"}`}>
        {/* Bullet Points */}
        <div className="space-y-4">
          {slide.content.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/50"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-foreground leading-relaxed">{item}</p>
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
          <div className="flex items-center justify-center bg-muted/20 rounded-xl border border-border/50">
            <Diagram type={slide.diagram!} />
          </div>
        )}
      </div>
    </div>
  )
}
