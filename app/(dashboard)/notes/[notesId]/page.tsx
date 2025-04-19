"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { useNotesContext } from "@/context/NotesContext";

import { Quote, BookA, WandSparkles } from "lucide-react";

import { ToolBar } from "@/components/notes/notesUi";
import { Button } from "@/components/ui/button";

// For Markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import { ScrollArea } from "@/components/ui/scroll-area";

const NoteDetailsPage = () => {
  const { selectedNote } = useNotesContext();
  const router = useRouter();
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedNote) {
      try {
        router.replace("/notes");
      } catch (e) {
        toast.error("Error going back automatically!");
      }
    }
  }, [selectedNote, router]);

  if (!selectedNote) {
    return null; // Prevent rendering anything while redirecting
  }

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // Check if the selection is within the description container
      if (
        descriptionRef.current &&
        descriptionRef.current.contains(selection.anchorNode as Node) &&
        selection.toString().trim()
      ) {
        setMenuPosition({ x: rect.left + rect.width / 2, y: rect.top - 10 });
      } else {
        setMenuPosition(null);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);

  return (
    <div className=" flex flex-col flex-1 p-4 border rounded-md shadow-md items-center content-center m-6 min-h-0 h-full">
      <ToolBar />
      <div className="flex items-center justify-center">
        <ScrollArea
          className="text-gray-700 mine-markdown max-w-[80%] p-4 prose"
          ref={descriptionRef}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeHighlight]}
          >
            {selectedNote.description}
          </ReactMarkdown>
        </ScrollArea>
      </div>

      {menuPosition && (
        <div
          className="absolute bg-white shadow-md border rounded-md p-2  flex gap-2"
          style={{
            top: menuPosition.y,
            left: menuPosition.x,
            transform: "translate(-50%, -100%)",
          }}
        >
          <Button
            className="rounded hover:bg-gray-300"
            onClick={() => toast("Bold action triggered!")}
          >
            <WandSparkles color={"red"} />
            <span className="text-white font-mono text-xs tracking-wider font-light">
              AI Rephrase
            </span>
          </Button>
          <Button
            className="rounded hover:bg-gray-300 bg-blue-500"
            onClick={() => toast("Italic action triggered!")}
          >
            <BookA color={"white"} />
            <span className="text-white font-mono text-xs tracking-wider font-light">
              AI Dictionary
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NoteDetailsPage;
