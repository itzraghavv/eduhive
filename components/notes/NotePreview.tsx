import { Maximize2, Download, UserPlus } from "lucide-react";
import Link from "next/link";
import { useNotesContext } from "@/context/NotesContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// import { DownloadAsPDF } from "./notesUi";
// import PdfGenerator from "../downloadNote";

// For Markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import {
  Live_Preview_Heading,
  No_Note_Selected_To_Preview,
} from "@/constants/NoContentHandler";

const PreviewToolbar = ({ goto }: { goto: string | undefined }) => {
  return (
    <div className="flex flex-row gap-4">
      {/* <UserPlus size={18} /> */}
      {/* <PdfGenerator /> */}
      <Link href={`/notes/${goto}`}>
        <Maximize2 size={18} color="#2b7fff" strokeWidth="3" />
      </Link>
    </div>
  );
};

const FormattedContent = ({ description }: { description: string }) => {
  return (
    <div className="prose prose-sm text-muted-foreground break-words text-justify mine-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeHighlight]}
      >
        {description}
      </ReactMarkdown>
    </div>
  );
};

export const NotePreview = ({
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
    return <>{No_Note_Selected_To_Preview}</>;
  }

  // FOR LIVE PREVIEW UPDATES N SELECTED NOTE LISTENING
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

  // FOR REFRESHING PAGE BACK AFTER RELLOAD ON [NOTE_ID].PAGE.TSX
  useEffect(() => {
    if (!selectedNote) {
      router.push("/notes");
    }
  }, [selectedNote, router]);

  return (
    <div className="flex-1 flex flex-col w-full h-full max-w-3xl rounded-lg shadow-md p-6 pt-0 overflow-y-auto">
      {/* PREVIEW HEADER TOOLBAR*/}
      <div className="sticky top-0 bg-white flex flex-row items-center justify-between mb-4">
        <div className="flex flex-col w-full">
          {previewEnabled ? <Live_Preview_Heading /> : null}
          <h2 className="text-3xl font-bold text-primary">{name}</h2>
        </div>
        {previewEnabled ? null : <PreviewToolbar goto={selectedNote?.id} />}
      </div>

      {/* PREVIEW CONTENT */}
      <FormattedContent description={description} />
    </div>
  );
};
