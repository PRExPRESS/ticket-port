"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AgentInputItem } from "@openai/agents";
import React, { useEffect, useRef } from "react";
import { Send, User, FileText, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Input from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Image from "next/image";
import { COMMAND_OPTIONS } from "@/constants/app.constants";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "github-markdown-css";
import rehypeRaw from "rehype-raw";
import MarkdownRenderer from "@/components/MarkdownRerender";
import { AnimatePresence, motion } from "framer-motion";
import DynamicForm from "@/components/DynamicForm";
import { createEventSchema } from "@/lib/form.schema";
import { createEventFields } from "@/constants/form.constants";

/* WhatsApp-style typing animation */

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: string;
  component?: OpenedComponent;
}

interface OpenedComponent {
  componentId: string;
  name: string;
}

const Agent: React.FC = () => {
  const [messages, setMessages] = React.useState<AgentInputItem[]>([]);
  const [chats, setChats] = React.useState<Message[]>([]);

  const [userPrompt, setUserPrompt] = React.useState<string>("");
  const [markdownContent, setMarkdownContent] = React.useState("");

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);
  const [openCommands, setOpenCommands] = React.useState(false);
  const [activeComponent, setActiveComponent] = React.useState<{ name: string; type?: string } | null>(null);
  const [isAgentTyping, setIsAgentTyping] = React.useState(false);
  const [organizerId, setOrganizerId] = React.useState("");

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chats]);

  // Add user info to messages when component mounts
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed?.uid) setOrganizerId(parsed.uid);
      } catch {}
    }
    if (
      user &&
      !messages.some(
        (msg) =>
          msg.type === "message" &&
          typeof msg.content === "string" &&
          msg.content.includes(`user: ${user}`)
      )
    ) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "system",
          type: "message",
          content: `user: ${user}`,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setOpenCommands(false);
      }
    };

    if (openCommands) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCommands]);

  const handleUserPromptChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserPrompt(event.target.value);
  };

  // handle commands
  const handleCommandSelect = async (command: string) => {
    setUserPrompt(command);
    setOpenCommands(false);
  };

  const sendMessage = async () => {
    if (!userPrompt.trim()) return;
    if (userPrompt.startsWith("/")) {
      // If the user prompt starts with a command, handle it
      await executeCommand(userPrompt);
      setUserPrompt("");
      return;
    }
    // Add user prompt to messages
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "user",
        type: "message",
        content: userPrompt,
      },
    ]);

    // Add user prompt to chats
    setChats((prevChats) => [
      ...prevChats,
      {
        id: uuidv4(),
        content: userPrompt,
        sender: "user",
        timestamp: new Date().toLocaleString(),
      },
    ]);

    setIsAgentTyping(true); // Start typing animation

    try {
      // Wait for the state to update before making the API call
      const updatedMessages = [
        ...messages,
        {
          role: "user",
          type: "message",
          content: userPrompt,
        },
      ];
      setUserPrompt(""); // Clear input after sending
      const result = await axios.post(
        "/api/agent",
        {
          prompt: updatedMessages,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setIsAgentTyping(false); // Stop typing animation

      if (result.status !== 200) {
        throw new Error("Failed to get response from agent");
      }

      const responseData = result.data.response;

      // Add agent response to messages
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          status: "completed",
          type: "message",
          content: [
            {
              type: "output_text",
              text:
                responseData.message ||
                responseData ||
                "No response from agent",
            },
          ],
        },
      ]);

      // Add agent response to chats
      setChats((prevChats) => [
        ...prevChats,
        {
          id: uuidv4(),
          content:
            responseData.message || responseData || "No response from agent",
          sender: "agent",
          timestamp: new Date().toLocaleString(),
          component: responseData.component && responseData.component !== "null"
            ? {
                componentId: uuidv4().slice(0, 8),
                name: responseData.component,
              }
            : undefined,
        },
      ]);
      console.log("chat", result);

      if (!responseData.component) {
        setActiveComponent(null);
        return;
      }
      if (
        responseData.component === "markdown" &&
        responseData.componentType === "table"
      ) {
        setMarkdownContent(responseData.message || "");
        setActiveComponent({ name: "markdown", type: "table" });
        return;
      }

      switch (responseData.component) {
        case "event-form":
          setActiveComponent({ name: "event-form" });
          break;
        default:
          setActiveComponent(null);
          break;
      }
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  ///
  const executeCommand = async (command: string) => {
    switch (command) {
      case "/help":
        break;
      case "/create_event":
        setActiveComponent({ name: "event-form" });
        break;
      case "/manage_tickets":
        break;
      case "/view_analytics":
        break;
      case "/settings":
        break;
      default:
        console.warn("Unknown command:", command);
    }
  };

  return (
    <>
      <div className="flex flex-row items-start justify-center gap-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <motion.div
          animate={{ width: activeComponent ? "32rem" : "100%" }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
          className={cn(
            "h-full bg-white shadow-xl rounded-2xl  flex flex-col",
            activeComponent ? "w-[32rem]" : "max-w-2xl w-full",
            ""
          )}
          style={{ minWidth: 0 }}
        >
          <Card className="h-[90vh] flex flex-col overflow-hidden ">
            <CardHeader className="border-b bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <div className="flex items-center gap-2">
                <Image
                  src="/imgs/anya.png"
                  alt="bot"
                  width={50}
                  height={50}
                  className="h-[50px] w-[50px] mt-1  rounded-full"
                  style={{ width: "50px", height: "50px" }}
                />
                <h1 className="text-2xl font-bold">AI Agent - Anya</h1>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 h-[400px] flex flex-col">
              <ScrollArea
                className="flex-1  overflow-y-auto p-4"
                ref={scrollAreaRef}
              >
                <div className="space-y-4">
                  {chats.map((message) => {
                    
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.sender === "user"
                            ? "justify-end"
                            : "justify-start",
                          "animate-in fade-in duration-300"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[70%] rounded-lg p-3 text-sm",
                            message.sender === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-800",
                            "shadow-sm"
                          )}
                        >
                          <div className="flex items-start gap-2">
                            {message.sender === "agent" && (
                              <Image
                                src="/imgs/anya.png"
                                alt="bot"
                                width={16}
                                height={16}
                                className="h-4 w-4 mt-1 flex-shrink-0 rounded-full"
                                style={{ width: "30px", height: "30px" }}
                              />
                            )}
                            {message.sender === "user" && (
                              <User className="h-4 w-4 mt-1 flex-shrink-0" />
                            )}
                            <div>
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}
                                  rehypePlugins={[rehypeHighlight, rehypeRaw]}
                                >
                                  {message.content}
                                </ReactMarkdown>
                              {/* If agent message has a component, always show open button and hide content */}
                              {message.component?.name && (
                                <button
                                  className="flex items-center gap-1 text-blue-600 hover:underline mt-1"
                                  onClick={() => {
                                    setActiveComponent({ name: message?.component?.name ?? "", type: message?.component?.name ?? "" });
                                  }}
                                  type="button"
                                >
                                  <FileText className="w-5 h-5 mr-1" />
                                  <span>Open Component Preview</span>
                                </button>
                              )}
                              <span className="text-xs opacity-50 mt-1 block">
                                {message.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* Typing animation bubble */}
                  {isAgentTyping && (
                    <div className="flex justify-start animate-in fade-in duration-300">
                      <div className="max-w-[70%] rounded-lg p-3 text-sm bg-white text-gray-800 shadow-sm flex items-center gap-2">
                        <Image
                          src="/imgs/anya.png"
                          alt="bot"
                          width={16}
                          height={16}
                          className="h-4 w-4 mt-1 flex-shrink-0 rounded-full"
                          style={{ width: "30px", height: "30px" }}
                        />
                        <div className="flex items-center h-5">
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                          <span className="typing-dot" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {openCommands && (
                  <div
                    className="absolute bottom-0 left-0 px-4 "
                    ref={commandRef}
                  >
                    <Card className="rounded-t-2xl rounded-b-none bg-background">
                      <CardHeader className="bg-gray-100 rounded-t-2xl border-b py-2">
                        Commands
                      </CardHeader>
                      <CardContent className="p-4 bg-background">
                        <ul className="font-ibmPlexMono">
                          {COMMAND_OPTIONS.map((command) => (
                            <li
                              key={command.id}
                              className="cursor-pointer hover:bg-gray-200 p-2 rounded-md flex items-center justify-between gap-4"
                              onClick={(e) => {
                                handleCommandSelect(command.value);
                                e.stopPropagation();
                              }}
                            >
                              <span>{command.label}</span>
                              <span className="text-xs text-gray-500 ml-2">
                                {command.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t p-4 bg-gray-50 ">
              <form className="flex w-full gap-2 flex-row justify-between items-center">
                <Button
                  type="button"
                  className="rounded-2xk bg-gray-200 hover:bg-gray-300 text-gray-700"
                  onClick={() => setOpenCommands((prev) => !prev)}
                >
                  /
                </Button>
                <Input
                  value={userPrompt}
                  onChange={handleUserPromptChange}
                  placeholder="Type your message... or use '/' to select a tool"
                  className="flex-1 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  type="submit"
                  className="rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={!userPrompt.trim()}
                  onClick={sendMessage}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </motion.div>
        <AnimatePresence>
          {activeComponent?.name === "markdown" && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              className="h-[600px] bg-white shadow-xl rounded-2xl overflow-hidden flex-1 relative ml-2"
              style={{ minWidth: 0 }}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <h1 className="text-2xl font-bold">Component Preview</h1>
                <button
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => setActiveComponent(null)}
                  type="button"
                >
                  <X className="w-6 h-6" />
                </button>
              </CardHeader>
              <CardContent className="p-4 h-full overflow-y-auto">
                <MarkdownRenderer content={markdownContent} />
              </CardContent>
            </motion.div>
          )}
          {activeComponent?.name === "event-form" && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              className="h-full bg-white shadow-xl rounded-2xl  flex-1 relative ml-2"
              style={{ minWidth: 0 }}
            >
              <Card className="h-[90vh] flex flex-col overflow-hidden ">
                <CardHeader className="flex flex-row items-center justify-between">
                  <h1 className="text-2xl font-bold">Create Event</h1>
                  <button
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    onClick={() => setActiveComponent(null)}
                    type="button"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </CardHeader>
                <CardContent className="p-4 h-full overflow-y-auto">
                  <ScrollArea
                    className="flex-1  overflow-y-auto p-4"
                    ref={scrollAreaRef}
                  >
                    <DynamicForm
                      schema={createEventSchema}
                      fields={createEventFields}
                      defaultValues={{ organizerId }}
                      endpoint="/api/events"
                      method="POST"
                      onSuccess={() => setActiveComponent(null)}
                    />
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Agent;
