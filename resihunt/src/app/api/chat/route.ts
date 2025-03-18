import { StreamingTextResponse } from "ai"
import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Use streamText from the AI SDK
    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      messages: [
        {
          role: "system",
          content: `You are ResiHunt's AI real estate investment assistant. Your expertise includes:

          1. Real Estate Market Analysis
          - Rental yields and cap rates
          - Property appreciation trends
          - Market timing and cycles
          - Neighborhood analysis

          2. Investment Strategy
          - ROI calculations
          - Cash flow analysis
          - Risk assessment
          - Portfolio diversification

          3. Property Types
          - Single-family homes
          - Multi-family units
          - Commercial properties
          - Mixed-use developments

          When providing information:
          - Use specific numbers and percentages when discussing market trends
          - Break down complex concepts into simple explanations
          - Provide practical examples when relevant
          - Be transparent about any limitations in current market data
          - Suggest follow-up questions when appropriate

          Maintain a professional yet conversational tone, and focus on providing actionable insights for real estate investors.`,
        },
        ...messages,
      ],
    })

    // Return the streaming response
    return new StreamingTextResponse(result.stream)
  } catch (error) {
    console.error("Chat API error:", error)
    // Return a more detailed error response
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An unexpected error occurred",
        details: error instanceof Error ? error.stack : undefined,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
  }
}

