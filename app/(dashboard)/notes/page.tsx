"use client";

import { useEffect, useState, useRef } from "react";
import { TextArea } from "@/components/ui/input";
import { useDB } from "@/hooks/use-db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { NoResponse } from "@/components/auth";
import { handleDeleteNote } from "@/components/notes-functions";
import { Loader2 } from "lucide-react";

// FONT STYLE / MARKDOWN IMPORTS
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";

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

interface DeleteButtonProps {
  id: string;
  currentUserId: string | undefined;
  fetchNotes: (userId: string) => void;
  handleDeleteNote: (id: string, userId: string) => void;
}

const NotesPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { notes, loading, fetchLoading, error, handleSaveNote, fetchNotes } =
    useDB();

  const { data: session, status } = useSession();
  console.log("SEssions :", session);
  const currentUserId = session?.user?.id;

  console.log("ID : ", currentUserId);

  // for enter key press moving
  const descInputRef = useRef<HTMLTextAreaElement>(null);

  const saveNote = async () => {
    if (!currentUserId) {
      alert("No user");
      return;
    }
    if (!title || !desc) {
      alert("Enter From Inputs First to proceed");
      return;
    }

    await handleSaveNote({
      title: title.trim(),
      description: desc.trim(),
      userId: currentUserId,
    });

    setTitle("");
    setDesc("");

    // Reset the height of the description textarea
    if (descInputRef.current) {
      descInputRef.current.style.height = "auto";
    }

    fetchNotes(currentUserId);
  };

  const DeleteButton: React.FC<DeleteButtonProps> = ({
    id,
    currentUserId,
    fetchNotes,
    handleDeleteNote,
  }) => {
    return (
      <Button
        onClick={() => {
          if (currentUserId) {
            handleDeleteNote(id, currentUserId);
            fetchNotes(currentUserId);
          } else {
            alert("User ID is undefined");
          }
        }}
      >
        <Trash2 />
      </Button>
    );
  };

  useEffect(() => {
    if (currentUserId) {
      fetchNotes(currentUserId);
    }
  }, [currentUserId]);

  if (status === "loading") {
    return (
      <div className="flex flex-col h-screen max-w-2xl mx-auto px-4 py-6 items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <Loader2 className="animate-spin" />
        <p className="text-muted-foreground">
          Please wait while we load your notes.
        </p>
        <div className="loader mt-4"></div>
      </div>
    );
  }

  if (!session) {
    return <NoResponse />;
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-6">
      {/* Headings */}
      <section className="w-full max-w-3xl text-center mb-6">
        <h1 className="text-3xl font-extrabold text-primary mb-4">
          Notes Page
        </h1>
        <p className="text-muted-foreground">
          Create, view, and manage your notes with ease.
        </p>
      </section>

      {/* Notes Creating Form */}
      <section className="w-full max-w-3xl shadow-md rounded-lg p-6 mb-6 box-border">
        <h2 className="text-lg text-muted-foreground font-semibold mb-2">
          Title:
        </h2>
        <TextArea
          className="bg-white shadow-2xs focus-visible:ring-0 focus:border-2 rounded-md w-full mb-4"
          placeholder="Enter the title of your note..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              descInputRef.current?.focus();
            }
          }}
        ></TextArea>

        <h2 className="text-lg mb-2 font-semibold text-muted-foreground">
          Description:
        </h2>
        <TextArea
          ref={descInputRef}
          className="bg-white shadow-2xs focus-visible:ring-0 focus:border-2 rounded-md w-full mb-4"
          placeholder="Enter the details of your note..."
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);

            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              saveNote();
            }
          }}
        ></TextArea>
        <Button
          onClick={saveNote}
          disabled={loading}
          className="bg-primary text-white hover:bg-primary-dark w-full"
        >
          {loading ? "Saving..." : "Save Note"}
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </section>

      {fetchLoading ? (
        <p className="text-muted-foreground w-full max-w-3xl">
          Retrieving Your Data...
        </p>
      ) : (
        <CardContent className="box-border w-full max-w-3xl flex flex-col m-0 px-0 py-6 ">
          {notes.length > 0 ? (
            notes.map((note) => (
              <Card
                key={note.id}
                className="p-4 flex-1 flex-row items-stretch justify-between shadow-sm rounded-lg w-full m-0 box-border mb-4"
              >
                <section className="flex flex-col w-full">
                  <CardTitle className="text-lg font-bold text-primary flex w-full items-stretch justify-between">
                    {note.title}
                    <DeleteButton
                      id={note.id}
                      currentUserId={currentUserId}
                      fetchNotes={fetchNotes}
                      handleDeleteNote={handleDeleteNote}
                    />
                  </CardTitle>
                  <CardDescription className="whitespace-pre-wrap break-words mine-markdown text-muted-foreground p-4">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {note.description}
                    </ReactMarkdown>
                  </CardDescription>
                </section>
                <section className="flex flex-wrap gap-2">
                  {/* <Button> */}
                  {/* <Edit /> */}
                  {/* </Button> */}
                </section>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center">
              No notes available. Start by creating a new note!
            </p>
          )}
        </CardContent>
      )}
    </div>
  );
};

export default NotesPage;
