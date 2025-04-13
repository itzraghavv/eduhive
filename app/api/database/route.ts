import {
  fetchNotes,
  createNote,
  deleteNote,
  updateNote,
} from "@/components/notes-function";
import { NextResponse } from "next/server";

// Fetch all notes
export async function GET() {
  try {
    const notes = await fetchNotes();
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

// Create a new note
export async function POST(req: Request) {
  try {
    const { title, description, userId } = await req.json();
    const newNote = await createNote({ title, description, userId });
    return NextResponse.json(newNote);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create note here" },
      { status: 501 }
    );
  }
}

// Update a note
export async function PUT(req: Request) {
  try {
    const { id, data } = await req.json();
    const updatedNote = await updateNote(id, data);
    return NextResponse.json(updatedNote);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
  }
}

// Delete a note
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const deletedNote = await deleteNote({ id });
    return NextResponse.json(deletedNote);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
