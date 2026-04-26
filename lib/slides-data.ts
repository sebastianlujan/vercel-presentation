export interface Slide {
  id: number
  title: string
  subtitle?: string
  content: string[]
  code?: string
  codeLanguage?: string
  diagram?: 
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
  highlight?: string
  section?: string
}

export const slides: Slide[] = [
  // INTRO
  {
    id: 1,
    title: "The Vercel AI Stack",
    subtitle: "Building Production-Ready AI Applications",
    content: [
      "From v0 prototypes to deployed AI agents",
      "Database, payments, storage, and AI - unified",
      "Everything you need to win your next hackathon",
    ],
    highlight: "DevRel Workshop",
    section: "intro",
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
      "Payments - Stripe integration with agent tools",
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

  // V0 WORKFLOW
  {
    id: 16,
    title: "The v0 Development Flow",
    subtitle: "From Prompt to Production",
    content: [
      "Describe your app in natural language",
      "v0 generates code, connects integrations",
      "Preview and iterate in real-time",
      "Deploy to Vercel with one click",
    ],
    diagram: "v0-workflow",
    section: "v0",
  },

  // FULL ARCHITECTURE
  {
    id: 17,
    title: "Complete Architecture",
    subtitle: "Hackathon-Winning Stack",
    content: [
      "Frontend: Next.js + AI SDK React hooks",
      "AI: AI Gateway + MCP integrations",
      "Database: Supabase (auth + data)",
      "Storage: Vercel Blob",
      "Payments: Stripe",
    ],
    diagram: "architecture",
    section: "architecture",
  },

  // HACKATHON EXAMPLE
  {
    id: 18,
    title: "Hackathon Project: AI Assistant",
    subtitle: "Full-Stack AI App in 30 Minutes",
    content: [
      "Natural language interface with streaming",
      "Database-backed conversation history",
      "Multi-tool agent (search, create, checkout)",
      "User authentication with Supabase",
      "Deployed globally on Vercel Edge",
    ],
    code: `// Complete AI Assistant with all integrations
import { streamText } from "ai"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const { messages, userId } = await req.json()
  const supabase = await createClient()
  
  const result = streamText({
    model: "anthropic/claude-sonnet-4",
    system: \`You are a helpful assistant with access to:
    - Product search and inventory
    - User account management  
    - Stripe checkout for purchases
    - Linear for creating support tickets\`,
    messages,
    tools: {
      searchProducts,      // Supabase query
      getUserOrders,       // Supabase query
      createCheckout,      // Stripe integration
      createSupportTicket, // Linear MCP
      uploadDocument       // Vercel Blob
    },
    maxSteps: 5,
    onFinish: async ({ text }) => {
      // Save to conversation history
      await supabase.from("messages").insert({
        user_id: userId,
        role: "assistant",
        content: text
      })
    }
  })
  
  return result.toDataStreamResponse()
}`,
    codeLanguage: "typescript",
    section: "hackathon",
  },

  // TIPS
  {
    id: 19,
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
    id: 20,
    title: "Resources",
    subtitle: "Start Building Now",
    content: [
      "v0.dev - AI-powered development",
      "sdk.vercel.ai - AI SDK documentation",
      "supabase.com - Database & Auth",
      "vercel.com/docs - Platform guides",
      "stripe.com/docs - Payments",
    ],
    highlight: "Good luck at your hackathon!",
    section: "resources",
  },
]
