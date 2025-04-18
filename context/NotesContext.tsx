"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Note {
  // user: string;
  id: string;
  title: string;
  description: string;
}

interface NotesContextType {
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <NotesContext.Provider value={{ selectedNote, setSelectedNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotesContext must be used within a NotesProvider");
  }
  return context;
};
