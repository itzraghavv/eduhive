"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";

// FONT STYLE / MARKDOWN IMPORTS
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
interface ChatBoxProps {
  messages: { role: "user" | "ai" | "assistant"; content: string }[];
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
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeHighlight]}
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
      <div ref={endRef} className="h-0" />
    </ScrollArea>
  );
};
