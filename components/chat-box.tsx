"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";

interface ChatBoxProps {
  messages: { role: "user" | "ai"; content: string }[];
  loading: boolean;
}

export const ChatBox = ({ messages, loading }: ChatBoxProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 px-4 py-2 space-y-3 overflow-y-auto">
      {messages.map((message, index) => (
        <Card
          key={index}
          className={`max-w-[80%] ${
            message.role === "user"
              ? "ml-auto bg-primary text-primary-foreground"
              : "mr-auto"
          }`}
        >
          <CardContent className="px-3 text-sm">{message.content}</CardContent>
        </Card>
      ))}
      <br />
      {loading && (
        <Card className="mr-auto opacity-70 py-2">
          <CardContent className="px-3 text-sm text-muted-foreground italic">
            AI is typing...
          </CardContent>
        </Card>
      )}
      <div ref={endRef} />
    </ScrollArea>
  );
};
