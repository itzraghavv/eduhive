import { Maximize2 } from "lucide-react";
import Link from "next/link";
import { useNotesContext } from "@/context/NotesContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// For Markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";

const NoteDetails = () => {
  const { selectedNote } = useNotesContext();
  const router = useRouter();

  if (!selectedNote) {
    return <p>No note selected.</p>;
  }

  useEffect(() => {
    if (!selectedNote) {
      // Redirect to the notes page if no note is selected
      router.push("/notes");
    }
  }, [selectedNote, router]);

  return (
    <div className="flex-1 flex flex-col w-full h-full max-w-3xl bg-white rounded-lg shadow-md p-6 overflow-y-auto">
      <div className="flex flex-row items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary">
          {selectedNote?.title}
        </h2>
        <Link
          href={{
            pathname: `/notes/${selectedNote.id}`,
          }}
          className=""
        >
          <Maximize2 size={24} />
        </Link>
      </div>
      <div className="prose prose-sm text-muted-foreground break-words text-justify mine-markdown">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeHighlight]}
        >
          {selectedNote.description}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default NoteDetails;
