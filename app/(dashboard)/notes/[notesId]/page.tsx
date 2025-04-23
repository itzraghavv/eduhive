"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { useNotesContext } from "@/context/NotesContext";
import {
  handleRephrase,
  handleDictionary,
} from "@/components/notes/ai-operations";

import { Quote, BookA, WandSparkles } from "lucide-react";

import { ToolBar } from "@/components/notes/notesUi";
import { Button } from "@/components/ui/button";

// For Markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TextArea } from "@/components/ui/input";

const NoteDetailsPage = () => {
  const { selectedNote } = useNotesContext();
  const router = useRouter();
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);
  const [desc, setDesc] = useState("");
  const [userSelection, setUserSelection] = useState("");

  useEffect(() => {
    if (!selectedNote) {
      try {
        router.replace("/notes");
      } catch (e) {
        toast.error("Error going back automatically!");
      }
    } else {
      setDesc(selectedNote.description);
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
        console.log("Selection is : \n\n" + selection.toString().trim());
        setUserSelection(selection.toString().trim());
        setMenuPosition({ x: rect.left + rect.width / 2, y: rect.top - 10 });
      } else {
        setMenuPosition(null);
      }
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setDesc(selectedNote.description);
    toast("Editing");
  };

  const handleUpdateNote = () => {
    console.log("Update");
    setEditing(false);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);

  return (
    <div className=" flex flex-col flex-1 p-4 border rounded-md shadow-md items-center content-center m-6 min-h-0 h-full">
      <ToolBar
        editing={editing}
        setEditing={setEditing}
        handleEdit={handleEdit}
        handleUpdateNote={handleUpdateNote}
      />
      <div className="flex items-center justify-center w-[80%] overflow-y-auto">
        <ScrollArea
          className="text-gray-700 mine-markdown w-[80%] p-4 overflow-y-auto max-h-[80vh]"
          ref={descriptionRef}
        >
          {editing ? (
            <>
              <TextArea
                // ref={descInputRef}
                className="flex-1 h-[90vh] z-20  bg-white shadow-2xs focus-visible:ring-0 focus:border-2 rounded-md w-full mb-4 overflow-y-auto max-h-full mine-markdown"
                placeholder="Enter the details of your note..."
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                  const target = e.target as HTMLTextAreaElement;
                  // target.style.height = "auto";
                  // target.style.height = `${target.scrollHeight}px`;
                  // target.style.maxHeight = "50";
                }}
              />
              <Button onClick={() => console.log(desc)} />
            </>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeHighlight]}
            >
              {selectedNote.description}
            </ReactMarkdown>
          )}
        </ScrollArea>
      </div>

      {menuPosition && (
        <div
          className="absolute z-50 bg-white shadow-md border rounded-md p-2 flex gap-2"
          style={{
            top: menuPosition.y,
            left: menuPosition.x,
            transform: "translate(-50%, -100%)",
          }}
        >
          <Button
            className="rounded hover:bg-gray-300"
            onClick={() =>
              handleRephrase({
                selectedContent: userSelection,
                noteContent: selectedNote.description,
              })
            }
          >
            <WandSparkles color={"red"} />
            <span className="text-white font-mono text-xs tracking-wider font-light">
              AI Rephrase
            </span>
          </Button>
          <Button
            className="rounded hover:bg-gray-300 bg-blue-500"
            onClick={() => {
              handleDictionary({
                selectedContent: userSelection,
                noteContent: selectedNote.description,
              });
            }}
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
