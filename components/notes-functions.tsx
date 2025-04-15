import { fetchNotes } from "./crud-notes-function";

export const handleDeleteNote = async (
  noteId: string,
  currentUserId: string
) => {
  if (!currentUserId) {
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

    fetchNotes(currentUserId);
  } catch (e) {
    console.log("Error deleting note", e);
    alert("Failed to delete note");
  }
};
