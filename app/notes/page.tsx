"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { fetchNotes, createNote } from "@/components/notes-function";
import { Input } from "@/components/ui/input";

const NotesPage = () => {
  interface Note {
    id: string;
    title: string;
    description: string;
  }

  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [desc, setDesc] = useState("");

  const descInputRef = useRef<HTMLInputElement>(null);

  const handleSaveNote = () => {
    if (title.trim() && desc.trim()) {
      console.log("Saving note:", { title, desc });
      // Add your save note logic here (e.g., call an API or update state)
      //   setNotes((prev) => [
      //     ...prev,
      //     // { id: Date.now().toString(), title, description: desc },
      //   ]);
      createNote({
        title: title,
        content: desc,
        description: desc,
        userId: "12345",
      });
      setTitle("");
      setDesc("");
    } else {
      alert("Both fields are required!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNotes();
      setNotes(data);
    };
    fetchData();
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
            if (e.key === "Enter") {
              e.preventDefault();
              handleSaveNote(); // Save the note on Enter
            }
          }}
        ></Input>
        <Button>Save Note</Button>
      </section>
    </main>
  );
};

export default NotesPage;
