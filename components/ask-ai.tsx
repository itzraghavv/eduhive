"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from "lucide-react";

type Message = {
  role: "user" | "ai";
  content: string;
};

export function ChatBox() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const aiMsg = {
        role: "ai",
        content: `You said: "${input}". Here's what I think...`,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating toggle button */}
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat box container */}
      <div
        className={`
          fixed bottom-24 right-6 w-[360px] max-h-[500px] bg-background border rounded-2xl shadow-xl flex flex-col z-40 transition-all duration-300
          ${
            open
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          }
        `}
      >
        <div className="p-4 border-b font-semibold">AI Chat Assistant</div>

        <ScrollArea className="flex-1 px-4 py-2 space-y-3 overflow-y-auto">
          {messages.map((msg, i) => (
            <Card
              key={i}
              className={`max-w-[80%] ${
                msg.role === "user"
                  ? "ml-auto bg-primary text-white"
                  : "mr-auto"
              }`}
            >
              <CardContent className="p-3 text-sm">{msg.content}</CardContent>
            </Card>
          ))}
          {loading && (
            <Card className="mr-auto opacity-70">
              <CardContent className="p-3 text-sm text-muted-foreground italic">
                AI is typing...
              </CardContent>
            </Card>
          )}
          <div ref={endRef} />
        </ScrollArea>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="p-4 flex gap-2 border-t"
        >
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            Send
          </Button>
        </form>
      </div>
    </>
  );
}
