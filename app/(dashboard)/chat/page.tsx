"use client";

import { ChatBox } from "@/components/chat-box";
import { ChatInput } from "@/components/chat-input";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ChatPage() {
  const { messages, loading, selectedModel, setSelectedModel, sendMessage } =
    useChat();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex flex-col h-screen max-w-2xl mx-auto px-4 py-6 items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <Loader2 className="animate-spin" />
        <p className="text-muted-foreground">
          Please wait while we load your chat.
        </p>
        <div className="loader mt-4"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex flex-col h-screen max-w-2xl mx-auto px-4 py-6 items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Please login to continue</h1>
        <p className="text-muted-foreground">
          You need to be logged in to access this page.
        </p>
        <Button className="mt-4">
          <Link href="/signin">Sign In</Link>
        </Button>
      </div>
    );
  }

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
            onSendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}
