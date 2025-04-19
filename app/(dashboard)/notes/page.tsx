"use client";

import { useEffect, useState, useRef } from "react";
import { useDB } from "@/hooks/use-db";
import { toast } from "sonner";
// import "sonner/dist/sonner.css";

import { useNotesContext } from "@/context/NotesContext";

import { useSession } from "next-auth/react";
import { NoResponse } from "@/components/auth";

import {
  NotesPageHeader,
  NotesPageLoading,
  NotesLoading,
  Archieve,
} from "@/components/notes/notesUi";
import NotesForm from "@/components/notes/noteSaveForm";
import NotesList from "@/components/notes/notesList";
import NoteDetails from "@/components/notes/noteDetails";

import Modal from "@/components/notes/Archieve";

// Extend the Session type to include the user id
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
    };
  }
}

const NotesPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [previewEnabled, setPreviewEnabled] = useState(false);

  const {
    notes,
    loading,
    fetchLoading,
    error,
    handleSaveNote,
    fetchNotes,
    handleDeleteNote,
  } = useDB();

  const { data: session, status } = useSession();
  const currentUserId = session?.user?.id;

  const { selectedNote, setSelectedNote } = useNotesContext();

  // for enter key press moving
  const descInputRef = useRef<HTMLTextAreaElement>(null);

  const saveNote = async () => {
    if (!currentUserId) {
      toast.error("No User has been found", {
        description: "User Credentials are absent...",
      });
      return;
    }
    if (!title || !desc) {
      toast.error("Enter data in Input Fields first...", {
        description: "Form is empty",
      });
      return;
    }

    await handleSaveNote({
      title: title.trim(),
      description: desc.trim(),
      userId: currentUserId,
    });

    // Reset the height of the description textarea
    if (descInputRef.current) {
      descInputRef.current.style.height = "auto";
    }

    fetchNotes(currentUserId);

    setTitle("");
    setDesc("");
  };

  const previewToggle = () => {
    setPreviewEnabled((prev) => !prev);
    toast.success("Toggled state");
  };

  // Delete Note function
  const deleteNote_RefreshNote = async (id: string, userId: string) => {
    if (userId) {
      await handleDeleteNote(id, userId);
      await fetchNotes(userId);
    } else {
      // alert("User ID is undefined");
      toast.error("User Credentials can't be read...");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleArchieveOpen = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleArchieveClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  useEffect(() => {
    if (currentUserId) {
      fetchNotes(currentUserId);
    }
  }, [currentUserId]);

  if (status === "loading") {
    return <NotesPageLoading />;
  }

  if (!session) {
    return <NoResponse />;
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row items-center justify-around px-4 py-6 min-h-0 lg:h-screen h-full ">
      <div className="flex-1 flex flex-col items-center justify-center content-center px-2 py-6 min-h-0 lg:h-full h-80 max-w-3xl">
        {/* Headings */}
        <NotesPageHeader />

        {/* Notes Creating Form */}
        <NotesForm
          title={title}
          desc={desc}
          setTitle={setTitle}
          setDesc={setDesc}
          saveNote={saveNote}
          loading={loading}
          error={error}
          descInputRef={descInputRef}
          previewToggle={previewToggle}
        />

        {/* <Preview children={desc} /> */}

        {fetchLoading ? (
          <NotesLoading />
        ) : (
          <NotesList
            notes={notes}
            currentUserId={currentUserId}
            handleDeleteNote={deleteNote_RefreshNote}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col-reverse w-full max-w-3xl h-full gap-4 px-2">
        {/* <NotesDescription/> */}
        {selectedNote || previewEnabled ? (
          <NoteDetails
            previewEnabled={previewEnabled}
            title={title}
            desc={desc}
          />
        ) : (
          <div className="flex-1 flex w-full h-full max-w-3xl items-center justify-center text-muted-foreground ">
            Select a note to view its details.
          </div>
        )}

        <hr className="w-[30%] mx-auto border-2 border-black rounded-full" />

        <Archieve handleArchieveOpen={handleArchieveOpen} />
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleArchieveClose}>
          <h2 className="text-xl font-bold mb-4">Archived Notes</h2>
          <ul className="list-disc pl-5">
            {notes.map((note) => (
              <li key={note.id} className="mb-2">
                {note.title}
              </li>
            ))}
          </ul>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4"
            onClick={handleArchieveClose}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default NotesPage;
