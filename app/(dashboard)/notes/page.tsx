"use client";

import { useEffect, useState, useRef } from "react";
import { useDB } from "@/hooks/use-db";
import { toast } from "sonner";
// import "sonner/dist/sonner.css";

import { useSession } from "next-auth/react";
import { NoResponse } from "@/components/auth";

import {
  NotesPageHeader,
  NotesPageLoading,
  NotesLoading,
} from "@/components/notes/notesUi";
import NotesForm from "@/components/notes/noteSaveForm";
import NotesList from "@/components/notes/notesList";

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

  // for enter key press moving
  const descInputRef = useRef<HTMLTextAreaElement>(null);

  const saveNote = async () => {
    if (!currentUserId) {
      toast.error("No User has been found", {
        description: "User Credentials are absent...",
        // action: {
        //   label: "Undo",
        //   onClick: () => console.log("Undo"),
        // },
      });
      return;
    }
    if (!title || !desc) {
      toast.error("Enter data in Input Fields first...", {
        description: "Form is empty",
        // action: {
        //   label: "Undo",
        //   onClick: () => console.log("Undo"),
        // },
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

    toast.success("Note Saved Succesfully...", {
      description: title + " named.",
    });
    setTitle("");
    setDesc("");
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
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 min-h-0 h-screen">
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
      />

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
  );
};

export default NotesPage;
