"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown
// import rehypeHighlight from "rehype-highlight"; // Syntax highlighting
// import "highlight.js/styles/github.css";

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
              ? "ml-auto bg-primary text-primary-foreground my-2 rounded-br-sm"
              : "mr-auto rounded-bl-sm"
          }`}
        >
          <CardContent className="px-3 text-sm">
            <ReactMarkdown
            // remarkPlugins={[remarkGfm]}
            // rehypePlugins={[rehypeHighlight]}
            >
              {message.content}
            </ReactMarkdown>
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
      <div ref={endRef} />
    </ScrollArea>
  );
};
