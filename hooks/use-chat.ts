import { useState } from "react";
import axios from "axios";
import { ModelType } from "@/types/model-types";

export function useChat(initialModel: ModelType = "llama3-8b-8192") {
  const [selectedModel, setSelectedModel] = useState<ModelType>(initialModel);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message: string) => {
    const updatedMessages = [
      ...messages,
      { role: "user" as const, content: message },
    ];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      console.log("rheheai");
      const res = await axios.post("/api/chat", {
        messages: updatedMessages,
        model: selectedModel,
      });

      console.log("reached", res);

      setMessages([
        ...updatedMessages,
        { role: "assistant", content: res.data.content },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Try again.",
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
