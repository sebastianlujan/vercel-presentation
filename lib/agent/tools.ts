"use server"

import { tool } from "ai"
import { z } from "zod"

// Mock knowledge base data for the demo
const knowledgeBase = [
  {
    id: "1",
    title: "Password Reset Guide",
    content: "To reset your password, go to Settings > Security > Reset Password. You'll receive an email with a reset link.",
    category: "account"
  },
  {
    id: "2", 
    title: "Billing FAQ",
    content: "We accept all major credit cards. Billing occurs on the 1st of each month. You can view invoices in Settings > Billing.",
    category: "billing"
  },
  {
    id: "3",
    title: "API Rate Limits",
    content: "Free tier: 100 requests/minute. Pro tier: 1000 requests/minute. Enterprise: unlimited. Rate limit headers are included in responses.",
    category: "api"
  },
  {
    id: "4",
    title: "Getting Started",
    content: "Welcome! Start by creating your first project. Click 'New Project' and follow the wizard. Need help? Chat with our AI assistant.",
    category: "onboarding"
  },
  {
    id: "5",
    title: "Team Management",
    content: "Invite team members via Settings > Team > Invite. Roles: Admin (full access), Member (read/write), Viewer (read only).",
    category: "team"
  }
]

// Mock ticket data for the demo
const tickets = [
  { id: "T-001", title: "Cannot login", status: "open", priority: "high", created_at: "2024-01-15" },
  { id: "T-002", title: "Billing question", status: "closed", priority: "medium", created_at: "2024-01-10" },
  { id: "T-003", title: "API integration help", status: "open", priority: "low", created_at: "2024-01-18" },
]

// Tool: Search knowledge base
export const searchKnowledge = tool({
  description: "Search the knowledge base for relevant articles to answer user questions",
  inputSchema: z.object({
    query: z.string().describe("The search query"),
    category: z.string().optional().describe("Filter by category: account, billing, api, onboarding, team")
  }),
  execute: async ({ query, category }) => {
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let results = knowledgeBase.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.content.toLowerCase().includes(query.toLowerCase())
    )
    
    if (category) {
      results = results.filter(article => article.category === category)
    }
    
    return results.slice(0, 3)
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
    await new Promise(resolve => setTimeout(resolve, 300))
    
    let results = [...tickets]
    
    if (status && status !== "all") {
      results = results.filter(ticket => ticket.status === status)
    }
    
    return results.slice(0, limit)
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
    await new Promise(resolve => setTimeout(resolve, 400))
    
    const newTicket = {
      id: `T-${String(tickets.length + 1).padStart(3, '0')}`,
      title,
      description,
      priority,
      status: "open",
      created_at: new Date().toISOString().split('T')[0]
    }
    
    return {
      success: true,
      ticket: newTicket,
      message: `Ticket ${newTicket.id} created successfully. A support agent will respond within 24 hours.`
    }
  }
})

// Tool: Check system status
export const checkSystemStatus = tool({
  description: "Check the current system status and any ongoing incidents",
  inputSchema: z.object({}),
  execute: async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    
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
