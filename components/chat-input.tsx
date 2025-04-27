"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ModelSelector } from "./model-selector";
import { ModelType } from "@/types/model-types";
import { toast } from "sonner";
// import { VoiceChat } from "./voice-chat";
import { ImageUpload } from "./upload-img";
import { useImageUpload } from "@/hooks/use-image-upload";
import { X } from "lucide-react";

type Message = {
  type: "text" | "image";
  content?: string;
  url?: string;
};
interface ChatInputProps {
  selectedModel: ModelType;
  onModelChange: (model: ModelType) => void;
  onSendMessage: ({
    type,
    content,
    message,
    url,
  }: {
    type: "text" | "image";
    content?: string;
    message?: string;
    url?: string;
  }) => void;
}

export const ChatInput = ({
  selectedModel,
  onModelChange,
  onSendMessage,
}: ChatInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const {
    preview,
    uploading,
    handleImageChange,
    clearPreview,
    handleImageUpload,
  } = useImageUpload();
  const handleInputToGroq = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploading) {
      toast("You can send after Image is uploaded");
      return;
    }

    if (preview) {

      // Image selected
      const uploadedUrl = await handleImageUpload(inputValue); // 👈 pass the prompt (inputValue)
      if (uploadedUrl) {
        onSendMessage({ type: "image", url: uploadedUrl });
        clearPreview();
        setInputValue(""); // Also clear inputValue after sending image

      const uploadedUrl = await handleImageUpload();
      console.log("Uploaded image URL:", uploadedUrl); // Debug log

      if (uploadedUrl) {
        console.log("Sending image prompt with URL:", uploadedUrl); // Debug log

        onSendMessage({
          type: "image",
          url: uploadedUrl,
          message: "Image prompt",
        });
        clearPreview(); // Clear the preview after sending

      } else {
        toast.error("Failed to upload image.");
      }
    } else if (inputValue.trim()) {

      // Text only
      onSendMessage({ type: "text", content: inputValue });
      setInputValue("");

      console.log("Sending text prompt:", inputValue); // Debug log

      onSendMessage({ type: "text", content: inputValue, message: inputValue });
      setInputValue(""); // Clear the input field after sending
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setImageUrl(null);
        clearPreview();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative flex gap-x-2 p-4 my-4 bg-muted rounded-lg">
      <ModelSelector selectedModel={selectedModel} onChange={onModelChange} />
      <div className="absolute -top-50 z-10 w-50 h-50">
        {preview && (
          <div className="relative w-50 h-50">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-md border border-gray-300"
            />
            <button
              onClick={() => {
                setImageUrl(null);
                clearPreview();
              }}
              className="absolute top-1 right-1 z-20 size-4 bg-white text-black rounded-full hover:bg-slate-200 hover:text-white transition"
            >
              <X className="size-4 " />
            </button>
          </div>
        )}
      </div>
      <Input
        className="bg-white shadow-2xs focus-visible:ring-0 focus:border-none"
        placeholder="Ask AI..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleInputToGroq(e);
          }
        }}
        disabled={uploading}
      />
      <div className="flex items-center justify-center space-x-2">
        {/* <VoiceChat
          onTranscription={(transcription) => setInputValue(transcription)}
        /> */}
        <ImageUpload
          preview={preview}
          uploading={uploading}
          handleImageChange={handleImageChange}
        />
      </div>
      <Button
        onClick={handleInputToGroq}
        className="hover:cursor-pointer"
        disabled={uploading || (!inputValue.trim() && !preview)}
      >
        Send
      </Button>
    </div>
  );
};
