"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";

const NotesPage = () => {
  interface Note {
    id: string;
    title: string;
    description: string;
  }

  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const descInputRef = useRef<HTMLInputElement>(null);

  const handleSaveNote = async ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    try {
      const response = await fetch("/api/database", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description: desc,
          userId: "124816",
        }),
      });
      if (response.ok) {
        const newNote = await response.json();
        setNotes((prevNotes) => [...prevNotes, newNote]);
        setTitle("");
        setDesc("");
      }
    } catch (e) {
      console.error("Note not saved coz : ", e);
    }
  };

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const response = await fetch("/api/database", { method: "GET" });
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch Notes:", error);
      }
    };

    fetchAllNotes();
  }, []);

  return (
    <main className="flex-1 items-center content-center">
      <section>
        <h1>Notes Page</h1>
        <>
          <Button>Create</Button>
          <Button>Delete</Button>
        </>
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
              handleSaveNote({ title, description: desc }); // Save the note on Enter
            }
          }}
        ></Input>
        <Button onClick={() => handleSaveNote({ title, description: desc })}>
          Save Note
        </Button>
      </section>
    </main>
  );
};

export default NotesPage;
