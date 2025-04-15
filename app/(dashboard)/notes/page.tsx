"use client";

import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useDB } from "@/hooks/use-db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const NotesPage = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { notes, loading, fetchLoading, error, handleSaveNote, fetchNotes } =
    useDB();

  // for enter key press moving
  const descInputRef = useRef<HTMLInputElement>(null);

  const saveNote = async () => {
    if (!title || !desc) {
      alert("Enter From Inputs First to proceed");
      return;
    }

    await handleSaveNote({
      title: title.trim(),
      description: desc.trim(),
      userId: "3edb8deb-4e29-41a1-bfb5-199e10095dc1",
    });
    setTitle("");
    setDesc("");
    fetchNotes("3edb8deb-4e29-41a1-bfb5-199e10095dc1");
  };

  useEffect(() => {
    fetchNotes("3edb8deb-4e29-41a1-bfb5-199e10095dc1");
  }, []);

  return (
    <main className="flex-1 items-center content-center">
      <section className="flex-1 w-full flex items-center justify-center">
        <h1 className="text-2xl font-black">Notes Page</h1>
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
              saveNote();
            }
          }}
        ></Input>
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
                  <CardDescription>{note.description}</CardDescription>
                </section>
                <section className="flex flex-wrap gap-2">
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </section>
              </Card>
            ))}
        </CardContent>
      )}
    </main>
  );
};

export default NotesPage;
