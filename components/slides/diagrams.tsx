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
  Triangle
} from "lucide-react"

type DiagramType = 
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

// Vercel-style card component
function Card({ children, className = "", glow = "" }: { children: React.ReactNode; className?: string; glow?: string }) {
  return (
    <div className={`bg-[#0a0a0a] border border-[#262626] rounded-lg ${glow} ${className}`}>
      {children}
    </div>
  )
}

// Vercel-style badge
function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "blue" | "green" | "pink" | "orange" }) {
  const variants = {
    default: "bg-[#262626] text-[#888]",
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
        <Triangle className="w-4 h-4 text-white fill-white" />
        <span className="text-xs font-medium text-[#888] uppercase tracking-wider">
          Build Pipeline
        </span>
      </div>
      
      <div className="flex items-center gap-2 w-full max-w-lg justify-center flex-wrap">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-[#1a1a1a] border border-[#333] hover:border-[#444] transition-colors">
                <step.icon className="w-5 h-5 text-white" />
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold">
                  {step.num}
                </div>
              </div>
              <span className="text-[10px] text-[#666]">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="w-4 h-px bg-[#333] mx-1 mt-[-16px]" />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0a] border border-[#262626]">
        <Rocket className="w-4 h-4 text-[#50e3c2]" />
        <span className="text-xs text-[#888]">Zero to deployed in one session</span>
      </div>
    </div>
  )
}

function StepDatabaseSchemaDiagram() {
  const tables = [
    { name: "profiles", icon: Users, fields: ["id", "email", "role"], color: "border-[#0070f3]/50" },
    { name: "tickets", icon: TicketCheck, fields: ["id", "user_id", "status"], color: "border-[#f5a623]/50" },
    { name: "messages", icon: MessageSquare, fields: ["id", "ticket_id", "content"], color: "border-[#50e3c2]/50" },
    { name: "knowledge", icon: BookOpen, fields: ["id", "title", "embedding"], color: "border-[#7928ca]/50" },
  ]
  
  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full">
      <div className="flex items-center gap-2 text-xs text-[#666]">
        <Settings className="w-4 h-4" />
        <span>Settings &rarr; Add Integration &rarr; Supabase</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {tables.map((table, i) => (
          <Card key={i} className={`p-3 ${table.color}`}>
            <div className="flex items-center gap-2 mb-2">
              <table.icon className="w-4 h-4 text-[#888]" />
              <span className="text-sm font-mono font-medium text-white">{table.name}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {table.fields.map((field, j) => (
                <span key={j} className="px-1.5 py-0.5 rounded bg-[#1a1a1a] text-[10px] font-mono text-[#666]">
                  {field}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs text-[#666]">
          <Shield className="w-3.5 h-3.5 text-[#50e3c2]" />
          <span>RLS Enabled</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#666]">
          <GitBranch className="w-3.5 h-3.5 text-[#0070f3]" />
          <span>Foreign Keys</span>
        </div>
      </div>
    </div>
  )
}

function StepAgentFlowDiagram() {
  const steps = [
    { icon: Users, label: "User Input", desc: "\"How do I reset my password?\"", color: "border-[#0070f3]/50" },
    { icon: Bot, label: "Agent Reasoning", desc: "Decides to search knowledge base", color: "border-[#7928ca]/50" },
    { icon: Search, label: "Tool: searchKnowledge", desc: "Query: \"password reset\"", color: "border-[#f5a623]/50" },
    { icon: Database, label: "Supabase Query", desc: "Returns 3 matching articles", color: "border-[#50e3c2]/50" },
    { icon: MessageSquare, label: "Streaming Response", desc: "Synthesized answer from results", color: "border-[#ff0080]/50" },
  ]
  
  return (
    <div className="flex flex-col items-center gap-3 p-4 w-full">
      <div className="w-full max-w-sm space-y-2">
        {steps.map((step, i) => (
          <div key={i}>
            <Card className={`p-3 ${step.color}`}>
              <div className="flex items-center gap-3">
                <step.icon className="w-5 h-5 text-[#888] flex-shrink-0" />
                <div className="flex-1">
                  <span className="text-sm font-medium text-white">{step.label}</span>
                  <p className="text-xs text-[#666]">{step.desc}</p>
                </div>
              </div>
            </Card>
            {i < steps.length - 1 && (
              <div className="flex justify-center py-1">
                <ArrowDown className="w-3 h-3 text-[#333]" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a] text-xs text-[#666]">
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
        <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-lg glow-blue">
          <Bot className="w-10 h-10 text-black" />
        </div>
        <div className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full bg-[#50e3c2] text-black">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
      
      <div className="text-sm font-semibold text-white">AI Agent</div>
      <div className="text-xs text-[#666] text-center max-w-xs">
        Autonomous reasoning with tool execution
      </div>
      
      <div className="w-px h-4 bg-gradient-to-b from-[#333] to-transparent" />
      
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Wrench, label: "Tools" },
          { icon: Database, label: "Data" },
          { icon: CreditCard, label: "Payments" },
          { icon: Link2, label: "APIs" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#1a1a1a] border border-[#333] hover:border-[#444] transition-colors">
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] text-[#666]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AISDKDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full">
      <div className="text-xs font-medium text-[#666] uppercase tracking-wider">Your Next.js App</div>
      
      <Card className="relative flex items-center justify-center w-full max-w-sm h-14 glow-blue">
        <Triangle className="w-4 h-4 text-white fill-white mr-2" />
        <span className="font-mono text-sm text-white">AI SDK v6</span>
        <Badge variant="green" className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          TypeScript
        </Badge>
      </Card>
      
      <div className="w-px h-6 bg-[#333]" />
      
      <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
        {[
          { label: "generateText()", desc: "Single response", icon: FileText },
          { label: "streamText()", desc: "Real-time stream", icon: Zap },
          { label: "generateObject()", desc: "Structured JSON", icon: Database },
          { label: "useChat()", desc: "React hook", icon: MessageSquare },
        ].map((item, i) => (
          <Card key={i} className="flex items-center gap-3 p-3 hover:border-[#444] transition-colors">
            <item.icon className="w-4 h-4 text-[#666] flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-mono text-xs text-white">{item.label}</span>
              <span className="text-[10px] text-[#666]">{item.desc}</span>
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
      <div className="relative flex items-center justify-center w-full max-w-xs h-12 rounded-lg bg-gradient-to-r from-[#0070f3] to-[#50e3c2] glow-cyan">
        <Cloud className="w-4 h-4 text-white mr-2" />
        <span className="font-semibold text-white text-sm">AI Gateway</span>
        <Badge variant="green" className="absolute -top-2 -right-2 !bg-[#50e3c2] !text-black !border-0">
          Zero Config
        </Badge>
      </div>
      
      <div className="flex items-center gap-2 text-[#666]">
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
          <Card key={i} className="flex items-center justify-between p-2.5 hover:border-[#444] transition-colors">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white">{provider.name}</span>
              <span className="text-[10px] text-[#666] font-mono">{provider.model}</span>
            </div>
            {provider.free && (
              <CheckCircle className="w-4 h-4 text-[#50e3c2]" />
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
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#7928ca] to-[#ff0080] shadow-lg glow-pink">
        <Link2 className="w-7 h-7 text-white" />
      </div>
      
      <div className="text-sm font-semibold text-white">Model Context Protocol</div>
      <div className="text-xs text-[#666] text-center max-w-xs">
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
          <Card key={i} className="flex flex-col items-center gap-1 p-3 hover:border-[#7928ca]/50 transition-colors">
            <span className="text-xs font-medium text-white">{service.name}</span>
            <span className="text-[10px] text-[#666]">{service.desc}</span>
          </Card>
        ))}
      </div>
    </div>
  )
}

function DatabaseDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full">
      <div className="text-xs font-medium text-[#666] uppercase tracking-wider">Storage Integrations</div>
      
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {[
          { name: "Supabase", desc: "Postgres + Auth + Realtime", recommended: true },
          { name: "Neon", desc: "Serverless Postgres", recommended: false },
          { name: "Upstash", desc: "Redis (caching/queues)", recommended: false },
          { name: "Aurora", desc: "AWS Managed DB", recommended: false },
        ].map((db, i) => (
          <Card key={i} className={`relative p-4 ${db.recommended ? 'border-[#50e3c2]/50 glow-cyan' : 'hover:border-[#444]'} transition-all`}>
            {db.recommended && (
              <Badge variant="green" className="absolute -top-2 right-2">
                Recommended
              </Badge>
            )}
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-[#888]" />
              <span className="text-sm font-medium text-white">{db.name}</span>
            </div>
            <span className="text-xs text-[#666] mt-1 block">{db.desc}</span>
          </Card>
        ))}
      </div>
      
      <Badge variant="blue">
        <Shield className="w-3 h-3 mr-1" />
        One-click setup in v0
      </Badge>
    </div>
  )
}

function BlobStorageDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6 w-full">
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#f5a623] to-[#ff6b00] shadow-lg">
        <HardDrive className="w-7 h-7 text-white" />
      </div>
      <div className="text-sm font-semibold text-white">Vercel Blob</div>
      
      <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
        {[
          { icon: ImageIcon, label: "Images" },
          { icon: FileText, label: "Documents" },
          { icon: Upload, label: "User Files" },
        ].map((item, i) => (
          <Card key={i} className="flex flex-col items-center gap-2 p-4 hover:border-[#f5a623]/50 transition-colors">
            <item.icon className="w-5 h-5 text-[#888]" />
            <span className="text-xs text-[#666]">{item.label}</span>
          </Card>
        ))}
      </div>
      
      <div className="flex items-center gap-4 text-xs text-[#666]">
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
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1a1a1a] border border-[#333] hover:border-white/50 hover:bg-[#262626] transition-all">
                <step.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] text-[#666]">{step.label}</span>
            </div>
            {i < 4 && (
              <div className="w-3 h-px bg-[#333] mx-1 mt-[-16px]" />
            )}
          </div>
        ))}
      </div>
      
      <Badge variant="blue">
        <Triangle className="w-3 h-3 mr-1 fill-current" />
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
          <Triangle className="w-4 h-4 text-white fill-white" />
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
