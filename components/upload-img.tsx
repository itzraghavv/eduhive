"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ImagePlus, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ImageUpload = () => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Button
                asChild
                className="bg-blue-500 hover:bg-blue-600 rounded-full p-3 text-white"
                disabled={uploading}
              >
                <div className="flex items-center justify-center">
                  {uploading ? (
                    <Loader2 className="animate-spin size-5" />
                  ) : (
                    <ImagePlus className="size-5" />
                  )}
                </div>
              </Button>
            </label>
          </TooltipTrigger>
          <TooltipContent>Upload image</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
