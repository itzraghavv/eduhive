"use client";

import { useEffect } from "react";
import { Mic, MicOff } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { useVoiceToGroq } from "@/hooks/use-voice";

type VoiceChatProps = {
  onTranscription: (text: string) => void;
};

export const VoiceChat = ({ onTranscription }: VoiceChatProps) => {
  const { recording, response, loading, startRecording, stopRecording } =
    useVoiceToGroq();

  const handleClick = () => {
    recording ? stopRecording() : startRecording();
  };

  useEffect(() => {
    if (response) {
      onTranscription(response);
    }
  }, [response]);

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative">
              {recording && (
                <span className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-75 z-0" />
              )}
              <Button
                onClick={handleClick}
                className={`relative z-10 rounded-md p-4  flex items-center justify-center transition-all duration-300 ${
                  recording
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {recording ? (
                  <MicOff className="text-white size-6" />
                ) : (
                  <Mic className="text-white size-6" />
                )}
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {recording ? "Stop recording" : "Start recording"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* {recording && (
        <span className="text-sm text-red-500 animate-pulse">Listening…</span>
      )} */}
    </div>
  );
};
