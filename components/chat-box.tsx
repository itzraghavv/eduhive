"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";

type Message = {
  role: "user" | "ai" | "assistant";
  content: string;
  type?: "text" | "image";
  url?: string;
};
interface ChatBoxProps {
  messages: Message[];
  loading: boolean;
}

export const ChatBox = ({ messages, loading }: ChatBoxProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 px-4 py-2 space-y-3 overflow-y-auto scroll-pb-4">
      {messages.map((message, index) => (
        <Card
          key={index}
          className={`max-w-[80%] break-words ${
            message.role === "user"
              ? "ml-auto bg-primary text-primary-foreground my-2 rounded-br-sm"
              : "mr-auto rounded-bl-sm"
          }`}
        >
          <CardContent className="px-3 text-sm mine-markdown">
            {message.type === "image" && message.url ? (
              <img
                src={message.url}
                alt="Uploaded content"
                className="rounded-lg max-w-xs"
              />
            ) : (
              // <ReactMarkdown
              //   remarkPlugins={[remarkGfm, remarkBreaks]}
              //   rehypePlugins={[rehypeHighlight]}
              // >
              message.content || ""
            )}
          </CardContent>
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
      <div ref={endRef} className="h-0" />
    </ScrollArea>
  );
};

export const ChatLoading = () => {
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
};
