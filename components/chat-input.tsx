"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ModelSelector } from "./model-selector";
import { ModelType } from "@/types/model-types";
import { VoiceChat } from "./voice-chat";

interface ChatInputProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({
  selectedModel,
  onModelChange,
  onSendMessage,
}: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleTranscription = (transcription: string) => {
    setInputValue(transcription);
  };

  return (
    <div className="flex gap-x-2 p-4 my-4 bg-muted rounded-lg">
      <ModelSelector selectedModel={selectedModel} onChange={onModelChange} />
      <Input
        className="bg-white shadow-2xs focus-visible:ring-0 focus:border-none"
        placeholder="Ask AI..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <div className="flex items-center justify-center">
        <VoiceChat onTranscription={handleTranscription} />
      </div>
      <Button onClick={handleSubmit} className="hover:cursor-pointer">
        Send
      </Button>
    </div>
  );
};
