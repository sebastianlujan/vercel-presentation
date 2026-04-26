export interface Slide {
  id: number
  title: string
  subtitle?: string
  content: string[]
  code?: string
  codeLanguage?: string
  diagram?: "agent" | "ai-sdk" | "ai-gateway" | "architecture" | "hackathon"
  highlight?: string
}

export const slides: Slide[] = [
  {
    id: 1,
    title: "Building AI-Powered Apps",
    subtitle: "Agents, AI SDK & AI Gateway",
    content: [
      "A practical guide for your next hackathon",
      "From concept to production-ready AI applications",
    ],
    highlight: "Vercel AI Stack",
  },
  {
    id: 2,
    title: "What is an AI Agent?",
    subtitle: "Beyond Simple Chatbots",
    content: [
      "An autonomous system that can reason, plan, and take actions",
      "Uses tools to interact with external systems (databases, APIs, payments)",
      "Makes decisions based on context and goals",
      "Can break down complex tasks into steps",
    ],
    diagram: "agent",
  },
  {
    id: 3,
    title: "Agent Capabilities",
    subtitle: "What Makes Agents Powerful",
    content: [
      "Tool Calling - Execute functions, query databases, call APIs",
      "Multi-step Reasoning - Break problems into manageable steps",
      "Context Awareness - Remember conversation history",
      "Autonomous Execution - Complete tasks without constant guidance",
    ],
    code: `// Agent with tools
const result = await generateText({
  model: "openai/gpt-4o",
  tools: {
    getWeather: tool({
      description: "Get weather for a location",
      parameters: z.object({ city: z.string() }),
      execute: async ({ city }) => fetchWeather(city)
    }),
    createPayment: tool({
      description: "Create a Stripe payment",
      parameters: z.object({ amount: z.number() }),
      execute: async ({ amount }) => stripe.create(amount)
    })
  },
  prompt: "Book a trip to Paris and charge $500"
})`,
    codeLanguage: "typescript",
  },
  {
    id: 4,
    title: "Vercel AI SDK",
    subtitle: "The TypeScript Toolkit for AI Apps",
    content: [
      "Unified API for multiple AI providers",
      "Built-in streaming support for real-time responses",
      "Structured data generation with Zod schemas",
      "React hooks for seamless UI integration",
    ],
    diagram: "ai-sdk",
  },
  {
    id: 5,
    title: "AI SDK Core Concepts",
    subtitle: "Key Functions You Need to Know",
    content: [
      "generateText() - Single response generation",
      "streamText() - Real-time streaming responses",
      "generateObject() - Structured JSON output",
      "useChat() - React hook for chat UIs",
    ],
    code: `import { streamText } from "ai"

// Server Action
export async function chat(messages) {
  const result = streamText({
    model: "anthropic/claude-sonnet-4",
    messages,
    system: "You are a helpful assistant"
  })
  
  return result.toDataStreamResponse()
}`,
    codeLanguage: "typescript",
  },
  {
    id: 6,
    title: "AI Gateway",
    subtitle: "One API, All Providers",
    content: [
      "Access OpenAI, Anthropic, Google, and more with one SDK",
      "No provider-specific packages needed",
      "Automatic fallbacks and load balancing",
      "Built-in observability and cost tracking",
    ],
    diagram: "ai-gateway",
  },
  {
    id: 7,
    title: "Using AI Gateway",
    subtitle: "Zero Configuration Required",
    content: [
      "Just pass a model string - no API keys for supported providers",
      "Format: 'provider/model-name'",
      "Supports: OpenAI, Anthropic, Google, Fireworks, AWS Bedrock",
    ],
    code: `import { generateText } from "ai"

// No provider package needed!
// Just use the model string directly

const response = await generateText({
  model: "openai/gpt-4o",        // OpenAI
  prompt: "Explain quantum computing"
})

const response2 = await generateText({
  model: "anthropic/claude-sonnet-4", // Anthropic  
  prompt: "Write a poem"
})

const response3 = await generateText({
  model: "google/gemini-2.5-pro",   // Google
  prompt: "Analyze this data"
})`,
    codeLanguage: "typescript",
  },
  {
    id: 8,
    title: "Real-World Architecture",
    subtitle: "Hackathon-Ready Stack",
    content: [
      "Frontend: Next.js + AI SDK React hooks",
      "Backend: Server Actions + AI SDK Core",
      "Database: Supabase for auth & data",
      "Payments: Stripe integration via agent tools",
    ],
    diagram: "architecture",
  },
  {
    id: 9,
    title: "Building an AI Shopping Assistant",
    subtitle: "Hackathon Example: E-Commerce Agent",
    content: [
      "Natural language product search",
      "Personalized recommendations",
      "Cart management via conversation",
      "Stripe checkout integration",
    ],
    code: `// Shopping Agent with Stripe
const shoppingAgent = await generateText({
  model: "openai/gpt-4o",
  tools: {
    searchProducts: tool({
      description: "Search product catalog",
      parameters: z.object({ query: z.string() }),
      execute: async ({ query }) => 
        supabase.from('products').textSearch('name', query)
    }),
    addToCart: tool({
      description: "Add item to cart",
      parameters: z.object({ productId: z.string() }),
      execute: async ({ productId }) => addToCart(productId)
    }),
    checkout: tool({
      description: "Create Stripe checkout session",
      parameters: z.object({ cartId: z.string() }),
      execute: async ({ cartId }) => 
        stripe.checkout.sessions.create({...})
    })
  },
  maxSteps: 5, // Allow multi-step execution
  prompt: userMessage
})`,
    codeLanguage: "typescript",
  },
  {
    id: 10,
    title: "Streaming Chat UI",
    subtitle: "Real-Time User Experience",
    content: [
      "useChat hook handles all complexity",
      "Automatic message state management",
      "Built-in loading and error states",
      "Works with any AI Gateway model",
    ],
    code: `"use client"
import { useChat } from "@ai-sdk/react"

export function ChatInterface() {
  const { messages, input, handleSubmit, 
          handleInputChange, isLoading } = useChat()

  return (
    <div>
      {messages.map(m => (
        <div key={m.id} className={m.role}>
          {m.content}
        </div>
      ))}
      
      <form onSubmit={handleSubmit}>
        <input 
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
        />
        <button disabled={isLoading}>
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </form>
    </div>
  )
}`,
    codeLanguage: "tsx",
  },
  {
    id: 11,
    title: "Hackathon Tips",
    subtitle: "Win with AI + Vercel",
    content: [
      "Start with a working agent in 10 minutes using templates",
      "Use Supabase for instant auth and database",
      "Leverage AI Gateway for zero-config AI access",
      "Add Stripe for payment flows via agent tools",
      "Deploy instantly with Vercel - no DevOps needed",
    ],
    diagram: "hackathon",
  },
  {
    id: 12,
    title: "Quick Start Commands",
    subtitle: "Get Building Now",
    content: [
      "Everything you need to start your AI project",
    ],
    code: `# Create a new AI project
npx create-next-app@latest my-ai-app

# Install AI SDK
pnpm add ai @ai-sdk/react

# That's it! AI Gateway works automatically
# No API keys needed for: OpenAI, Anthropic, Google

# Add Supabase for database
# Add Stripe for payments
# Deploy with: vercel deploy`,
    codeLanguage: "bash",
  },
  {
    id: 13,
    title: "Resources",
    subtitle: "Learn More",
    content: [
      "AI SDK Docs: sdk.vercel.ai",
      "Vercel AI Gateway: vercel.com/ai",
      "Supabase: supabase.com",
      "Stripe: stripe.com/docs",
      "v0.dev: Build UI with AI",
    ],
    highlight: "Good luck at your hackathon!",
  },
]
