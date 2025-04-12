"use client";

import Image from "next/image";
import { useState } from "react";
import { main } from "@/components/groq";
// import { TextInput}

// const api = process.env.GROQ_API_KEY;

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // print inpput query to console after saving it in inputText
  const handleSubmit = async () => {
    console.log(inputText);
    console.log(main);
    // console.log(api);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-center justify-between w-full"></header>
      <main>
        <input
          type="text"
          placeholder="Type something..."
          className="border border-gray-300 rounded-lg p-2 w-full max-w-md"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          // disabled={loading}
          // autoFocus
          // autoComplete="off"
          // autoCorrect="off"
          // spellCheck="false"
          // autoCapitalize="none"
          // autoSave="off"
          // inputMode="text"
        />

        {/* button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Click Me
        </button>

        {/* output from ai chat */}
        <div className="bg-gray-100 p-4 rounded-lg w-full max-w-md mt-4"></div>
      </main>
      <footer></footer>
    </div>
  );
}
