"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNotesContext } from "@/context/NotesContext";

import { ToolBar } from "@/components/notes/notesUi";

// For Markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import { ScrollArea } from "@/components/ui/scroll-area";

const NoteDetailsPage = () => {
  const { selectedNote } = useNotesContext();
  const router = useRouter();

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

  return (
    <div className=" flex flex-col flex-1 p-4 border rounded-md shadow-md bg-white items-center content-center m-6 ">
      <ToolBar />
      <ScrollArea className="text-gray-700 mine-markdown max-w-[80%]">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeHighlight]}
        >
          {selectedNote.description}
        </ReactMarkdown>
      </ScrollArea>
    </div>
  );
};

export default NoteDetailsPage;
