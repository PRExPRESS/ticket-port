/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpenAI } from "openai";
import {

  Runner,
  setDefaultOpenAIClient,

  AgentInputItem,
} from "@openai/agents";
import { systemPrompt } from "@/constants/agent.constant";
import { agentAnya } from "@/agents/openAI.agents";
import { text } from "stream/consumers";

class AgentOpenAIService {
  private messages: AgentInputItem[] = [];
  constructor() {
    
    this.messages.push({
      role: "system",
      type: "message",
      content: systemPrompt,
    });
  }

  async mainAgent(prompt: string, user: object): Promise<any> {
    this.messages.push({
      role: "system",
      type: "message",
      content: `user: ${JSON.stringify(user)}`,
    });
    this.messages.push({
      role: "user",
      content: prompt,
    });
    try {
      
        const runner = new Runner();
        const result = await runner.run(agentAnya(), this.messages); 
        
        this.messages = result.history;
        console.log("chat", this.messages);
        return result.finalOutput;
      
    } catch (error: unknown) {
      console.error("Error generating response:", error);
      throw error;
    }
  }
  
}

export default AgentOpenAIService;
