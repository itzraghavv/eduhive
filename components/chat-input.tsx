"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ModelSelector } from "./model-selector";
import { ModelType } from "@/types/model-types";
import { VoiceChat } from "./voice-chat";
import { ImageUpload } from "./upload-img";
import { useImageUpload } from "@/hooks/use-image-upload";

type Message = {
  role: "user";
  type: "text" | "image";
  content?: string;
  url?: string;
};
interface ChatInputProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
  onSendMessage: (message: Message) => void;
}

export const ChatInput = ({
  selectedModel,
  onModelChange,
  onSendMessage,
}: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { preview, uploading, handleImageChange } = useImageUpload();
  console.log(preview, uploading);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (imageUrl) {
      onSendMessage({
        role: "user",
        type: "image",
        url: preview ?? undefined,
        content: inputValue,
      });
      setImageUrl(null);
    } else if (inputValue.trim()) {
      onSendMessage({
        role: "user",
        type: "text",
        content: inputValue,
        url: undefined,
      });
      setInputValue("");
    }
  };

  return (
    <div className="relative flex gap-x-2 p-4 my-4 bg-muted rounded-lg">
      <ModelSelector selectedModel={selectedModel} onChange={onModelChange} />
      <div className="absolute -top-20 z-10 w-32 h-32">
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-28 z-10 object-cover rounded-md border border-gray-300"
          />
        )}
      </div>
      <Input
        className="bg-white shadow-2xs focus-visible:ring-0 focus:border-none"
        placeholder="Ask AI..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter" && !e.shiftKey) {
        //     e.preventDefault();
        //     handleSubmit(e);
        //   }
        // }}
      />
      <div className="flex items-center justify-center space-x-2">
        {/* <VoiceChat
          onTranscription={(transcription) => setInputValue(transcription)}
        /> */}
        {/* <ImageUpload
          preview={preview}
          uploading={uploading}
          handleImageChange={handleImageChange}
        /> */}
      </div>
      <Button onClick={handleSubmit} className="hover:cursor-pointer">
        Send
      </Button>
    </div>
  );
};
