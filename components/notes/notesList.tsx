import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface NoteItemProps {
  id: string;
  title: string;
  currentUserId: string | undefined;
  handleDeleteNote: (id: string, userId: string) => void;
}

interface NotesListProps {
  notes: { id: string; title: string }[];
  currentUserId: string | undefined;
  handleDeleteNote: (id: string, userId: string) => void;
}

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

const NoteItem: React.FC<NoteItemProps> = ({
  id,
  title,
  currentUserId,
  handleDeleteNote,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 shadow-2xs">
      <span className="text-sm font-medium text-primary truncate">{title}</span>
      <DeleteButton
        id={id}
        currentUserId={currentUserId}
        handleDeleteNote={handleDeleteNote}
      />
    </div>
  );
};

const NotesList: React.FC<NotesListProps> = ({
  notes,
  currentUserId,
  handleDeleteNote,
}) => {
  return (
    <div className="flex-1 flex-col overflow-y-auto mx-auto w-full max-w-3xl bg-white rounded-lg">
      <ScrollArea className="flex-1 flex-col w-full bg-muted rounded-lg mb-6 overflow-y-auto">
        {notes.map((note, index) => (
          <NoteItem
            key={index}
            id={note.id}
            title={note.title}
            currentUserId={currentUserId}
            handleDeleteNote={handleDeleteNote}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default NotesList;
