import {
  fetchNotes,
  createNote,
  deleteNote,
  updateNote,
} from "@/components/crud-notes-function";
import { NextResponse } from "next/server";

// Fetch all notes
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId paramater" },
        { status: 400 }
      );
    }

    const notes = await fetchNotes(userId);
    return NextResponse.json(notes);
  } catch (e) {
    console.log("Failed to fetch Notes : ", e);
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

    // Validate input
    if (!title || !description || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 402 }
      );
    }

    const newNote = await createNote({ title, description, userId });
    return NextResponse.json(newNote);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create note here" },
      { status: 500 }
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

    if (!id) {
      return NextResponse.json({ error: "Missing note ID" }, { status: 400 });
    }

    const deletedNote = await deleteNote({ id });
    return NextResponse.json(deletedNote);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}
