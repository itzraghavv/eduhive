"use client";

import { ChatBox } from "@/components/chat-box";
import { ChatInput } from "@/components/chat-input";
import { useState } from "react";
import { ModelType } from "@/types/model-types";

export default function ChatPage() {
  const [selectedModel, setSelectedModel] =
    useState<ModelType>("llama3-8b-8192");
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: message }],
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI");
      }

      const data = await response.json();

      setMessages((prev) => [...prev, { role: "ai", content: data.content }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto px-4 py-6">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Chat with AI</h1>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto bg-muted rounded-lg">
          <ChatBox messages={messages} loading={loading} />
        </div>
        <div className="p-4">
          <ChatInput
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}
