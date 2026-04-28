import {
  convertToModelMessages,
  streamText,
  UIMessage,
  stepCountIs,
} from "ai"
import { agentTools } from "@/lib/agent/tools"

export const maxDuration = 30

const systemPrompt = `You are a helpful customer support AI agent for a software company.

IMPORTANT: You MUST always call a tool before responding. Never answer from memory alone.

Rules:
1. For ANY question about the product, features, account, billing, API, or team → call searchKnowledge FIRST with 1-3 relevant keywords (e.g. "password", "billing", "api", "team").
2. For ticket or history requests → call getTicketHistory.
3. For service issues or "is it working?" → call checkSystemStatus.
4. Only call createTicket when the user explicitly asks to open a ticket.
5. After calling a tool, summarize the result clearly and concisely.
6. If searchKnowledge returns no results, tell the user and offer to create a ticket.

Keep responses short, professional, and helpful.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    tools: agentTools,
    stopWhen: stepCountIs(5),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse()
}
