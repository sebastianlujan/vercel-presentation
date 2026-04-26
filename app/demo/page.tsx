"use client"

import { useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Send, Bot, User, Loader2, Wrench, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Vercel Logo component
function VercelLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 76 65" fill="currentColor" className={className}>
      <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
    </svg>
  )
}

export default function DemoPage() {
  const [input, setInput] = useState("")
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/demo-agent" }),
  })
  
  const isLoading = status === "streaming" || status === "submitted"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-[#191919] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-[#666] hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Back to Slides</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <VercelLogo className="w-4 h-4 text-white" />
          <span className="text-sm font-medium">Support Agent Demo</span>
        </div>
        <div className="w-24" />
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Sidebar - Tool info */}
        <aside className="w-72 border-r border-[#191919] p-4 hidden lg:block">
          <h3 className="text-xs font-medium text-[#666] uppercase tracking-wider mb-4">Available Tools</h3>
          <div className="space-y-3">
            {[
              { name: "searchKnowledge", desc: "Search knowledge base articles" },
              { name: "getTicketHistory", desc: "View support ticket history" },
              { name: "createTicket", desc: "Create new support ticket" },
              { name: "checkSystemStatus", desc: "Check service status" },
            ].map((tool) => (
              <div key={tool.name} className="p-3 rounded-lg border border-[#191919] hover:border-[#333] transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <Wrench className="w-3 h-3 text-[#666]" />
                  <span className="text-xs font-mono text-white">{tool.name}</span>
                </div>
                <p className="text-xs text-[#555]">{tool.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-[#191919]">
            <h3 className="text-xs font-medium text-[#666] uppercase tracking-wider mb-3">Try asking</h3>
            <div className="space-y-2">
              {[
                "How do I reset my password?",
                "Show my open tickets",
                "Is the API working?",
                "I need help with billing",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion)
                  }}
                  className="w-full text-left text-xs text-[#888] hover:text-white p-2 rounded hover:bg-[#111] transition-colors"
                >
                  &ldquo;{suggestion}&rdquo;
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Chat area */}
        <main className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#111] border border-[#222] flex items-center justify-center mb-4">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold mb-2">AI Support Agent</h2>
                <p className="text-sm text-[#666] max-w-sm">
                  This is a live demo of a data-driven AI agent. Ask questions about your account, tickets, or system status.
                </p>
              </div>
            )}
            
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.role === "user" ? "bg-white" : "bg-[#111] border border-[#222]"
                }`}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-black" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="text-xs text-[#666] mb-1">
                    {message.role === "user" ? "You" : "Agent"}
                  </div>
                  <div className="text-sm text-[#ccc] leading-relaxed">
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return <span key={index}>{part.text}</span>
                      }
                      if (part.type === "tool-invocation") {
                        return (
                          <div key={index} className="my-2 p-3 rounded-lg bg-[#0a0a0a] border border-[#222]">
                            <div className="flex items-center gap-2 mb-2">
                              <Wrench className="w-3 h-3 text-[#888]" />
                              <span className="text-xs font-mono text-[#888]">
                                {part.toolInvocation.toolName}
                              </span>
                              {part.toolInvocation.state === "output-available" ? (
                                <span className="text-xs text-green-500">completed</span>
                              ) : (
                                <Loader2 className="w-3 h-3 animate-spin text-[#666]" />
                              )}
                            </div>
                            {part.toolInvocation.state === "output-available" && (
                              <pre className="text-xs text-[#555] overflow-x-auto">
                                {JSON.stringify(part.toolInvocation.output, null, 2)}
                              </pre>
                            )}
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#111] border border-[#222] flex items-center justify-center">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                </div>
                <div className="pt-2">
                  <span className="text-sm text-[#666]">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-[#191919] p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the agent anything..."
                disabled={isLoading}
                className="flex-1 bg-[#111] border border-[#222] rounded-lg px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#444] transition-colors disabled:opacity-50"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="bg-white text-black hover:bg-[#ccc] px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <p className="text-xs text-[#444] mt-2 text-center">
              Powered by AI SDK v6 + Anthropic Claude
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
