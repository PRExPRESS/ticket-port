import {
  GoogleGenAI,
  Content,
  CallableTool,
  Type,
  FunctionCallingConfigMode,
} from "@google/genai";

class AgentService {
  private genAI: GoogleGenAI;

  constructor() {
    this.genAI = new GoogleGenAI({
      apiKey: process.env.NEXT_PUBLIC_GENAI_KEY || "",
    });
  }

  //   async generateResponse(prompt: string): Promise<string> {
  //     try {
  //       const response = await this.genAI.chats.create({
  //         model: "gemini-1.5-flash",
  //         messages: [{ role: "user", content: prompt }],
  //       });
  //       return response.choices[0].message.content;
  //     } catch (error) {
  //       console.error("Error generating response:", error);
  //       throw error;
  //     }
  //   }

  async generateContent(prompt: string): Promise<string> {
    try {
      const createUserFn = {
        name: "createUser",
        description: "Create a new user",
        parameters: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: "The name of the user to create",
            },
            email: {
              type: Type.STRING,
              description: "The email of the user to create",
            },
          },
          required: ["name", "email"],
        },
      };

      const createUserTool: CallableTool = {
        tool: async () => ({ functionDeclarations: [createUserFn] }),
        callTool: async (functionCalls) => {
          const call = functionCalls[0]; // there’s only one
          const { name, email } = call.args as { name: string; email: string };
          const result = this.createUser(name, email);
          return [
            {
              functionResponse: {
                name: createUserFn.name,
                response: result,
              },
            },
          ];
        },
      };

      const contents: Content[] = [
        { role: "assistant", parts: [{ text: "You are a helpful assistant." }] },
        { role: "user",   parts: [{ text: prompt }] }
      ];

      const response = await this.genAI.models.generateContent({
        model: "gemini-1.5-flash",
        contents: contents,
        config: {
          tools: [createUserTool],
          toolConfig: {
            functionCallingConfig: { mode: FunctionCallingConfigMode.AUTO },
          },
        },
      });
      console.log("Response from GenAI:", response);
      return response.text || "No content generated";
    } catch (error) {
      console.error("Error generating content:", error);
      throw error;
    }
  }
  private createUser(
    name: string,
    email: string
  ): {
    message: string;
    status: number;
    data?: { name: string; email: string };
  } {
    return {
      message: "User created successfully",
      status: 201,
      data: { name, email },
    };
  }
}

export default AgentService;
