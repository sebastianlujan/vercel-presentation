import {
  convertToModelMessages,
  streamText,
  UIMessage,
  stepCountIs,
} from "ai"
import { agentTools } from "@/lib/agent/tools"

export const maxDuration = 30

const systemPrompt = `You are a helpful customer support AI agent for a software company. You have access to tools to help users.

Your capabilities:
1. Search the knowledge base to answer questions
2. Look up the user's ticket history
3. Create new support tickets for complex issues
4. Check system status for any service issues

Guidelines:
- Always be helpful, concise, and professional
- Use the knowledge base first before creating tickets
- Only create tickets for issues that need human intervention
- If you find relevant articles, summarize the key points
- Be proactive in offering help

When greeting users, briefly introduce yourself and ask how you can help.`

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
