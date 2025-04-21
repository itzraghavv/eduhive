import { useState } from "react";
import axios from "axios";
import { ModelType } from "@/types/model-types";

export function useChat(initialModel: ModelType = "llama3-8b-8192") {
  const [selectedModel, setSelectedModel] = useState<ModelType>(initialModel);
  const [messages, setMessages] = useState<
    {
      role: "user" | "ai";
      type: "text" | "image";
      content: string;
      url: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (
    type: "text" | "image",
    content: string,
    url: string
  ) => {
    console.log("Sending", {
      messages: messages,
      model: selectedModel,
    });
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        type: type ? "text" : "image",
        content: content,
        url: url,
      },
    ]);
    setLoading(true);
    const updatedMessages = [
      ...messages,
      {
        role: "user",
        type,
        content,
        url,
      },
    ];
    console.log("Sending This", updatedMessages);

    try {
      const res = await axios.post("/api/chat", {
        messages: updatedMessages,
        model: selectedModel,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          type: "text",
          content: res?.data?.content,
          url: "",
        },
      ]);
    } catch (err) {
      console.error("Chat error:", err);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          type: "text",
          content: "Sorry, Something went wrong. Try Again.",
          url: "",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    loading,
    selectedModel,
    setSelectedModel,
    sendMessage,
  };
}
