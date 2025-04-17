"use client";

import { Mic, MicOff } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export const VoiceChat = () => {
  const [recording, setRecording] = useState(false);

  const handleClick = () => {
    setRecording(!recording);
  };

  return (
    <div className="flex items-center justify-center">
      <Button className="hover:cursor-pointer" onClick={() => handleClick()}>
        {recording ? <MicOff className="size-5" /> : <Mic className="size-5" />}
      </Button>
    </div>
  );
};
