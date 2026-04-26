export interface Slide {
  id: number
  title: string
  subtitle?: string
  content: string[]
  code?: string
  codeLanguage?: string
  diagram?:
    | "intro-hero"
    | "presenter-hero"
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
  highlight?: string
  section?: string
  step?: number
}

export const slides: Slide[] = [
  // INTRO
  {
    id: 1,
    title: "The Vercel AI Stack",
    subtitle: "Building Production-Ready AI Applications",
    content: [],
    diagram: "intro-hero",
    section: "intro",
  },

  // PRESENTER
  {
    id: 0,
    title: "Sebastian Lujan",
    subtitle: "@delegate_call",
    content: [],
    diagram: "presenter-hero",
    section: "presenter",
  },
  {
    id: 2,
    title: "What We Will Cover",
    subtitle: "The Complete AI Development Journey",
    content: [
      "AI Agents - Autonomous systems that reason and act",
      "AI SDK - The TypeScript toolkit for AI applications",
      "AI Gateway - One API for all AI providers",
      "MCP - Model Context Protocol for external integrations",
      "Database & Storage - Supabase, Neon, Vercel Blob",
      "Step-by-Step: Building a Data-Driven Agent",
    ],
    diagram: "vercel-ecosystem",
    section: "intro",
  },

  // AGENTS SECTION
  {
    id: 3,
    title: "What is an AI Agent?",
    subtitle: "Beyond Simple Chatbots",
    content: [
      "An autonomous system that can reason, plan, and execute",
      "Uses tools to interact with external systems",
      "Makes decisions based on context and user goals",
      "Can complete multi-step tasks without guidance",
    ],
    diagram: "agent",
    section: "agents",
  },
  {
    id: 4,
    title: "Agent Architecture",
    subtitle: "How Agents Think and Act",
    content: [
      "Perception - Understand user intent from natural language",
      "Reasoning - Decide which tools and steps are needed",
      "Action - Execute tools (APIs, databases, payments)",
      "Reflection - Evaluate results and adjust strategy",
    ],
    code: `// Agent loop with tools
const result = await generateText({
  model: "anthropic/claude-sonnet-4",
  maxSteps: 10, // Allow multi-step reasoning
  tools: {
    searchProducts: tool({ ... }),
    getInventory: tool({ ... }),
    createOrder: tool({ ... }),
    processPayment: tool({ ... })
  },
  system: \`You are a shopping assistant. 
  Help users find products and complete purchases.
  Use tools to search, check inventory, and checkout.\`,
  prompt: userMessage
})`,
    codeLanguage: "typescript",
    section: "agents",
  },

  // AI SDK SECTION
  {
    id: 5,
    title: "Vercel AI SDK",
    subtitle: "The TypeScript Toolkit for AI",
    content: [
      "Unified API across all major AI providers",
      "Built-in streaming for real-time responses",
      "Structured output generation with Zod schemas",
      "React hooks for seamless UI integration",
      "Works on Edge, Node.js, and serverless",
    ],
    diagram: "ai-sdk",
    section: "ai-sdk",
  },
  {
    id: 6,
    title: "Core AI SDK Functions",
    subtitle: "Four Functions to Master",
    content: [
      "generateText() - Get a single complete response",
      "streamText() - Stream responses in real-time",
      "generateObject() - Get structured JSON data",
      "useChat() - React hook for chat interfaces",
    ],
    code: `import { generateText, streamText, generateObject } from "ai"
import { z } from "zod"

// Generate text
const { text } = await generateText({
  model: "openai/gpt-4o",
  prompt: "Explain quantum computing"
})

// Stream text
const result = streamText({
  model: "anthropic/claude-sonnet-4",
  prompt: "Write a story"
})

// Generate structured data
const { object } = await generateObject({
  model: "google/gemini-2.5-pro",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    sentiment: z.enum(["positive", "negative", "neutral"])
  }),
  prompt: "Analyze this article..."
})`,
    codeLanguage: "typescript",
    section: "ai-sdk",
  },

  // AI GATEWAY
  {
    id: 7,
    title: "AI Gateway",
    subtitle: "One API, Every Provider",
    content: [
      "Zero configuration for supported providers",
      "No provider-specific packages needed",
      "Automatic fallbacks and load balancing",
      "Built-in observability and cost tracking",
      "Works instantly in v0 and Vercel deployments",
    ],
    diagram: "ai-gateway",
    section: "ai-gateway",
  },
  {
    id: 8,
    title: "Using AI Gateway",
    subtitle: "Just Pass a Model String",
    content: [
      "Format: 'provider/model-name'",
      "Zero-config: OpenAI, Anthropic, Google, AWS Bedrock, Fireworks",
      "With API key: xAI, Groq, Fal, DeepInfra",
    ],
    code: `import { generateText } from "ai"

// OpenAI - zero config
await generateText({
  model: "openai/gpt-4o",
  prompt: "Hello world"
})

// Anthropic - zero config
await generateText({
  model: "anthropic/claude-sonnet-4",
  prompt: "Explain recursion"
})

// Google - zero config  
await generateText({
  model: "google/gemini-2.5-pro",
  prompt: "Analyze this data"
})

// Image generation with Nano Banana 2
await generateText({
  model: "google/gemini-3.1-flash-image-preview",
  prompt: "Generate an image of a sunset"
})`,
    codeLanguage: "typescript",
    section: "ai-gateway",
  },

  // MCP SECTION
  {
    id: 9,
    title: "Model Context Protocol (MCP)",
    subtitle: "Connect AI to External Services",
    content: [
      "Standardized protocol for AI-to-service communication",
      "Pre-built integrations: Linear, Notion, Slack, Sentry",
      "Enable agents to access real-world data and APIs",
      "Secure, authenticated connections to your tools",
    ],
    diagram: "mcp",
    section: "mcp",
  },
  {
    id: 10,
    title: "MCP in Action",
    subtitle: "Real-World Integration Examples",
    content: [
      "Linear - Create issues, manage sprints from chat",
      "Notion - Search and update your workspace",
      "Slack - Send messages, read channels",
      "Sentry - Query errors, track performance",
      "PostHog - Analytics and feature flags",
    ],
    code: `// Agent with MCP-powered tools
const projectAgent = await generateText({
  model: "openai/gpt-4o",
  tools: {
    // Linear MCP integration
    createIssue: tool({
      description: "Create a Linear issue",
      parameters: z.object({
        title: z.string(),
        description: z.string(),
        priority: z.enum(["low", "medium", "high", "urgent"])
      }),
      execute: async (params) => linearClient.createIssue(params)
    }),
    
    // Notion MCP integration
    searchDocs: tool({
      description: "Search Notion workspace",
      parameters: z.object({ query: z.string() }),
      execute: async ({ query }) => notionClient.search(query)
    }),
    
    // Slack MCP integration
    notifyTeam: tool({
      description: "Send Slack notification",
      parameters: z.object({ 
        channel: z.string(), 
        message: z.string() 
      }),
      execute: async (params) => slackClient.postMessage(params)
    })
  },
  prompt: "Create a bug report and notify the team"
})`,
    codeLanguage: "typescript",
    section: "mcp",
  },

  // DATABASE SECTION
  {
    id: 11,
    title: "Database Integrations",
    subtitle: "Production-Ready Data Storage",
    content: [
      "Supabase - Postgres + Auth + Realtime (Recommended)",
      "Neon - Serverless Postgres with branching",
      "Upstash - Redis for caching and rate limiting",
      "Aurora - AWS managed PostgreSQL/DSQL",
      "One-click setup in v0 - no configuration needed",
    ],
    diagram: "database",
    section: "database",
  },
  {
    id: 12,
    title: "Supabase Integration",
    subtitle: "Database + Auth in Minutes",
    content: [
      "Automatic schema detection in v0",
      "Built-in Row Level Security (RLS)",
      "Real-time subscriptions",
      "Native authentication system",
    ],
    code: `// Server Component with Supabase
import { createClient } from "@/lib/supabase/server"

export default async function Products() {
  const supabase = await createClient()
  
  // Fetch products with RLS applied
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
  
  return <ProductGrid products={products} />
}

// Agent tool using Supabase
const searchProducts = tool({
  description: "Search products by name or category",
  parameters: z.object({
    query: z.string(),
    category: z.string().optional()
  }),
  execute: async ({ query, category }) => {
    const supabase = await createClient()
    let q = supabase.from("products").select("*")
    
    if (query) q = q.textSearch("name", query)
    if (category) q = q.eq("category", category)
    
    const { data } = await q.limit(10)
    return data
  }
})`,
    codeLanguage: "typescript",
    section: "database",
  },

  // BLOB STORAGE
  {
    id: 13,
    title: "Vercel Blob Storage",
    subtitle: "File Uploads Made Simple",
    content: [
      "Store images, documents, and user uploads",
      "Automatic CDN distribution",
      "Private or public access control",
      "Works seamlessly with AI image generation",
    ],
    diagram: "blob-storage",
    section: "storage",
  },
  {
    id: 14,
    title: "Blob in Practice",
    subtitle: "Upload and Serve Files",
    content: [
      "Client-side uploads with signed URLs",
      "Server-side processing and storage",
      "Perfect for user avatars, documents, AI-generated images",
    ],
    code: `import { put, del, list } from "@vercel/blob"

// Server Action: Upload file
export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File
  
  const blob = await put(file.name, file, {
    access: "private", // or "public"
  })
  
  return blob.url
}

// Agent tool: Store AI-generated image
const saveGeneratedImage = tool({
  description: "Save an AI-generated image",
  parameters: z.object({
    imageUrl: z.string(),
    filename: z.string()
  }),
  execute: async ({ imageUrl, filename }) => {
    const response = await fetch(imageUrl)
    const imageBlob = await response.blob()
    
    const { url } = await put(filename, imageBlob, {
      access: "private"
    })
    
    return { savedUrl: url }
  }
})`,
    codeLanguage: "typescript",
    section: "storage",
  },

  // PAYMENTS
  {
    id: 15,
    title: "Stripe Integration",
    subtitle: "Payments via Agent Tools",
    content: [
      "Create checkout sessions from conversation",
      "Handle subscriptions and one-time payments",
      "Manage products and prices programmatically",
      "Webhooks for order fulfillment",
    ],
    code: `import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Checkout tool for shopping agent
const createCheckout = tool({
  description: "Create a Stripe checkout session",
  parameters: z.object({
    items: z.array(z.object({
      productId: z.string(),
      quantity: z.number()
    })),
    customerEmail: z.string().email()
  }),
  execute: async ({ items, customerEmail }) => {
    // Fetch product prices from your database
    const lineItems = await Promise.all(
      items.map(async (item) => ({
        price: await getPriceId(item.productId),
        quantity: item.quantity
      }))
    )
    
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      line_items: lineItems,
      success_url: \`\${baseUrl}/success?session={CHECKOUT_SESSION_ID}\`,
      cancel_url: \`\${baseUrl}/cart\`
    })
    
    return { checkoutUrl: session.url }
  }
})`,
    codeLanguage: "typescript",
    section: "payments",
  },

  // ===== STEP-BY-STEP TUTORIAL SECTION =====
  {
    id: 16,
    title: "Building a Data-Driven Agent",
    subtitle: "Live Demo: /demo",
    content: [
      "Customer Support Agent with tool calling",
      "Knowledge base search + ticket management",
      "Real-time streaming responses",
      "Try it now: click the link below",
    ],
    diagram: "step-overview",
    highlight: "Live Demo",
    section: "tutorial",
  },
  
  // STEP 1: Project Setup
  {
    id: 17,
    title: "Step 1: Project Setup",
    subtitle: "Initialize Your v0 Project",
    content: [
      "Create a new project in v0.dev",
      "v0 automatically sets up Next.js 16 + TypeScript",
      "AI SDK v6 is pre-configured",
      "Tailwind CSS v4 and shadcn/ui ready to use",
    ],
    code: `// v0 creates this structure automatically:
/app
  /api
    /chat
      route.ts        // AI endpoint
  layout.tsx          // Root layout
  page.tsx            // Home page
  globals.css         // Tailwind + design tokens
  
/components
  /ui                 // shadcn components
  
/lib
  /supabase           // After connecting Supabase
    server.ts
    client.ts
  utils.ts            // cn() helper

// Dependencies auto-installed:
// - ai (AI SDK v6)
// - @ai-sdk/react
// - zod
// - lucide-react`,
    codeLanguage: "plaintext",
    section: "tutorial",
    step: 1,
  },

  // STEP 2: Connect Supabase
  {
    id: 18,
    title: "Step 2: Connect Supabase",
    subtitle: "One-Click Database Integration",
    content: [
      "Click Settings (gear icon) in v0 top-right",
      "Go to Settings tab and click 'Add Integration'",
      "Select Supabase and authorize",
      "Environment variables are automatically added",
    ],
    diagram: "step-database-schema",
    section: "tutorial",
    step: 2,
  },

  // STEP 3: Create Database Schema
  {
    id: 19,
    title: "Step 3: Create Database Schema",
    subtitle: "Define Your Data Model",
    content: [
      "Create SQL migration scripts in /scripts folder",
      "v0 can execute these directly on your Supabase",
      "Enable Row Level Security (RLS) for production",
      "Tables: users, tickets, messages, knowledge_base",
    ],
    code: `-- scripts/001_create_tables.sql

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Support tickets
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  title TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  priority TEXT DEFAULT 'medium',
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ticket messages (conversation history)
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES public.tickets(id),
  role TEXT NOT NULL, -- 'user' | 'assistant' | 'agent'
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge base for RAG
CREATE TABLE public.knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  embedding VECTOR(1536), -- For semantic search
  created_at TIMESTAMPTZ DEFAULT NOW()
);`,
    codeLanguage: "sql",
    section: "tutorial",
    step: 3,
  },

  // STEP 4: Enable Row Level Security
  {
    id: 20,
    title: "Step 4: Enable Row Level Security",
    subtitle: "Secure Your Data",
    content: [
      "RLS ensures users only see their own data",
      "Policies are enforced at the database level",
      "Critical for multi-tenant applications",
      "Works automatically with Supabase Auth",
    ],
    code: `-- scripts/002_enable_rls.sql

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read/update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Tickets: Users see their own, agents see all
CREATE POLICY "Users can view own tickets" ON public.tickets
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'agent'
    )
  );

CREATE POLICY "Users can create tickets" ON public.tickets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Messages: Tied to ticket access
CREATE POLICY "Users can view ticket messages" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tickets
      WHERE tickets.id = messages.ticket_id
      AND (tickets.user_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.profiles
          WHERE id = auth.uid() AND role = 'agent'
        ))
    )
  );

-- Knowledge base: Public read access
CREATE POLICY "Anyone can read knowledge base" ON public.knowledge_base
  FOR SELECT USING (true);`,
    codeLanguage: "sql",
    section: "tutorial",
    step: 4,
  },

  // STEP 5: Create Supabase Client
  {
    id: 21,
    title: "Step 5: Create Supabase Clients",
    subtitle: "Server and Client Utilities",
    content: [
      "Server client for API routes and Server Components",
      "Client for browser-side real-time subscriptions",
      "Automatic cookie-based authentication",
      "v0 generates these when you connect Supabase",
    ],
    code: `// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component - ignore
          }
        },
      },
    }
  )
}

// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}`,
    codeLanguage: "typescript",
    section: "tutorial",
    step: 5,
  },

  // STEP 6: Define Agent Tools
  {
    id: 22,
    title: "Step 6: Define Agent Tools",
    subtitle: "Connect AI to Your Database",
    content: [
      "Tools are functions the AI can call",
      "Each tool has a description, parameters, and execute function",
      "Zod schemas provide type safety and validation",
      "Tools connect to Supabase, Stripe, MCP services",
    ],
    code: `// lib/agent/tools.ts
import { tool } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

// Search knowledge base for answers
export const searchKnowledge = tool({
  description: "Search the knowledge base for relevant articles",
  parameters: z.object({
    query: z.string().describe("The search query"),
    category: z.string().optional()
  }),
  execute: async ({ query, category }) => {
    const supabase = await createClient()
    
    let q = supabase
      .from("knowledge_base")
      .select("id, title, content, category")
      .textSearch("content", query)
      .limit(5)
    
    if (category) q = q.eq("category", category)
    
    const { data, error } = await q
    if (error) throw error
    
    return data
  }
})

// Get user's ticket history
export const getTicketHistory = tool({
  description: "Get the user's support ticket history",
  parameters: z.object({
    status: z.enum(["open", "closed", "all"]).optional(),
    limit: z.number().default(10)
  }),
  execute: async ({ status, limit }, { userId }) => {
    const supabase = await createClient()
    
    let q = supabase
      .from("tickets")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(limit)
    
    if (status && status !== "all") {
      q = q.eq("status", status)
    }
    
    const { data } = await q
    return data
  }
})

// Create a new support ticket
export const createTicket = tool({
  description: "Create a new support ticket for the user",
  parameters: z.object({
    title: z.string().describe("Brief title of the issue"),
    category: z.enum(["billing", "technical", "account", "general"]),
    priority: z.enum(["low", "medium", "high", "urgent"]),
    description: z.string().describe("Detailed description")
  }),
  execute: async ({ title, category, priority, description }, { userId }) => {
    const supabase = await createClient()
    
    const { data: ticket, error } = await supabase
      .from("tickets")
      .insert({
        user_id: userId,
        title,
        category,
        priority,
        status: "open"
      })
      .select()
      .single()
    
    if (error) throw error
    
    // Add initial message
    await supabase.from("messages").insert({
      ticket_id: ticket.id,
      role: "user",
      content: description
    })
    
    return { ticketId: ticket.id, message: "Ticket created successfully" }
  }
})`,
    codeLanguage: "typescript",
    section: "tutorial",
    step: 6,
  },

  // STEP 7: Build the Agent API Route
  {
    id: 23,
    title: "Step 7: Build the Agent API",
    subtitle: "The AI Endpoint",
    content: [
      "Streaming API route using streamText()",
      "System prompt defines agent behavior",
      "maxSteps enables multi-tool workflows",
      "onFinish saves conversation to database",
    ],
    code: `// app/api/chat/route.ts
import { streamText } from "ai"
import { createClient } from "@/lib/supabase/server"
import { 
  searchKnowledge, 
  getTicketHistory, 
  createTicket,
  escalateToHuman,
  checkOrderStatus
} from "@/lib/agent/tools"

export async function POST(req: Request) {
  const { messages, ticketId } = await req.json()
  const supabase = await createClient()
  
  // Get authenticated user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }
  
  // Get user profile for context
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()
  
  const result = streamText({
    model: "anthropic/claude-sonnet-4",
    system: \`You are a helpful customer support agent for Acme Inc.
    
Current user: \${profile?.full_name || "Customer"}
Account type: \${profile?.role}

Your capabilities:
- Search the knowledge base for answers
- View and create support tickets
- Check order status
- Escalate to human agents when needed

Guidelines:
1. Always search the knowledge base first
2. Be concise and helpful
3. If you can't resolve the issue, create a ticket
4. For billing disputes or refunds, escalate to human
5. Never share other customers' information\`,
    messages,
    tools: {
      searchKnowledge,
      getTicketHistory,
      createTicket,
      escalateToHuman,
      checkOrderStatus
    },
    maxSteps: 5, // Allow multi-step reasoning
    toolContext: { userId: user.id },
    onFinish: async ({ text }) => {
      // Save assistant response to conversation history
      if (ticketId) {
        await supabase.from("messages").insert({
          ticket_id: ticketId,
          role: "assistant",
          content: text
        })
      }
    }
  })
  
  return result.toDataStreamResponse()
}`,
    codeLanguage: "typescript",
    section: "tutorial",
    step: 7,
  },

  // STEP 8: Build the Chat UI
  {
    id: 24,
    title: "Step 8: Build the Chat UI",
    subtitle: "React Hook for Streaming",
    content: [
      "useChat() handles all message state",
      "Automatic streaming display",
      "Shows tool invocations in progress",
      "Optimistic updates for smooth UX",
    ],
    code: `// components/support-chat.tsx
"use client"

import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Bot, User, Loader2, Wrench } from "lucide-react"

export function SupportChat({ ticketId }: { ticketId?: string }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = 
    useChat({
      api: "/api/chat",
      body: { ticketId },
      initialMessages: []
    })
  
  return (
    <Card className="flex flex-col h-[600px]">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            <div className="flex-shrink-0">
              {message.role === "user" ? (
                <User className="w-6 h-6 text-blue-500" />
              ) : (
                <Bot className="w-6 h-6 text-emerald-500" />
              )}
            </div>
            <div className="flex-1">
              {/* Show tool calls */}
              {message.toolInvocations?.map((tool) => (
                <div 
                  key={tool.toolCallId} 
                  className="flex items-center gap-2 text-sm 
                             text-muted-foreground mb-2"
                >
                  <Wrench className="w-4 h-4" />
                  <span>
                    {tool.state === "result" 
                      ? \`Used \${tool.toolName}\` 
                      : \`Calling \${tool.toolName}...\`}
                  </span>
                </div>
              ))}
              {/* Message content */}
              <p className="text-foreground">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Thinking...</span>
          </div>
        )}
      </div>
      
      {/* Input Form */}
      <form 
        onSubmit={handleSubmit} 
        className="p-4 border-t flex gap-2"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Describe your issue..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </Card>
  )
}`,
    codeLanguage: "typescript",
    section: "tutorial",
    step: 8,
  },

  // STEP 9: Add MCP Integration
  {
    id: 25,
    title: "Step 9: Add MCP Integration",
    subtitle: "Connect to External Services",
    content: [
      "Connect Linear in v0 Settings for issue tracking",
      "Agent can create real Linear issues for escalations",
      "MCP handles authentication automatically",
      "Same pattern works for Slack, Notion, Sentry",
    ],
    code: `// lib/agent/tools.ts - Add Linear escalation

// First, connect Linear MCP in v0 Settings
// Then add this tool to your agent

export const escalateToHuman = tool({
  description: "Escalate complex issues to human support team",
  parameters: z.object({
    ticketId: z.string(),
    reason: z.string().describe("Why this needs human attention"),
    priority: z.enum(["normal", "high", "urgent"]),
    summary: z.string().describe("Brief summary for the agent")
  }),
  execute: async ({ ticketId, reason, priority, summary }) => {
    const supabase = await createClient()
    
    // Update ticket status
    await supabase
      .from("tickets")
      .update({ 
        status: "escalated",
        priority: priority === "urgent" ? "urgent" : "high"
      })
      .eq("id", ticketId)
    
    // Create Linear issue via MCP
    const linearIssue = await linearClient.createIssue({
      title: \`[Escalated] \${summary}\`,
      description: \`
## Customer Support Escalation

**Ticket ID:** \${ticketId}
**Priority:** \${priority}
**Reason:** \${reason}

### Summary
\${summary}
      \`,
      teamId: process.env.LINEAR_SUPPORT_TEAM_ID,
      priority: priority === "urgent" ? 1 : 2,
      labelIds: ["escalation"]
    })
    
    // Link Linear issue to ticket
    await supabase
      .from("tickets")
      .update({ 
        metadata: { linearIssueId: linearIssue.id } 
      })
      .eq("id", ticketId)
    
    return {
      success: true,
      message: "Escalated to human support team",
      linearIssueId: linearIssue.id
    }
  }
})`,
    codeLanguage: "typescript",
    section: "tutorial",
    step: 9,
  },

  // STEP 10: Deploy
  {
    id: 26,
    title: "Step 10: Deploy to Production",
    subtitle: "One-Click Deployment",
    content: [
      "Click 'Publish' in v0 top-right corner",
      "Environment variables transfer automatically",
      "Deployed on Vercel Edge Network globally",
      "SSL, CDN, and scaling handled for you",
    ],
    diagram: "v0-workflow",
    section: "tutorial",
    step: 10,
  },

  // FULL ARCHITECTURE RECAP
  {
    id: 27,
    title: "Complete Architecture",
    subtitle: "What We Built",
    content: [
      "Next.js 16 frontend with streaming chat UI",
      "AI Agent with 5+ tools (search, tickets, escalate)",
      "Supabase for auth, database, and RLS",
      "Linear MCP for issue escalation",
      "Deployed globally on Vercel Edge",
    ],
    diagram: "architecture",
    section: "architecture",
  },

  // Agent Flow Diagram
  {
    id: 28,
    title: "Agent Decision Flow",
    subtitle: "How the Agent Processes Requests",
    content: [
      "User message triggers the agent loop",
      "Agent decides which tools to use",
      "Tools execute and return results",
      "Agent synthesizes response from tool outputs",
      "Up to 5 steps for complex queries",
    ],
    diagram: "step-agent-flow",
    section: "architecture",
  },

  // TIPS
  {
    id: 29,
    title: "Hackathon Success Tips",
    subtitle: "Ship Fast, Ship Smart",
    content: [
      "Start with v0 - describe your vision, iterate quickly",
      "Use Supabase for instant auth + database",
      "AI Gateway = zero config, just code",
      "Add Stripe last - focus on core features first",
      "Deploy early, demo often",
    ],
    diagram: "hackathon",
    section: "tips",
  },

  // RESOURCES
  {
    id: 30,
    title: "Resources",
    subtitle: "Start Building Now",
    content: [
      "v0.dev - AI-powered development",
      "sdk.vercel.ai - AI SDK documentation",
      "supabase.com/docs - Database & Auth",
      "vercel.com/docs - Platform guides",
      "stripe.com/docs - Payments",
    ],
    highlight: "Good luck at your hackathon!",
    section: "resources",
  },
]
