import { agentAnya, ticketPortAgent } from "@/lib/openAI.agents";
import { Runner } from "@openai/agents";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import pino from "pino";

// Logger for performance monitoring
const logger = pino({ level: "info" });

// Retry logic for OpenAI API calls
async function callWithRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.code === "rate_limit_exceeded" && attempt < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 1000));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
}

export async function POST(request: Request) {
  const start = Date.now();
  logger.info({ event: "request_start" });

  try {
    const { prompt } = (await request.json()) as { prompt: string };
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const runner = new Runner();
    const stream = new Readable({
      read() {},
    });

    // Stream partial responses with retry logic
    callWithRetry(() =>
      runner.run(agentAnya, prompt, {
        maxTurns: 20,
        onUpdate: (update: any) => {
          stream.push(JSON.stringify(update) + "\n");
        },
      } as { maxTurns: number; onUpdate: (update: any) => void })
    )
      .then((response: { finalOutput: any; history: any[] }) => {
        const fullResponse = response;
        stream.push(
          JSON.stringify({ response: response.finalOutput, history: response.history, fullResponse })
        );
        stream.push(null);
        logger.info({ event: "request_end", duration: Date.now() - start });
      })
      .catch((error: Error) => {
        logger.error({ event: "request_error", error: error.message });
        stream.push(JSON.stringify({ error: error.message }));
        stream.push(null);
      });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error: unknown) {
    logger.error({
      error: error instanceof Error ? error instanceof Error ? error.message : "unknown error" : "Unknown error",
    });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}