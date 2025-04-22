"use client";

import { useEffect, useState, useRef, RefObject } from "react";
import { useDB } from "@/hooks/use-db";
import { toast } from "sonner";

import { useNotesContext } from "@/context/NotesContext";

import { useSession } from "next-auth/react";
import { NoResponse } from "@/components/auth";

import {
  NotesPageHeader,
  NotesLoading,
  Archieve,
} from "@/components/notes/notesUi";
import NotesForm from "@/components/notes/NoteSaveForm";
import NotesList from "@/components/notes/notesList";
import { NotePreview } from "@/components/notes/NotePreview";
import { NotesPageLoading } from "@/constants/NoContentHandler";

import { X, ArchiveRestore } from "lucide-react";

// import Modal from "@/components/notes/Archieve";

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

  const { notes, loading, fetchLoading, error, fetchNotes, handleDeleteNote } =
    useDB();

  const { data: session, status } = useSession();
  const currentUserId = session?.user?.id;

  const { selectedNote } = useNotesContext();

  // for enter key press moving
  const descInputRef = useRef<HTMLTextAreaElement>(null);

  const saveNote = async ({
    currentUserId,
    title,
    desc,
    handleSaveNote,
    descInputRef,
    fetchNotes,
  }: {
    currentUserId: string;
    title: string;
    desc: string;
    handleSaveNote: (params: {
      title: string;
      description: string;
      userId: string;
    }) => Promise<void>;
    descInputRef: RefObject<HTMLTextAreaElement | null>;
    fetchNotes: (params: { userId: string }) => Promise<void>;
  }) => {
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

    fetchNotes({ userId: currentUserId });

    setTitle("");
    setDesc("");
  };

  const previewToggle = () => {
    setPreviewEnabled((prev) => !prev);
    toast.success("Toggled state");
  };

  // Delete Note function
  const deleteNote_RefreshNote = async ({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }) => {
    if (userId) {
      await handleDeleteNote({ noteId: id, userId: userId });
      await fetchNotes({ userId: userId });
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
      fetchNotes({ userId: currentUserId });
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
          userId={currentUserId || ""}
        />

        <hr className="w-[30%] mx-auto mb-4 border-2 border-black rounded-full" />

        {fetchLoading ? (
          <NotesLoading />
        ) : (
          <NotesList
            notes={notes}
            currentUserId={currentUserId}
            handleDeleteNote={deleteNote_RefreshNote} //TODO
          />
        )}
      </div>

      <div className="flex flex-1 flex-col-reverse w-full max-w-3xl h-full gap-4 px-2">
        {/* <NotesDescription/> */}
        {selectedNote || previewEnabled ? (
          <NotePreview
            previewEnabled={previewEnabled}
            title={title}
            desc={desc}
          />
        ) : (
          <div className="flex-1 flex w-full h-full max-w-3xl items-center justify-center text-muted-foreground ">
            Select a note to view its details.
          </div>
        )}

        <hr className="w-[30%] mx-auto border-2 border-black rounded-full " />

        <Archieve handleArchieveOpen={handleArchieveOpen} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 w-full h-full bg-[#3335] flex items-center justify-center">
          <div className="flex flex-col items-center contents-center w-full max-w-3xl max-h-[50%] bg-white rounded-lg">
            <div className="flex w-[80%] items-center justify-between py-4">
              <h2 className="text-xl font-bold py-2">Archived Notes</h2>
              <div className="flex flex-row gap-4 items-center justify-around">
                <ArchiveRestore color={"black"} strokeWidth={2} size={20} />
                <X onClick={handleArchieveClose} strokeWidth={2} />
              </div>
            </div>
            <ul className="list-none overflow-y-auto my-4 w-[80%]">
              {/* {notes.map((note) => (
                <li key={note.id} className="mb-2">
                  {note.title}
                  {note.createdAt}
                </li>
              ))} */}
              {notes.filter((note) => note.isArchived).length >= 0 ? (
                notes
                  .filter((note) => note.isArchived)
                  .map((note) => (
                    <li key={note.id} className="mb-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{note.title}</span>
                        {/* <span className="text-sm text-gray-500">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span> */}
                      </div>
                    </li>
                  ))
              ) : (
                <li className="text-gray-500 text-center">No archives yet</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
