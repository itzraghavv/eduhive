import { useState } from "react";
import axios from "axios";
import { ModelType } from "@/types/model-types";
import { toast } from "sonner";

const useChat = ({
  initialModel = "llama3-8b-8192",
}: // type,
// url,
// content,
{
  initialModel: ModelType;
  // type: string;
  // url: string;
  // content: string;
}) => {
  const [selectedModel, setSelectedModel] = useState<ModelType>(initialModel);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async ({ type, content, url }: Message) => {
    const userMessage =
      type === "text" ? content ?? "" : "Here is the image to analyze."; // or any prompt you want

    if (!userMessage.trim()) {
      toast.error("Message is empty.");
      return;
    }

    const updatedMessages = [
      ...messages,
      { role: "user" as const, content: userMessage },
    ];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", {
        messages: updatedMessages,
        model:
          type === "image"
            ? "meta-llama/llama-4-scout-17b-16e-instruct"
            : selectedModel,
        file_urls: type === "image" && url ? [url] : undefined, // 🔥 ADD THIS!
      });

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
};

const sendNoteQuery = async ({
  selectedContent,
  noteContent,
  rephrase,
}: {
  selectedContent: string;
  noteContent: string;
  rephrase: boolean;
}) => {
  let ai_response = "";

  //  This is a piece of content of above note...which i want to...
  const promptsRephrasing = `rephrase. So please regenerate text that means same.
  TRY TO MAINTAIN SAME WORD LIMIT AS OF SELECTED NOTE PORTION BUT REPHRASE IT WITH VARIATION.`;
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
            ? "rephrase. So please regenerate text that means same. TRY TO MAINTAIN SAME WORD LIMIT AS OF SELECTED NOTE PORTION BUT REPHRASE IT WITH VARIATION."
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
    return ai_response;
  } catch (e) {
    toast.error("Error sending magic query to groq");
  } finally {
    toast("Task Over");
  }

  return ai_response;
};

export { useChat, sendNoteQuery };
