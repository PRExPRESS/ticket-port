/* eslint-disable @typescript-eslint/no-explicit-any */

import { AGENT_INSTRUCTIONS } from "@/enum/agent.enum";
import { Agent, handoff, setDefaultOpenAIClient,  } from "@openai/agents";
import z from "@openai/zod";
import OpenAI from "openai";
import { checkRoleBaseAccess, createEventTool, getAllEventsTool } from "./agent.functionCalls";

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || "",
});
setDefaultOpenAIClient(client);



const mainResponseSchema = z.object({
  message: z.string(),
  component: z.string().nullable().optional(),
  componentType: z.string().nullable().optional(),
});

/**==================================================Agents===================================== */

/// agent Anya


export const agentAnya = new Agent({
  name: "anya",
  instructions: AGENT_INSTRUCTIONS.anya,
  model: "gpt-4o-mini",
  tools: [checkRoleBaseAccess,getAllEventsTool,createEventTool],
  outputType: mainResponseSchema,
});

