"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { useEffect, useRef, useState } from "react";

export const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    // const userMsg = { role: "user", content: input };
    // setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // setTimeout(() => {
    //   const aiMsg = {
    //     role: "ai",
    //     content: `You said: "${input}". Here's what I think...`,
    //   };
    //   setMessages((prev) => [...prev, aiMsg]);
    //   setLoading(false);
    // }, 1000);

    // try {
    //   // GET RESPONSE FROM GROQ
    //   const response = await fetch("/api/groq", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       messages: [
    //         {
    //           role: "user",
    //           content: input,
    //         },
    //       ],
    //       model: "llama-3.3-70b-versatile", // Specify the model
    //       temperature: 0.7, // Specify the temperature
    //       max_tokens: 1000, // Specify the maximum number of tokens
    //       top_p: 1, // Specify the top_p value
    //     }),
    //   });

    //   // Check if the response is OK (status code 200-299)
    //   if (!response.ok) {
    //     throw new Error("Failed to fetch data from the server");
    //   }

    //   const data = await response.json();
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     { role: "user", content: input },
    //     {
    //       role: "assistant",
    //       content: data.choices[0]?.message?.content || "",
    //     },
    //   ]);

    //   setInput(""); // Clear the input field after submission
    // } catch (err) {
    //   setError(
    //     err instanceof Error ? err.message : "An unknown error occurred"
    //   );
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-muted/60 rounded-lg p-4">
      <ScrollArea className="flex-1 px-4 py-2 space-y-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <Card
            key={i}
            className={`max-w-[80%] ${
              msg.role === "user" ? "ml-auto bg-primary text-white" : "mr-auto"
            }`}
          >
            <CardContent className="px-3 text-sm">{msg.content}</CardContent>
          </Card>
        ))}
        {loading && (
          <Card className="mr-auto opacity-70">
            <CardContent className="px-3 text-sm text-muted-foreground italic">
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
  );
};
