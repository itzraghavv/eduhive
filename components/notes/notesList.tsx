import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");

  // Filter notes based on the search query
  const filteredNotes = searchQuery.trim()
    ? notes.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : notes;

  return (
    <div className="flex-1 flex-col overflow-y-auto mx-auto w-full max-w-3xl bg-white rounded-lg">
      {/* notes search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search notes by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg  focus-visible:ring-0 focus:border-2"
        />
      </div>

      {/* <TextArea
        className="bg-white shadow-2xs focus-visible:ring-0 focus:border-2 rounded-md w-full mb-4"
        placeholder="Enter the title of your note..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            descInputRef.current?.focus();
          }
        }}
      /> */}

      {/* notes list */}
      <ScrollArea className="flex-1 flex-col w-full bg-muted rounded-lg mb-6 overflow-y-auto">
        {/* {notes.map((note, index) => (
          <NoteItem
            key={index}
            id={note.id}
            title={note.title}
            currentUserId={currentUserId}
            handleDeleteNote={handleDeleteNote}
          />
        ))} */}
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              title={note.title}
              currentUserId={currentUserId}
              handleDeleteNote={handleDeleteNote}
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
