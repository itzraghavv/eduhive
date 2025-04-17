"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchNotes = async (userId: string) => {
  try {
    const data = await prisma.note.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        description: true,
      },
    });

    return data || [];
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw new Error("Failed to fetch notes");
  }
};

const createNote = async ({
  title,
  description,
  userId,
}: {
  title: string;
  description: string;
  userId: string;
}) => {
  const newNote = await prisma.note.create({
    data: {
      title,
      description,
      userId,
    },
  });
  return newNote;
};

const deleteNote = async ({ id }: { id: string }) => {
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

const updateNote = async (id: string, data: { title?: string }) => {
  const updatedNote = await prisma.note.update({
    where: { id },
    data,
  });
  return updatedNote;
};

export { fetchNotes, createNote, deleteNote, updateNote };
