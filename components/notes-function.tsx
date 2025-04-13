import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchNotes = async () => {
  const data = await prisma.note.findMany({
    select: {
      id: true,
      title: true,
      description: true,
    },
  });
  return data;
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
  const deletedNote = await prisma.note.delete({
    where: { id },
  });
  return deletedNote;
};

const updateNote = async (id: string, data: { title?: string }) => {
  const updatedNote = await prisma.note.update({
    where: { id },
    data,
  });
  return updatedNote;
};

export { fetchNotes, createNote, deleteNote, updateNote };
