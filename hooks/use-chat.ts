import { useState } from "react";
import axios from "axios";
import { ModelType } from "@/types/model-types";
import { toast } from "sonner";

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

export const sendNoteQuery = async ({
  selectedContent,
  noteContent,
  rephrase,
}: {
  selectedContent: string;
  noteContent: string;
  rephrase: boolean;
}) => {
  var ai_response = "";
  toast.success("sending message to groq model : llama3-8b-8192");
  const messages = [
    {
      role: "system",
      type: "text",
      content: noteContent,
    },
    {
      role: "user",
      type: "text",
      content:
        selectedContent +
        ` This is a piece of content of above note...which i want to ${
          rephrase
            ? "rephrase. So please regenerate text that means same."
            : "understand. So please explain this content to me with definition, 2 example, application, pros-cons etc."
        }`,
    },
  ];
  try {
    toast("Message Sent");
    const res = await axios.post("/api/chat", {
      messages: messages,
      model: "llama3-8b-8192",
    });

    ai_response = res?.data?.content;
  } catch (e) {
    console.log("error is :", e);
    toast.error("Error sending magic query to groq");
  } finally {
    toast("Task Over");
  }

  return ai_response;
};
