"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Note = {
  id: string;
  title: string;
  description: string;
  isArchived: boolean;
  isStarred: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const fetchNotes = async ({ userId }: { userId: string }) => {
  // Validatiing Params
  if (!userId) {
    throw new Error("Invalid userId");
  }

  // Starting to fetch
  try {
    const data = await prisma.note.findMany({
      where: { userId: userId },
      orderBy: {
        title: "asc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        isArchived: true,
        isStarred: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return data || [];
  } catch (error) {
    console.error("Error fetching notes:", error);
    // throw new Error("Failed to fetch notes");
  }
};

const fetchNoteById = async ({ noteId }: { noteId: string }) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: noteId },
      select: {
        id: true,
        title: true,
        description: true,
        isArchived: true,
        isStarred: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return note;
  } catch (e) {
    console.error("Error fetching Note by ID : ", e);
  }
};

type CreateNoteInput = {
  title: string;
  description: string;
  userId: string;
};

const createNote = async ({
  title,
  description,
  userId,
}: CreateNoteInput): Promise<Note> => {
  const newNote = await prisma.note.create({
    data: {
      title,
      description,
      userId,
    },
  });
  return newNote;
};

const deleteNote = async ({ noteId }: { noteId: string }): Promise<Note> => {
  try {
    const deletedNote = await prisma.note.delete({
      where: { id: noteId },
    });
    return deletedNote;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw new Error("Failed to delete note");
  }
};

type UpdateNoteInput = {
  title?: string;
  description?: string;
  isStarred?: boolean;
  isArchived?: boolean;
};

const updateNote = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateNoteInput;
}): Promise<Note> => {
  try {
    const updatedNote = await prisma.note.update({
      where: { id },
      data,
    });
    return updatedNote;
  } catch (error) {
    console.error("Error updating note:", error);
    throw new Error("Failed to update note");
  }
};

export { fetchNotes, fetchNoteById, createNote, deleteNote, updateNote };
