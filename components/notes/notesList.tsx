import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useNotesContext } from "@/context/NotesContext";
import { toast } from "sonner";

interface DeleteButtonProps {
  id: string;
  currentUserId: string | undefined;
  handleDeleteNote: (id: string, userId: string) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  currentUserId,
  handleDeleteNote,
}) => {
  return (
    <Button
      onClick={() => {
        if (currentUserId) {
          handleDeleteNote(id, currentUserId);
          console.log("ran fetch notes");
        } else {
          alert("User ID is undefined");
        }
      }}
    >
      <Trash2 />
    </Button>
  );
};

interface NoteItemProps {
  id: string;
  title: string;
  currentUserId: string | undefined;
  handleDeleteNote: (id: string, userId: string) => void;
  onClick: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({
  id,
  title,
  currentUserId,
  handleDeleteNote,
  onClick,
}) => {
  return (
    <div
      className="flex items-center justify-between px-1 py-2 border-b border-gray-200 shadow-2xs cursor-pointer hover:bg-gray-200 rounded-lg"
      onClick={onClick}
    >
      <span className="text-sm font-medium text-primary truncate">{title}</span>
      <DeleteButton
        id={id}
        currentUserId={currentUserId}
        handleDeleteNote={handleDeleteNote}
      />
    </div>
  );
};

interface NotesListProps {
  notes: { id: string; title: string; description: string }[];
  currentUserId: string | undefined;
  handleDeleteNote: (id: string, userId: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({
  notes,
  currentUserId,
  handleDeleteNote,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { setSelectedNote } = useNotesContext();

  // Filter notes based on the search query
  const filteredNotes = searchQuery.trim()
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : notes;

  return (
    <div className="lg:flex-1 h-90 flex-col overflow-y-auto mx-auto w-full max-w-3xl bg-white rounded-lg">
      {/* notes search bar */}
      <div className="mb-4 sticky top-0 z-10 rounded-lg">
        <input
          type="text"
          placeholder="Search notes by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-2 md:px-4 py-2 bg-white border border-gray-300 rounded-lg focus-visible:ring-0 focus:border-2"
        />
      </div>

      {/* notes list */}
      <ScrollArea className="flex-1 flex-col w-full bg-muted rounded-lg mb-6 overflow-y-auto px-2 ">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              title={note.title}
              currentUserId={currentUserId}
              handleDeleteNote={handleDeleteNote}
              onClick={() => {
                setSelectedNote(note);
                toast("Context Updated");
              }}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground">
            No notes found matching "{searchQuery}".
          </p>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotesList;
