"use client"

import { Bot, Wrench, Database, CreditCard, Cloud, Zap, Globe, Server, Layout, ShoppingCart, Rocket, Trophy } from "lucide-react"

type DiagramType = "agent" | "ai-sdk" | "ai-gateway" | "architecture" | "hackathon"

export function Diagram({ type }: { type: DiagramType }) {
  switch (type) {
    case "agent":
      return <AgentDiagram />
    case "ai-sdk":
      return <AISDKDiagram />
    case "ai-gateway":
      return <AIGatewayDiagram />
    case "architecture":
      return <ArchitectureDiagram />
    case "hackathon":
      return <HackathonDiagram />
    default:
      return null
  }
}

function AgentDiagram() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
        <Bot className="w-10 h-10 text-white" />
      </div>
      <div className="text-sm font-medium text-muted-foreground">AI Agent</div>
      
      <div className="flex items-center gap-2 text-muted-foreground">
        <div className="w-px h-8 bg-border" />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Wrench, label: "Tools", color: "from-orange-500 to-amber-500" },
          { icon: Database, label: "Database", color: "from-emerald-500 to-green-500" },
          { icon: CreditCard, label: "Payments", color: "from-pink-500 to-rose-500" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
              <item.icon className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AISDKDiagram() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Application</div>
      
      <div className="flex items-center justify-center w-full max-w-md h-16 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700">
        <span className="font-mono text-sm text-zinc-300">AI SDK</span>
      </div>
      
      <div className="flex items-center gap-8 text-muted-foreground">
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-6 bg-border" />
          <Zap className="w-4 h-4" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-6 bg-border" />
          <Zap className="w-4 h-4" />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-6 bg-border" />
          <Zap className="w-4 h-4" />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "generateText()", desc: "Single response" },
          { label: "streamText()", desc: "Real-time stream" },
          { label: "generateObject()", desc: "Structured JSON" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/50 border border-border">
            <span className="font-mono text-xs text-foreground">{item.label}</span>
            <span className="text-xs text-muted-foreground">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AIGatewayDiagram() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="flex items-center justify-center w-full max-w-xs h-14 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/25">
        <Cloud className="w-5 h-5 text-white mr-2" />
        <span className="font-semibold text-white">AI Gateway</span>
      </div>
      
      <div className="flex items-center gap-2 text-muted-foreground">
        <Globe className="w-4 h-4" />
        <span className="text-xs">Unified API</span>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {[
          { name: "OpenAI", model: "gpt-4o" },
          { name: "Anthropic", model: "claude-4" },
          { name: "Google", model: "gemini-2.5" },
          { name: "Fireworks", model: "llama-3" },
        ].map((provider, i) => (
          <div key={i} className="flex flex-col items-center gap-1 p-3 rounded-lg bg-zinc-900 border border-zinc-800">
            <span className="text-xs font-medium text-foreground">{provider.name}</span>
            <span className="text-xs text-muted-foreground font-mono">{provider.model}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArchitectureDiagram() {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
        {/* Frontend */}
        <div className="col-span-3 flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-r from-zinc-800/50 to-zinc-900/50 border border-zinc-700">
          <Layout className="w-6 h-6 text-blue-400" />
          <span className="text-sm font-medium">Next.js Frontend</span>
          <span className="text-xs text-muted-foreground">useChat() + UI Components</span>
        </div>
        
        {/* Backend Services */}
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <Server className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-medium">AI SDK</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
          <Database className="w-5 h-5 text-cyan-400" />
          <span className="text-xs font-medium">Supabase</span>
        </div>
        
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-pink-500/10 border border-pink-500/30">
          <CreditCard className="w-5 h-5 text-pink-400" />
          <span className="text-xs font-medium">Stripe</span>
        </div>
      </div>
    </div>
  )
}

function HackathonDiagram() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-orange-500/25">
          <Trophy className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {[
          { icon: Bot, label: "AI Agent", time: "10 min" },
          { icon: Database, label: "Supabase", time: "5 min" },
          { icon: CreditCard, label: "Stripe", time: "10 min" },
          { icon: Rocket, label: "Deploy", time: "2 min" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
            <item.icon className="w-5 h-5 text-muted-foreground" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <span className="text-2xl font-bold text-foreground">~30 minutes</span>
        <p className="text-sm text-muted-foreground">to a working AI product</p>
      </div>
    </div>
  )
}
