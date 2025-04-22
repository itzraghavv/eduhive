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

const fetchNotes = async (userId: string) => {
  // Validatiing Params
  if (!userId) {
    throw new Error("Invalid userId");
  }
  // const allowedOrderByFields = ["title", "createdAt", "updatedAt"];
  // if (!allowedOrderByFields.includes(orderBy)) {
  //   throw new Error(`Invalid orderBy field: ${orderBy}`);
  // }

  // Starting to fetch
  try {
    const data = await prisma.note.findMany({
      where: { userId },
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
    throw new Error("Failed to fetch notes");
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

const deleteNote = async (id: string): Promise<Note> => {
  try {
    const deletedNote = await prisma.note.delete({
      where: { id },
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

const updateNote = async (
  id: string,
  data: UpdateNoteInput = {}
): Promise<Note> => {
  const updatedNote = await prisma.note.update({
    where: { id },
    data,
  });
  return updatedNote;
};

export { fetchNotes, createNote, deleteNote, updateNote };
