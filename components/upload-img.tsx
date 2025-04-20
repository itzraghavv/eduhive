"use client";

import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface ImageUploadProps {
  preview?: string | null;
  uploading?: boolean;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageUpload = ({
  preview,
  uploading,
  handleImageChange,
}: ImageUploadProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <Button
                asChild
                className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer rounded-full p-3 text-white"
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
