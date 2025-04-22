import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2, Search, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNotesContext } from "@/context/NotesContext";
import { toast } from "sonner";
import { Input, TextArea } from "../ui/input";

interface DeleteButtonProps {
  id: string;
  currentUserId: string | undefined;
  handleDeleteNote: ({ userId, id }: { userId: string; id: string }) => void;
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
          handleDeleteNote({ id: id, userId: currentUserId });
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
  handleDeleteNote: ({ userId, id }: { userId: string; id: string }) => void;
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
      <span className="text-sm font-medium text-[#333] truncate">{title}</span>
      <DeleteButton
        id={id}
        currentUserId={currentUserId}
        handleDeleteNote={handleDeleteNote}
      />
    </div>
  );
};

const BulletStrip = ({
  setOrderBy,
}: {
  setOrderBy: (order: string) => void;
}) => {
  const bullets = ["starred", "title", "createdAt", "updatedAt"];

  return (
    <div className="flex flex-row p-2 rounded-none justify-start gap-4 bg-white">
      {bullets.map((bullet, index) => (
        <div
          key={index}
          className="text-xs font-mono text-black cursor-pointer px-4 py-1 bg-[#00000010] rounded-full transition-all duration-250 hover:bg-[#0000] border-2 border-[#0000] hover:border-[#00000010]"
          onClick={() => {
            toast(`Clicked: ${bullet}`);

            setOrderBy(bullet);
          }}
        >
          {bullet}
        </div>
      ))}
    </div>
  );
};
interface NotesListProps {
  notes: {
    id: string;
    title: string;
    description: string;
    isArchived: boolean;
    isStarred: boolean;
  }[];
  currentUserId: string | undefined;
  handleDeleteNote: ({ userId, id }: { userId: string; id: string }) => void;
}

const NotesList: React.FC<NotesListProps> = ({
  notes,
  currentUserId,
  handleDeleteNote,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const { setSelectedNote } = useNotesContext();

  // Filter notes based on the search query
  const filteredNotes = searchQuery.trim()
    ? notes
        .filter((note) => !note.isArchived)
        .filter((note) =>
          note.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
        )
    : notes.filter((note) => !note.isArchived);

  return (
    <div className="lg:flex-1 flex-col overflow-y-auto mx-auto w-full max-w-3xl bg-white rounded-lg h-80 lg:h-full">
      {/* Search Header */}
      <div className="mb-0 sticky top-0 z-10 rounded-none">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search notes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-2 md:px-4 py-2 bg-white border-2 border-blue-500 rounded-lg focus-visible:ring-0 focus:border-2 cursor-text placeholder:text-blue-500 placeholder:font-mono"
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-text"
            size={20}
            color={"oklch(62.3% 0.214 259.815)"}
          />
        </div>

        {/* Notes Sorting Strip */}
        <BulletStrip setOrderBy={setOrderBy} />
      </div>

      {/* notes list */}
      <ScrollArea className="flex-1 flex-col w-full bg-white rounded-lg mb-2 overflow-y-auto px-6 ">
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
                // toast("Context Updated");
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
