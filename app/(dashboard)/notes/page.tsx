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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown
import remarkBreaks from "remark-breaks";

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
  const { notes, loading, fetchLoading, error, handleSaveNote, fetchNotes } =
    useDB();

  const { data: session } = useSession();
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

  // const handleDeleteNote = async (noteId: string) => {
  //   if (!currentUserId) {
  //     alert("No user");
  //     return;
  //   }

  //   const confirmed = window.confirm(
  //     "Are you sure you want to delete this note?"
  //   );
  //   if (!confirmed) return;

  //   try {
  //     const response = await fetch("/api/database", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id: noteId }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to delete note");
  //     }

  //     fetchNotes(currentUserId);
  //   } catch (e) {
  //     console.log("Error deleting note", e);
  //     alert("Failed to delete note");
  //   }
  // };

  useEffect(() => {
    if (currentUserId) {
      fetchNotes(currentUserId);
    }
  }, [currentUserId]);

  if (!session) {
    return <NoResponse />;
  }

  return (
    <div className="flex-1 items-center content-center">
      <section className="flex-1 w-full flex items-center justify-center">
        <h1 className="text-2xl font-black">Notes Page</h1>
      </section>
      <section className="flex w-full items-center justify-center flex-col">
        <h2>Name:</h2>
        <TextArea
          className="bg-white shadow-2xs focus-visible:ring-0 focus:border-none max-w-[80%]"
          placeholder="New Note..."
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
        <h2>Details:</h2>
        <TextArea
          ref={descInputRef}
          className="bg-white shadow-2xs focus-visible:ring-0 focus:border-none max-w-[80%]"
          placeholder="I am studying..."
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
        <Button onClick={saveNote} disabled={loading}>
          {loading ? "Saving..." : "Save Note"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </section>
      {fetchLoading ? (
        "Retrieving Your Data..."
      ) : (
        <CardContent className="flex flex-col gap-4 ">
          {notes.length > 0 &&
            notes.map((note) => (
              <Card
                key={note.id}
                className="p-4 gap-4 flex-row items-stretch justify-between"
              >
                <section className="flex flex-col flex-wrap">
                  <CardTitle>{note.title}</CardTitle>
                  <CardDescription className="whitespace-pre-wrap break-words">
                    <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                      {note.description}
                    </ReactMarkdown>
                  </CardDescription>
                </section>
                <section className="flex flex-wrap gap-2">
                  {/* <Button> */}
                  {/* <Edit /> */}
                  {/* </Button> */}
                  <Button
                    onClick={() => {
                      if (currentUserId) {
                        handleDeleteNote(note.id, currentUserId);
                        fetchNotes(currentUserId);
                      } else {
                        alert("User ID is undefined");
                      }
                    }}
                  >
                    <Trash2 />
                  </Button>
                </section>
              </Card>
            ))}
        </CardContent>
      )}
    </div>
  );
};

export default NotesPage;
