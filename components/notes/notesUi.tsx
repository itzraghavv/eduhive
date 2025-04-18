import { Edit, Minimize2, Trash2 } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

// For Markdown
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";

const NotesPageHeader = () => {
  return (
    <section className="w-full max-w-3xl text-center mb-4">
      <h1 className="text-3xl font-extrabold text-primary mb-2">Notes Page</h1>
      <p className="text-muted-foreground">
        Create, view, and manage your notes with ease.
      </p>
    </section>
  );
};

const NotesPageLoading = () => {
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto px-4 py-4 items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-2">Loading...</h1>
      <Loader2 className="animate-spin" />
      <p className="text-muted-foreground">
        Please wait while we load your notes.
      </p>
      <div className="loader mt-4"></div>
    </div>
  );
};

const NotesLoading = () => {
  return (
    <div className="flex-1 flex items-center content-center">
      <Loader2 className="animate-spin" />

      <p className="text-muted-foreground w-full max-w-3xl">
        Retrieving Your Data...
      </p>
    </div>
  );
};

import { useRouter } from "next/navigation";
import { useNotesContext } from "@/context/NotesContext";
import { useDB } from "@/hooks/use-db";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const ToolBar = () => {
  const router = useRouter();
  const { selectedNote, setSelectedNote } = useNotesContext();
  const { handleDeleteNote, fetchNotes } = useDB();
  const { data: session, status } = useSession();
  const currentUserId = session?.user?.id;

  const handleDelete = async () => {
    if (!selectedNote) {
      toast.error("No note selected to delete.");
      return;
    }

    if (!currentUserId) {
      toast.error("No User ID is being captured.");
      return;
    }

    try {
      await handleDeleteNote(selectedNote.id, currentUserId); // Delete the note
      toast.success("Note deleted successfully.");
      setSelectedNote(null); // Clear the selected note from context
      fetchNotes(currentUserId); // Refresh the notes list
      router.back(); // Navigate back to the notes page
    } catch (error) {
      toast.error("Failed to delete the note. Please try again.");
    }
  };

  return (
    <div className="w-[80%] flex justify-between content-center">
      <h2 className="text-xl font-bold text-primary">{selectedNote?.title}</h2>
      <div className="flex flex-row gap-2">
        <Button>
          <Edit />
        </Button>
        <Button onClick={handleDelete}>
          <Trash2 />
        </Button>
        <Button
          onClick={() => {
            router.back();
          }}
        >
          <Minimize2 />
        </Button>
      </div>
    </div>
  );
};

// const Preview = ({ children }: { children: string }) => {
//   return (
//     <div className="flex-1 w-full mine-markdown">
//       <ReactMarkdown
//         remarkPlugins={[remarkGfm, remarkBreaks]}
//         rehypePlugins={[rehypeHighlight]}
//       >
//         {children}
//       </ReactMarkdown>
//     </div>
//   );
// };

export { NotesPageHeader, NotesPageLoading, NotesLoading, ToolBar };

{
  /*
  import { toast } from 'react-hot-toast';
import { useRef } from 'react';

function useDeleteWithUndo() {
  // Keep a ref to the timeout ID so we can cancel it.
  const timeoutRef = useRef(null);

  const deleteWithUndo = (noteId) => {
    // 1) Show a toast that never auto‑dismisses (duration: Infinity)
    const toastId = toast.loading('Deleting note...', {
      duration: Infinity,
      // 2) Add an Undo button
      action: {
        label: 'Undo',
        // If clicked, clear the timer and dismiss the toast
        onClick: () => {
          clearTimeout(timeoutRef.current);
          toast.dismiss(toastId);
          toast('Deletion canceled');
        }
      }
    });

    // 3) Start a 3-second timer to actually delete
    timeoutRef.current = setTimeout(() => {
      // TODO: call your delete function here, e.g.
      // deleteNote(noteId);

      // 4) Clean up the toast:
      toast.dismiss(toastId);
      toast.success('Note deleted');
    }, 3000);
  };

  return deleteWithUndo;
}
 const deleteWithUndo = useDeleteWithUndo();
  
  */
}
