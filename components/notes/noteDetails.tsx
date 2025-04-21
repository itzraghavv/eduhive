import { Maximize2, Download, UserPlus } from "lucide-react";
import Link from "next/link";
import { useNotesContext } from "@/context/NotesContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// import { DownloadAsPDF } from "./notesUi";
import PdfGenerator from "../downloadNote";

// For Markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";

const NoteDetails = ({
  previewEnabled,
  title,
  desc,
}: {
  previewEnabled: boolean;
  title: string;
  desc: string;
}) => {
  const { selectedNote } = useNotesContext();
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!selectedNote && !previewEnabled) {
    return (
      <div className="flex-1 flex w-full h-full max-w-3xl items-center justify-center text-muted-foreground ">
        No note selected.
      </div>
    );
  }

  // Update state when `previewEnabled`, `title`, `desc`, or `selectedNote` changes
  useEffect(() => {
    if (previewEnabled) {
      setName("Preview : " + title);
      setDescription(desc);
    } else if (selectedNote) {
      setName(selectedNote.title);
      setDescription(selectedNote.description);
    }
  }, [previewEnabled, title, desc, selectedNote]);

  useEffect(() => {
    if (!selectedNote) {
      // Redirect to the notes page if no note is selected
      router.push("/notes");
    }
  }, [selectedNote, router]);

  return (
    <div className="flex-1 flex flex-col w-full h-full max-w-3xl rounded-lg shadow-md p-6 overflow-y-auto">
      <div className="flex flex-row items-center justify-between mb-4">
        <div className="flex flex-col w-full">
          {previewEnabled ? (
            <span className="text-muted-foreground font-mono text-xs w-full flex items-center justify-center">
              Toggle-off the Live Preview button to preview your notes.
            </span>
          ) : null}
          <h2 className="text-3xl font-bold text-primary">{name}</h2>
        </div>
        {!previewEnabled ? (
          <div className="flex flex-row gap-4">
            {/* <UserPlus size={18} /> */}
            {/* <PdfGenerator /> */}
            <Link
              href={{
                pathname: `/notes/${selectedNote?.id}`,
              }}
              className=""
            >
              <Maximize2
                size={18}
                color={"oklch(62.3% 0.214 259.815)"}
                strokeWidth="3"
              />
            </Link>
          </div>
        ) : null}
      </div>
      <div
        className="prose prose-sm text-muted-foreground break-words text-justify mine-markdown"
        id="content-to-pdf"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeHighlight]}
        >
          {description}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default NoteDetails;
