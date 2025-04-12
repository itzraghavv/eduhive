"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

export const ChatBox = () => {
  return (
    <ScrollArea className="flex-1 px-4 py-2 space-y-3 overflow-y-auto">
      <Card>
        <CardContent className="px-3 text-sm">User message</CardContent>
      </Card>
      <Card className="mr-auto opacity-70">
        <CardContent className="px-3 text-sm text-muted-foreground italic">
          AI is typing...
        </CardContent>
      </Card>
    </ScrollArea>
  );
};
