"use client";

import Image from "next/image";
import { useState } from "react";
// import { TextInput}

// const api = process.env.GROQ_API_KEY;

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hello, I am Groq. How can I assist you today? Please enter your query.",
    },
  ]);

  // print inpput query to console after saving it in inputText
  const handleSubmit = async ({ input }: { input: string }) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: inputText, // Use the input from the user
            },
          ],
          model: "llama-3.3-70b-versatile", // Specify the model
          temperature: 0.7, // Specify the temperature
          max_tokens: 1000, // Specify the maximum number of tokens
          top_p: 1, // Specify the top_p value
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const data = await response.json();
      setOutputText(data.choices[0]?.message?.content || "No response");
      // messages.push({
      //   role: "user",
      //   content: input,
      // });
      // messages.push({
      //   role: "assistant",
      //   content: data.choices[0]?.message?.content || "No response",
      // });
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: inputText },
        { role: "assistant", content: data.choices[0]?.message?.content || "" },
      ]);

      setInputText(""); // Clear the input field after submission
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-center justify-between w-full"></header>
      <main className="flex flex-col items-center justify-center w-full">
        {/* output from ai chat */}
        <div className="bg-gray-100 p-4 rounded-lg w-full max-w-md mt-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`text-gray-500 p-2 rounded-lg ${
                  message.role === "user"
                    ? "rounded-bl-none"
                    : "rounded-br-none"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {/* output from ai chat */}
          {loading ? (
            <p className="text-black">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : null}
        </div>
        <div className="flex flex-row items-center justify-center w-full mt-4 gap-2">
          <input
            type="text"
            placeholder="Type something..."
            className="border border-gray-300 rounded-full w-full max-w-md my-4 p-3"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit({ input: inputText });
              }
            }}
          />

          {/* button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full font-black text-2xl "
            onClick={() => handleSubmit({ input: inputText })}
          >
            {">"}
          </button>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
