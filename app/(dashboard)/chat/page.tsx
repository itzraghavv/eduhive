"use client";

import { ChatBox } from "@/components/chat-box";
import { ChatInput } from "@/components/chat-input";
import { useChat } from "@/hooks/use-chat";

export default function ChatPage() {
  const { messages, loading, selectedModel, setSelectedModel, sendMessage } =
    useChat();

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
