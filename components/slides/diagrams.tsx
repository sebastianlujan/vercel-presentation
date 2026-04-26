"use client"

import { 
  Bot, 
  Wrench, 
  Database, 
  CreditCard, 
  Cloud, 
  Zap, 
  Globe, 
  Rocket, 
  Link2, 
  FileText,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  ArrowDown,
  Sparkles,
  Shield,
  HardDrive,
  MessageSquare,
  Code,
  Eye,
  Play,
  Settings,
  Users,
  TicketCheck,
  Search,
  BookOpen,
  CircleDot,
  GitBranch,
} from "lucide-react"

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

type DiagramType = 
  | "intro-hero"
  | "agent" 
  | "ai-sdk" 
  | "ai-gateway" 
  | "architecture" 
  | "hackathon" 
  | "mcp" 
  | "database" 
  | "vercel-ecosystem"
  | "v0-workflow"
  | "blob-storage"
  | "step-overview"
  | "step-database-schema"
  | "step-agent-flow"

export function Diagram({ type }: { type: DiagramType }) {
  switch (type) {
    case "intro-hero":
      return <IntroHeroDiagram />
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
    case "mcp":
      return <MCPDiagram />
    case "database":
      return <DatabaseDiagram />
    case "vercel-ecosystem":
      return <VercelEcosystemDiagram />
    case "v0-workflow":
      return <V0WorkflowDiagram />
    case "blob-storage":
      return <BlobStorageDiagram />
    case "step-overview":
      return <StepOverviewDiagram />
    case "step-database-schema":
      return <StepDatabaseSchemaDiagram />
    case "step-agent-flow":
      return <StepAgentFlowDiagram />
    default:
      return null
  }
}

// Vercel Intro Hero - 3D triangle
import dynamic from "next/dynamic"

const VercelTriangle3D = dynamic(
  () => import("./vercel-triangle-3d").then((mod) => mod.VercelTriangle3D),
  { 
    ssr: false,
    loading: () => (
      <div className="w-[280px] h-[280px] flex items-center justify-center">
        <svg 
          width="120" 
          height="104" 
          viewBox="0 0 76 65" 
          fill="none" 
          className="opacity-50"
        >
          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="white"/>
        </svg>
      </div>
    )
  }
)

function IntroHeroDiagram() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full min-h-[400px]">
      {/* 3D Triangle */}
      <VercelTriangle3D />
      
      {/* Key features */}
      <div className="flex items-center gap-8">
        {["AI SDK", "AI Gateway", "MCP", "v0"].map((label, i) => (
          <span key={i} className="text-xs text-[#666] font-medium tracking-wide">{label}</span>
        ))}
      </div>
    </div>
  )
}

// Minimal card component
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-black border border-[#191919] rounded-lg ${className}`}>
      {children}
    </div>
  )
}

// Minimal badge
function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "blue" | "green" | "pink" | "orange" }) {
  const variants = {
    default: "bg-[#111] text-[#666] border-[#222]",
    blue: "bg-[#0070f3]/10 text-[#0070f3] border-[#0070f3]/20",
    green: "bg-[#50e3c2]/10 text-[#50e3c2] border-[#50e3c2]/20",
    pink: "bg-[#ff0080]/10 text-[#ff0080] border-[#ff0080]/20",
    orange: "bg-[#f5a623]/10 text-[#f5a623] border-[#f5a623]/20",
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${variants[variant]}`}>
      {children}
    </span>
  )
}

function StepOverviewDiagram() {
  const steps = [
    { num: 1, label: "Setup", icon: Code },
    { num: 2, label: "Database", icon: Database },
    { num: 3, label: "Schema", icon: FileText },
    { num: 4, label: "RLS", icon: Shield },
    { num: 5, label: "Tools", icon: Wrench },
    { num: 6, label: "Agent", icon: Bot },
    { num: 7, label: "UI", icon: MessageSquare },
  ]
  
  return (
    <div className="flex flex-col items-center gap-6 p-6 w-full">
      <div className="flex items-center gap-2">
        <VercelLogo className="w-4 h-4 text-white" />
        <span className="text-xs font-medium text-[#555] uppercase tracking-wider">
          Build Pipeline
        </span>
      </div>
      
      <div className="flex items-center gap-2 w-full max-w-lg justify-center flex-wrap">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-[#0a0a0a] border border-[#222] hover:border-[#444] transition-colors">
                <step.icon className="w-5 h-5 text-white" />
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold">
                  {step.num}
                </div>
              </div>
              <span className="text-[10px] text-[#555]">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-4 h-px bg-[#222] mx-1 mt-[-16px]" />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black border border-[#222]">
        <Rocket className="w-4 h-4 text-white" />
        <span className="text-xs text-[#666]">Zero to deployed in one session</span>
      </div>
    </div>
  )
}

function StepDatabaseSchemaDiagram() {
  const tables = [
    { name: "profiles", icon: Users, fields: ["id", "email", "role"] },
    { name: "tickets", icon: TicketCheck, fields: ["id", "user_id", "status"] },
    { name: "messages", icon: MessageSquare, fields: ["id", "ticket_id", "content"] },
    { name: "knowledge", icon: BookOpen, fields: ["id", "title", "embedding"] },
  ]
  
  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full">
      <div className="flex items-center gap-2 text-xs text-[#555]">
        <Settings className="w-4 h-4" />
        <span>Settings &rarr; Add Integration &rarr; Supabase</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {tables.map((table, i) => (
          <Card key={i} className="p-3 hover:border-[#333] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <table.icon className="w-4 h-4 text-[#666]" />
              <span className="text-sm font-mono font-medium text-white">{table.name}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {table.fields.map((field, j) => (
                <span key={j} className="px-1.5 py-0.5 rounded bg-[#111] text-[10px] font-mono text-[#555]">
                  {field}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs text-[#555]">
          <Shield className="w-3.5 h-3.5 text-white" />
          <span>RLS Enabled</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#555]">
          <GitBranch className="w-3.5 h-3.5 text-white" />
          <span>Foreign Keys</span>
        </div>
      </div>
    </div>
  )
}

function StepAgentFlowDiagram() {
  const steps = [
    { icon: Users, label: "User Input", desc: "\"How do I reset my password?\"" },
    { icon: Bot, label: "Agent Reasoning", desc: "Decides to search knowledge base" },
    { icon: Search, label: "Tool: searchKnowledge", desc: "Query: \"password reset\"" },
    { icon: Database, label: "Supabase Query", desc: "Returns 3 matching articles" },
    { icon: MessageSquare, label: "Streaming Response", desc: "Synthesized answer from results" },
  ]
  
  return (
    <div className="flex flex-col items-center gap-3 p-4 w-full">
      <div className="w-full max-w-sm space-y-2">
        {steps.map((step, i) => (
          <div key={i}>
            <Card className="p-3 hover:border-[#333] transition-colors">
              <div className="flex items-center gap-3">
                <step.icon className="w-5 h-5 text-[#666] flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-sm font-medium text-white">{step.label}</span>
                  <p className="text-xs text-[#555]">{step.desc}</p>
                </div>
              </div>
            </Card>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown className="w-3 h-3 text-[#222]" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0a0a] border border-[#222] text-xs text-[#555]">
        <CircleDot className="w-3 h-3" />
        <span>maxSteps: 5</span>
      </div>
    </div>
  )
}

function AgentDiagram() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Central Agent */}
      <div className="relative float-animation">
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white">
          <Bot className="w-10 h-10 text-black" />
        </div>
        <div className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full bg-white text-black">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
      
      <div className="text-sm font-semibold text-white">AI Agent</div>
      <div className="text-xs text-[#555] text-center max-w-xs">
        Autonomous reasoning with tool execution
      </div>
      
      <div className="w-px h-4 bg-[#222]" />
      
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Wrench, label: "Tools" },
          { icon: Database, label: "Data" },
          { icon: CreditCard, label: "Payments" },
          { icon: Link2, label: "APIs" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#0a0a0a] border border-[#222] hover:border-[#444] transition-colors">
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] text-[#555]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AISDKDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full">
      <div className="text-xs font-medium text-[#555] uppercase tracking-wider">Your Next.js App</div>
      
      <Card className="relative flex items-center justify-center w-full max-w-sm h-14">
        <VercelLogo className="w-4 h-4 text-white mr-2" />
        <span className="font-mono text-sm text-white">AI SDK v6</span>
        <Badge variant="default" className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          TypeScript
        </Badge>
      </Card>
      
      <div className="w-px h-6 bg-[#222]" />
      
      <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
        {[
          { label: "generateText()", desc: "Single response", icon: FileText },
          { label: "streamText()", desc: "Real-time stream", icon: Zap },
          { label: "generateObject()", desc: "Structured JSON", icon: Database },
          { label: "useChat()", desc: "React hook", icon: MessageSquare },
        ].map((item, i) => (
          <Card key={i} className="flex items-center gap-3 p-3 hover:border-[#333] transition-colors">
            <item.icon className="w-4 h-4 text-[#555] flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-mono text-xs text-white">{item.label}</span>
              <span className="text-[10px] text-[#555]">{item.desc}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

function AIGatewayDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full">
      <div className="relative flex items-center justify-center w-full max-w-xs h-12 rounded-lg bg-white">
        <Cloud className="w-4 h-4 text-black mr-2" />
        <span className="font-semibold text-black text-sm">AI Gateway</span>
        <Badge variant="default" className="absolute -top-2 -right-2 !bg-white !text-black !border-[#222]">
          Zero Config
        </Badge>
      </div>
      
      <div className="flex items-center gap-2 text-[#555]">
        <Globe className="w-4 h-4" />
        <span className="text-xs">Unified API Endpoint</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
        {[
          { name: "OpenAI", model: "gpt-4o", free: true },
          { name: "Anthropic", model: "claude-4", free: true },
          { name: "Google", model: "gemini-2.5", free: true },
          { name: "AWS Bedrock", model: "titan", free: true },
          { name: "Fireworks", model: "llama-3", free: true },
          { name: "xAI / Groq", model: "API key", free: false },
        ].map((provider, i) => (
          <Card key={i} className="flex items-center justify-between p-2.5 hover:border-[#333] transition-colors">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white">{provider.name}</span>
              <span className="text-[10px] text-[#555] font-mono">{provider.model}</span>
            </div>
            {provider.free && (
              <CheckCircle className="w-4 h-4 text-white" />
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}

function MCPDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full">
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white">
        <Link2 className="w-7 h-7 text-black" />
      </div>
      
      <div className="text-sm font-semibold text-white">Model Context Protocol</div>
      <div className="text-xs text-[#555] text-center max-w-xs">
        Standardized AI-to-service communication
      </div>
      
      <div className="grid grid-cols-3 gap-2 w-full max-w-md">
        {[
          { name: "Linear", desc: "Issues" },
          { name: "Notion", desc: "Docs" },
          { name: "Slack", desc: "Chat" },
          { name: "Sentry", desc: "Errors" },
          { name: "PostHog", desc: "Analytics" },
          { name: "GitHub", desc: "Code" },
        ].map((service, i) => (
          <Card key={i} className="flex flex-col items-center gap-1 p-3 hover:border-[#333] transition-colors">
            <span className="text-xs font-medium text-white">{service.name}</span>
            <span className="text-[10px] text-[#555]">{service.desc}</span>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DatabaseDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full">
      <div className="text-xs font-medium text-[#555] uppercase tracking-wider">Storage Integrations</div>
      
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {[
          { name: "Supabase", desc: "Postgres + Auth + Realtime", recommended: true },
          { name: "Neon", desc: "Serverless Postgres", recommended: false },
          { name: "Upstash", desc: "Redis (caching/queues)", recommended: false },
          { name: "Aurora", desc: "AWS Managed DB", recommended: false },
        ].map((db, i) => (
          <Card key={i} className={`relative p-4 ${db.recommended ? 'border-white/20' : 'hover:border-[#333]'} transition-all`}>
            {db.recommended && (
              <Badge variant="default" className="absolute -top-2 right-2 !bg-white !text-black">
                Recommended
              </Badge>
            )}
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#666]" />
              <span className="text-sm font-medium text-white">{db.name}</span>
            </div>
            <span className="text-xs text-[#555] mt-1 block">{db.desc}</span>
          </Card>
        ))}
      </div>
      
      <Badge variant="default">
        <Shield className="w-3 h-3 mr-1" />
        One-click setup in v0
      </Badge>
    </div>
  )
}

function BlobStorageDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full">
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white">
        <HardDrive className="w-7 h-7 text-black" />
      </div>
      <div className="text-sm font-semibold text-white">Vercel Blob</div>
      
      <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
        {[
          { icon: ImageIcon, label: "Images" },
          { icon: FileText, label: "Documents" },
          { icon: Upload, label: "User Files" },
        ].map((item, i) => (
          <Card key={i} className="flex flex-col items-center gap-2 p-4 hover:border-[#333] transition-colors">
            <item.icon className="w-5 h-5 text-[#666]" />
            <span className="text-xs text-[#555]">{item.label}</span>
          </Card>
        ))}
      </div>
      
      <div className="flex items-center gap-4 text-xs text-[#555]">
        <span className="flex items-center gap-1">
          <Globe className="w-3 h-3" /> Global CDN
        </span>
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3" /> Private/Public
        </span>
      </div>
    </div>
  )
}

function V0WorkflowDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full">
      <div className="flex items-center gap-3 w-full max-w-lg justify-center">
        {[
          { icon: MessageSquare, label: "Describe" },
          { icon: Code, label: "Generate" },
          { icon: Eye, label: "Preview" },
          { icon: Play, label: "Iterate" },
          { icon: Rocket, label: "Deploy" },
        ].map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0a0a0a] border border-[#222] hover:border-white/50 hover:bg-[#111] transition-all">
                <step.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] text-[#555]">{step.label}</span>
            </div>
            {i < 4 && (
              <div className="w-3 h-px bg-[#222] mx-1 mt-[-16px]" />
            )}
          </div>
        ))}
      </div>
      
      <Badge variant="default">
        <VercelLogo className="w-3 h-3 mr-1" />
        Prompt to Production
      </Badge>
    </div>
  )
}

function ArchitectureDiagram() {
  return (
    <div className="flex flex-col items-center gap-4 p-6 w-full">
      {/* Frontend */}
      <Card className="w-full max-w-sm p-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <VercelLogo className="w-4 h-4 text-white" />
          <span className="text-sm font-medium text-white">Next.js + AI SDK</span>
        </div>
        <span className="text-[10px] text-[#666]">Frontend + API Routes</span>
      </Card>
      
      <div className="w-px h-4 bg-[#333]" />
      
      {/* Services Row */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-md">
        <Card className="p-3 text-center border-[#0070f3]/50">
          <Cloud className="w-4 h-4 text-[#0070f3] mx-auto mb-1" />
          <span className="text-xs text-white">AI Gateway</span>
        </Card>
        <Card className="p-3 text-center border-[#50e3c2]/50">
          <Database className="w-4 h-4 text-[#50e3c2] mx-auto mb-1" />
          <span className="text-xs text-white">Supabase</span>
        </Card>
        <Card className="p-3 text-center border-[#ff0080]/50">
          <CreditCard className="w-4 h-4 text-[#ff0080] mx-auto mb-1" />
          <span className="text-xs text-white">Stripe</span>
        </Card>
      </div>
      
      <div className="w-px h-4 bg-[#333]" />
      
      {/* MCP Row */}
      <Card className="w-full max-w-sm p-3">
        <div className="flex items-center justify-center gap-2">
          <Link2 className="w-4 h-4 text-[#7928ca]" />
          <span className="text-sm font-medium text-white">MCP Integrations</span>
        </div>
        <div className="flex justify-center gap-2 mt-2">
          {["Linear", "Notion", "Slack"].map((s, i) => (
            <Badge key={i} variant="default">{s}</Badge>
          ))}
        </div>
      </Card>
    </div>
  )
}

function HackathonDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full">
      <div className="text-xs font-medium text-[#666] uppercase tracking-wider">Customer Support Agent</div>
      
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {[
          { icon: Bot, label: "AI Agent", desc: "Claude 4 via AI Gateway" },
          { icon: Database, label: "Supabase", desc: "Users, Tickets, KB" },
          { icon: Link2, label: "MCP", desc: "Linear Escalation" },
          { icon: CreditCard, label: "Stripe", desc: "Billing Integration" },
        ].map((item, i) => (
          <Card key={i} className="flex items-center gap-3 p-4 hover:border-[#444] transition-colors">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1a1a1a]">
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-white">{item.label}</div>
              <div className="text-[10px] text-[#666]">{item.desc}</div>
            </div>
          </Card>
        ))}
      </div>
      
      <Badge variant="green">
        <Sparkles className="w-3 h-3 mr-1" />
        Production Ready
      </Badge>
    </div>
  )
}

function VercelEcosystemDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full">
      {/* Vercel Logo */}
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-xl float-animation">
        <Triangle className="w-8 h-8 text-black fill-black" />
      </div>
      
      <div className="text-sm font-semibold text-white">Vercel Platform</div>
      
      <div className="grid grid-cols-4 gap-3 w-full max-w-lg">
        {[
          { icon: Globe, label: "Edge" },
          { icon: Database, label: "Storage" },
          { icon: Cloud, label: "AI" },
          { icon: Rocket, label: "Deploy" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#1a1a1a] border border-[#333] hover:border-white/30 transition-colors">
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] text-[#666]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
