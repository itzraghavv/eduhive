import { Maximize2 } from "lucide-react";
import Link from "next/link";
import { useNotesContext } from "@/context/NotesContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
      setName(title);
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
    <div className="flex-1 flex flex-col w-full h-full max-w-3xl bg-white rounded-lg shadow-md p-6 overflow-y-auto">
      <div className="flex flex-row items-center justify-between mb-4">
        <div className="flex flex-col">
          {previewEnabled ? (
            <span className="text-muted-foreground">
              Toggle off Live Preview button in Save Note Form to preview your
              notes
            </span>
          ) : null}
          <h2 className="text-xl font-bold text-primary">{name}</h2>
        </div>
        {!previewEnabled ? (
          <Link
            href={{
              pathname: `/notes/${selectedNote?.id}`,
            }}
            className=""
          >
            <Maximize2 size={24} />
          </Link>
        ) : null}
      </div>
      <div className="prose prose-sm text-muted-foreground break-words text-justify mine-markdown">
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
