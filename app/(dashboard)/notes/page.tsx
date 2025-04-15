"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useDB } from "@/hooks/use-db";
import Link from "next/link";
import { useSession } from "next-auth/react";

const NotesPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");const { notes, loading, error, handleSaveNote, fetchNotes } = useDB();

  const { data: session } = useSession();

  const descInputRef = useRef<HTMLInputElement>(null);

  const saveNote = async () => {
    await handleSaveNote({
      title,
      description: desc,
      userId: "3edb8deb-4e29-41a1-bfb5-199e10095dc1",
    });
    setTitle("");
    setDesc("");
  };

  useEffect(() => {
    fetchNotes("3edb8deb-4e29-41a1-bfb5-199e10095dc1");
  }, [fetchNotes]);

  if (!session) {
    return (
      <div className="flex flex-col h-screen max-w-2xl mx-auto px-4 py-6 items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">Please login to continue</h1>
        <p className="text-muted-foreground">
          You need to be logged in to access this page.
        </p>
        <Button className="mt-4">
          <Link href="/signin">Sign In</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="flex-1 items-center content-center">
      <section>
        <h1>Notes Page</h1>
        <>
          <Button>Create</Button>
          <Button>Delete</Button>
        </>
      </section>
      <section className="flex w-full items-center justify-center flex-col">
        <h2>Name:</h2>
        <Input
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
        ></Input>
        <h2>Details:</h2>
        <Input
          ref={descInputRef}
          className="bg-white shadow-2xs focus-visible:ring-0 focus:border-none max-w-[80%]"
          placeholder="I am studying..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              saveNote;
            }
          }}
        ></Input>
        <Button onClick={saveNote} disabled={loading}>
          {loading ? "Saving..." : "Save Note"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </section>
      <section>
        {notes.length > 0 &&
          notes.map((note) => (
            <li key={note.id}>
              <h2>{note.title}</h2>
              <p>{note.description}</p>
            </li>
          ))}
      </section>
    </main>
  );
};

export default NotesPage;
