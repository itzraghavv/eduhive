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
  content,
  description,
  userId,
}: {
  title: string;
  content: string;
  description: string;
  userId: string;
}) => {
  const newNote = await prisma.note.create({
    data: {
      title,
      content,
      description,
      userId,
    },
  });
  return newNote;
};

const deleteNote = async ({ id }: { id: string }) => {
  const deletedNote = await prisma.Note.delete({
    where: { id },
  });
  return deletedNote;
};

const updateNote = async (
  id: number,
  data: { title?: string; content?: string }
) => {
  const updatedNote = await prisma.Note.update({
    where: { id },
    data,
  });
  return updatedNote;
};

export { fetchNotes, createNote, deleteNote, updateNote };
