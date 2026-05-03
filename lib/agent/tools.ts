import { tool } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

// Tool: Search knowledge base
export const searchKnowledge = tool({
  description: "Search the knowledge base for relevant articles to answer user questions",
  inputSchema: z.object({
    query: z.string().describe("The search query"),
    category: z.string().optional().describe("Filter by category: account, billing, api, onboarding, team")
  }),
  execute: async ({ query, category }) => {
    const supabase = await createClient()

    let queryBuilder = supabase
      .from("knowledge_base")
      .select("id, title, content, category")
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .limit(3)

    if (category) {
      queryBuilder = queryBuilder.eq("category", category)
    }

    const { data, error } = await queryBuilder

    if (error) {
      console.error("[v0] searchKnowledge error:", error.message)
      return []
    }

    return data ?? []
  }
})

// Tool: Get user's ticket history
export const getTicketHistory = tool({
  description: "Get the user's support ticket history",
  inputSchema: z.object({
    status: z.enum(["open", "closed", "all"]).optional().describe("Filter by ticket status"),
    limit: z.number().optional().describe("Maximum number of tickets to return")
  }),
  execute: async ({ status, limit = 10 }) => {
    const supabase = await createClient()

    let queryBuilder = supabase
      .from("tickets")
      .select("id, title, status, priority, created_at")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (status && status !== "all") {
      queryBuilder = queryBuilder.eq("status", status)
    }

    const { data, error } = await queryBuilder

    if (error) {
      console.error("[v0] getTicketHistory error:", error.message)
      return []
    }

    return data ?? []
  }
})

// Tool: Create a new support ticket
export const createTicket = tool({
  description: "Create a new support ticket for issues that need human assistance",
  inputSchema: z.object({
    title: z.string().describe("Brief title describing the issue"),
    description: z.string().describe("Detailed description of the problem"),
    priority: z.enum(["low", "medium", "high", "urgent"]).describe("Ticket priority level")
  }),
  execute: async ({ title, description, priority }) => {
    const supabase = await createClient()

    // Generate a ticket ID based on current count
    const { count } = await supabase
      .from("tickets")
      .select("*", { count: "exact", head: true })

    const ticketId = `T-${String((count ?? 0) + 1).padStart(3, "0")}`

    const { data, error } = await supabase
      .from("tickets")
      .insert({
        id: ticketId,
        title,
        description,
        priority,
        status: "open",
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] createTicket error:", error.message)
      return {
        success: false,
        message: "Failed to create ticket. Please try again."
      }
    }

    return {
      success: true,
      ticket: data,
      message: `Ticket ${ticketId} created successfully. A support agent will respond within 24 hours.`
    }
  }
})

// Tool: Check system status
export const checkSystemStatus = tool({
  description: "Check the current system status and any ongoing incidents",
  inputSchema: z.object({}),
  execute: async () => {
    return {
      status: "operational",
      services: {
        api: { status: "operational", latency: "45ms" },
        database: { status: "operational", latency: "12ms" },
        auth: { status: "operational", latency: "23ms" },
        storage: { status: "degraded", latency: "150ms", message: "Slight delays in file uploads" }
      },
      lastUpdated: new Date().toISOString()
    }
  }
})

// Export all tools
export const agentTools = {
  searchKnowledge,
  getTicketHistory,
  createTicket,
  checkSystemStatus
}
