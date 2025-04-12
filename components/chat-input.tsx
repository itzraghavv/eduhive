"use client";

import { useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ModelSelector } from "./model-selector";

export const ChatInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    const inputVal = inputRef.current?.value;
    console.log(inputVal);
  };

  return (
    <div className="flex gap-x-2 p-4 my-4 bg-muted rounded-lg">
      <ModelSelector />
      <Input
        className="bg-white shadow-2xs focus-visible:ring-0 focus:border-none"
        placeholder="Ask AI..."
        onChange={() => {}}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
        ref={inputRef}
      />
      <Button onClick={handleClick} className="hover:cursor-pointer">
        Send
      </Button>
    </div>
  );
};
