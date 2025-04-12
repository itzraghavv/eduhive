"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./chat-input";

export const ChatBox = () => {
  const [messages, setMessages] = useState<
    {
      role: "user" | "assistant";
      content: string;
    }[]
  >([
    {
      role: "user",
      content: "Hello, how are you?",
    },
  ]);

  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ScrollArea className="flex-1 px-4 py-2 space-y-3 overflow-y-auto h-full">
      {/* <Card>
        <CardContent className="px-3 text-sm">User message</CardContent>
      </Card>
      <Card className="mr-auto opacity-70">
        <CardContent className="px-3 text-sm text-muted-foreground italic">
          AI is typing...
        </CardContent>
      </Card> */}

      {messages.map((message, index) => (
        <Card
          key={index}
          className={message.role === "user" ? "" : "mr-auto opacity-70"}
        >
          <CardContent className="px-3 text-sm">
            {message.role === "user" ? message.content : "AI is typing..."}
          </CardContent>
        </Card>
      ))}

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-4">
        <ChatInput />
      </div>
    </ScrollArea>
  );
};
