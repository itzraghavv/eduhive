"use client";

import { ChatBox, ChatLoading } from "@/components/chat-box";
import { ChatInput } from "@/components/chat-input";
import { useChat } from "@/hooks/use-chat";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { NoResponse } from "@/components/auth";

export default function ChatPage() {
  const { messages, loading, selectedModel, setSelectedModel, sendMessage } =
    useChat();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <ChatLoading />;
  }

  if (!session) {
    return <NoResponse />;
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-4 py-6">
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
            onSendMessage={({ type, content, url }) =>
              sendMessage(type, content || "", url || "")
            }
          />
        </div>
      </div>
    </div>
  );
}
