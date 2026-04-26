"use client"

import { 
  Bot, 
  Wrench, 
  Database, 
  CreditCard, 
  Cloud, 
  Zap, 
  Globe, 
  Layout, 
  Rocket, 
  Trophy, 
  Link2, 
  FileText,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  ArrowRight,
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
  AlertTriangle,
  CircleDot,
  GitBranch
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

function StepOverviewDiagram() {
  const steps = [
    { num: 1, label: "Setup Project", icon: Code, color: "from-zinc-500 to-zinc-600" },
    { num: 2, label: "Connect Supabase", icon: Database, color: "from-emerald-500 to-green-500" },
    { num: 3, label: "Create Schema", icon: FileText, color: "from-blue-500 to-cyan-500" },
    { num: 4, label: "Enable RLS", icon: Shield, color: "from-amber-500 to-orange-500" },
    { num: 5, label: "Define Tools", icon: Wrench, color: "from-pink-500 to-rose-500" },
    { num: 6, label: "Build Agent API", icon: Bot, color: "from-indigo-500 to-violet-500" },
    { num: 7, label: "Create Chat UI", icon: MessageSquare, color: "from-cyan-500 to-blue-500" },
  ]
  
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Building a Customer Support Agent
      </div>
      
      <div className="grid grid-cols-4 gap-3 w-full max-w-lg">
        {steps.slice(0, 4).map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
              <step.icon className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center text-xs font-bold text-foreground">
                {step.num}
              </div>
            </div>
            <span className="text-xs text-center text-muted-foreground">{step.label}</span>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-3 w-full max-w-md">
        {steps.slice(4).map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className={`relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
              <step.icon className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-background border border-border flex items-center justify-center text-xs font-bold text-foreground">
                {step.num}
              </div>
            </div>
            <span className="text-xs text-center text-muted-foreground">{step.label}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 mt-2">
        <Rocket className="w-4 h-4 text-emerald-400" />
        <span className="text-xs text-emerald-400">From zero to deployed in one session</span>
      </div>
    </div>
  )
}

function StepDatabaseSchemaDiagram() {
  const tables = [
    { 
      name: "profiles", 
      icon: Users, 
      fields: ["id", "email", "full_name", "role"],
      color: "border-blue-500/50"
    },
    { 
      name: "tickets", 
      icon: TicketCheck, 
      fields: ["id", "user_id", "title", "status", "priority"],
      color: "border-amber-500/50"
    },
    { 
      name: "messages", 
      icon: MessageSquare, 
      fields: ["id", "ticket_id", "role", "content"],
      color: "border-emerald-500/50"
    },
    { 
      name: "knowledge_base", 
      icon: BookOpen, 
      fields: ["id", "title", "content", "embedding"],
      color: "border-violet-500/50"
    },
  ]
  
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Settings className="w-4 h-4" />
        <span>Click Settings &rarr; Add Integration &rarr; Supabase</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {tables.map((table, i) => (
          <div key={i} className={`flex flex-col gap-2 p-3 rounded-lg bg-muted/30 border ${table.color}`}>
            <div className="flex items-center gap-2">
              <table.icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-mono font-medium text-foreground">{table.name}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {table.fields.map((field, j) => (
                <span key={j} className="px-1.5 py-0.5 rounded bg-background/50 text-xs font-mono text-muted-foreground">
                  {field}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>Row Level Security</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <GitBranch className="w-3.5 h-3.5 text-blue-500" />
          <span>Foreign Keys</span>
        </div>
      </div>
    </div>
  )
}

function StepAgentFlowDiagram() {
  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="w-full max-w-sm space-y-2">
        {/* User Input */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <Users className="w-5 h-5 text-blue-400 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-medium text-foreground">User Message</span>
            <p className="text-xs text-muted-foreground">&quot;How do I reset my password?&quot;</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
        </div>
        
        {/* Agent Processing */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
          <Bot className="w-5 h-5 text-indigo-400 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-medium text-foreground">Agent Reasoning</span>
            <p className="text-xs text-muted-foreground">Decides to search knowledge base</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
        </div>
        
        {/* Tool Execution */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <Search className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-medium text-foreground">Tool: searchKnowledge</span>
            <p className="text-xs text-muted-foreground">Query: &quot;password reset&quot;</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
        </div>
        
        {/* Database Query */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
          <Database className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-medium text-foreground">Supabase Query</span>
            <p className="text-xs text-muted-foreground">Returns 3 matching articles</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <ArrowDown className="w-4 h-4 text-muted-foreground" />
        </div>
        
        {/* Response */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-pink-500/10 border border-pink-500/30">
          <MessageSquare className="w-5 h-5 text-pink-400 flex-shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-medium text-foreground">Streaming Response</span>
            <p className="text-xs text-muted-foreground">Synthesized answer from results</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 text-xs text-muted-foreground">
        <CircleDot className="w-3 h-3" />
        <span>maxSteps: 5 for complex multi-tool queries</span>
      </div>
    </div>
  )
}

function AgentDiagram() {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="relative">
        <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
          <Bot className="w-12 h-12 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-white">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>
      <div className="text-sm font-semibold text-foreground">AI Agent</div>
      <div className="text-xs text-muted-foreground text-center max-w-xs">
        Autonomous reasoning with tool execution
      </div>
      
      <div className="w-px h-6 bg-gradient-to-b from-border to-transparent" />
      
      <div className="grid grid-cols-4 gap-3">
        {[
          { icon: Wrench, label: "Tools", color: "from-orange-500 to-amber-500" },
          { icon: Database, label: "Data", color: "from-emerald-500 to-green-500" },
          { icon: CreditCard, label: "Payments", color: "from-pink-500 to-rose-500" },
          { icon: Link2, label: "APIs", color: "from-blue-500 to-indigo-500" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} shadow-lg`}>
              <item.icon className="w-6 h-6 text-white" />
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
    <div className="flex flex-col items-center gap-5 p-6">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Next.js App</div>
      
      <div className="relative flex items-center justify-center w-full max-w-md h-16 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 shadow-xl">
        <Code className="w-5 h-5 text-zinc-400 mr-2" />
        <span className="font-mono text-sm text-zinc-300">AI SDK v6</span>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-400">
          TypeScript
        </div>
      </div>
      
      <div className="flex items-center gap-1 text-muted-foreground">
        <div className="w-px h-8 bg-border" />
      </div>
      
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {[
          { label: "generateText()", desc: "Single response", icon: FileText },
          { label: "streamText()", desc: "Real-time stream", icon: Zap },
          { label: "generateObject()", desc: "Structured JSON", icon: Database },
          { label: "useChat()", desc: "React hook", icon: MessageSquare },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
            <item.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-mono text-xs text-foreground">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AIGatewayDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6">
      <div className="relative flex items-center justify-center w-full max-w-xs h-14 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg shadow-blue-500/25">
        <Cloud className="w-5 h-5 text-white mr-2" />
        <span className="font-semibold text-white">AI Gateway</span>
        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-xs text-white font-medium">
          Zero Config
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-muted-foreground">
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
          <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900 border border-zinc-800">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-foreground">{provider.name}</span>
              <span className="text-xs text-muted-foreground font-mono">{provider.model}</span>
            </div>
            {provider.free && (
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function MCPDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25">
        <Link2 className="w-8 h-8 text-white" />
      </div>
      <div className="text-sm font-semibold text-foreground">Model Context Protocol</div>
      <div className="text-xs text-muted-foreground text-center max-w-xs">
        Standardized AI-to-service communication
      </div>
      
      <div className="grid grid-cols-3 gap-3 w-full max-w-md">
        {[
          { name: "Linear", desc: "Issues & sprints" },
          { name: "Notion", desc: "Docs & wikis" },
          { name: "Slack", desc: "Team messaging" },
          { name: "Sentry", desc: "Error tracking" },
          { name: "PostHog", desc: "Analytics" },
          { name: "GitHub", desc: "Code & PRs" },
        ].map((service, i) => (
          <div key={i} className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted/30 border border-border hover:border-indigo-500/50 transition-colors">
            <span className="text-xs font-medium text-foreground">{service.name}</span>
            <span className="text-xs text-muted-foreground text-center">{service.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DatabaseDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Storage Integrations</div>
      
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {[
          { name: "Supabase", desc: "Postgres + Auth + Realtime", recommended: true, color: "border-emerald-500/50 bg-emerald-500/5" },
          { name: "Neon", desc: "Serverless Postgres", recommended: false, color: "border-border" },
          { name: "Upstash", desc: "Redis (caching/queues)", recommended: false, color: "border-border" },
          { name: "Aurora", desc: "AWS Managed DB", recommended: false, color: "border-border" },
        ].map((db, i) => (
          <div key={i} className={`relative flex flex-col gap-1 p-4 rounded-lg border ${db.color}`}>
            {db.recommended && (
              <div className="absolute -top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-xs text-white font-medium">
                Recommended
              </div>
            )}
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{db.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{db.desc}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
        <Shield className="w-4 h-4 text-blue-400" />
        <span className="text-xs text-blue-400">One-click setup in v0</span>
      </div>
    </div>
  )
}

function BlobStorageDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-amber-500/25">
        <HardDrive className="w-8 h-8 text-white" />
      </div>
      <div className="text-sm font-semibold text-foreground">Vercel Blob</div>
      
      <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
        {[
          { icon: ImageIcon, label: "Images" },
          { icon: FileText, label: "Documents" },
          { icon: Upload, label: "User Files" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border">
            <item.icon className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
    <div className="flex flex-col items-center gap-5 p-6">
      <div className="flex items-center gap-4 w-full max-w-lg">
        {[
          { icon: MessageSquare, label: "Describe", color: "from-blue-500 to-cyan-500" },
          { icon: Code, label: "Generate", color: "from-emerald-500 to-green-500" },
          { icon: Eye, label: "Preview", color: "from-amber-500 to-orange-500" },
          { icon: Rocket, label: "Deploy", color: "from-pink-500 to-rose-500" },
        ].map((step, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} shadow-lg`}>
              <step.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-medium text-foreground">{step.label}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
        <Play className="w-4 h-4 text-emerald-500" />
        <span className="text-xs text-muted-foreground">Live preview with Hot Module Replacement</span>
      </div>
    </div>
  )
}

function VercelEcosystemDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">The Vercel AI Platform</div>
      
      <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
        {[
          { icon: Bot, label: "AI Agents", desc: "Reasoning + Tools", color: "from-blue-500 to-cyan-500" },
          { icon: Code, label: "AI SDK", desc: "TypeScript Toolkit", color: "from-zinc-600 to-zinc-800" },
          { icon: Cloud, label: "AI Gateway", desc: "All Providers", color: "from-indigo-500 to-violet-500" },
          { icon: Link2, label: "MCP", desc: "Integrations", color: "from-emerald-500 to-green-500" },
          { icon: Database, label: "Database", desc: "Supabase/Neon", color: "from-amber-500 to-orange-500" },
          { icon: CreditCard, label: "Payments", desc: "Stripe", color: "from-pink-500 to-rose-500" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-muted/20 border border-border hover:border-primary/50 transition-colors">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${item.color}`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-foreground">{item.label}</span>
            <span className="text-xs text-muted-foreground text-center">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArchitectureDiagram() {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="w-full max-w-lg space-y-3">
        {/* Frontend */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
          <Layout className="w-6 h-6 text-blue-400" />
          <div>
            <span className="text-sm font-medium text-foreground">Next.js + AI SDK React</span>
            <p className="text-xs text-muted-foreground">useChat(), Streaming UI, Server Components</p>
          </div>
        </div>
        
        {/* AI Layer */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-indigo-500/30">
          <Bot className="w-6 h-6 text-indigo-400" />
          <div>
            <span className="text-sm font-medium text-foreground">AI Gateway + MCP</span>
            <p className="text-xs text-muted-foreground">Multi-provider AI, External service tools</p>
          </div>
        </div>
        
        {/* Backend Services */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <Database className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-medium text-foreground">Supabase</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <HardDrive className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-medium text-foreground">Blob</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-pink-500/10 border border-pink-500/30">
            <CreditCard className="w-5 h-5 text-pink-400" />
            <span className="text-xs font-medium text-foreground">Stripe</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function HackathonDiagram() {
  return (
    <div className="flex flex-col items-center gap-5 p-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg shadow-orange-500/25">
        <Trophy className="w-8 h-8 text-white" />
      </div>
      
      <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
        {[
          { icon: Sparkles, label: "v0 + AI SDK", time: "10 min" },
          { icon: Database, label: "Supabase", time: "5 min" },
          { icon: Link2, label: "MCP Tools", time: "5 min" },
          { icon: CreditCard, label: "Stripe", time: "10 min" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
            <item.icon className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{item.label}</span>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col items-center gap-1">
        <span className="text-2xl font-bold text-foreground">~30 minutes</span>
        <p className="text-sm text-muted-foreground">to a deployed AI product</p>
      </div>
    </div>
  )
}
