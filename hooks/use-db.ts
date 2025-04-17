import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

interface Note {
  id: string;
  title: string;
  description: string;
}

export function useDB() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async (userId: string) => {
    setFetchLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/database?userId=${userId}`);
      setNotes(response.data);
    } catch (e: any) {
      toast.error("Failed to fetch notes. Please try again.", {
        description: e,
      });
      setError(e.response?.data?.error || "An Unexpected Error Occurred");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSaveNote = async ({
    title,
    description,
    userId,
  }: {
    title: string;
    description: string;
    userId: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/database", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          userId,
        }),
      });
      if (response.ok) {
        const newNote = await response.json();
        setNotes((prevNotes) => [...prevNotes, newNote]);
        toast.success("Note saved successfully!");
      }
    } catch (e: any) {
      console.error("Failed to save note:", e);
      setError(e.response?.data?.error || "An unexpected error occurred");
      toast.error("Failed to save note. Please try again.", {
        description: e,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: string, userId: string) => {
    if (!userId) {
      alert("No user");
      return;
    }
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmed) return;
    try {
      const response = await fetch("/api/database", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: noteId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      toast.success("Note deleted successfully!");
    } catch (e) {
      console.log("Error deleting note", e);
      toast.error("Failed to delete note. Please try again.");
    }
  };

  return {
    notes,
    setNotes,
    // title,
    // desc,
    // setTitle,
    // setDesc,
    loading,
    error,
    fetchLoading,

    fetchNotes,
    handleDeleteNote,
    handleSaveNote,
  };
}
