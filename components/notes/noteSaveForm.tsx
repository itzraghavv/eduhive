import { TextArea } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefObject, useRef } from "react";

interface NotesFormProps {
  title: string;
  desc: string;
  setTitle: (value: string) => void;
  setDesc: (value: string) => void;
  saveNote: () => void;
  loading: boolean;
  error: string | null;
  descInputRef: RefObject<HTMLTextAreaElement | null>;
}

const NotesForm: React.FC<NotesFormProps> = ({
  title,
  desc,
  setTitle,
  setDesc,
  saveNote,
  loading,
  error,
  descInputRef,
}) => {
  return (
    <section className="w-full max-w-3xl shadow-md rounded-lg p-6 mb-4 box-border">
      <h2 className="text-lg text-muted-foreground font-semibold mb-2">
        Title:
      </h2>
      <TextArea
        className="bg-white shadow-2xs focus-visible:ring-0 focus:border-2 rounded-md w-full mb-4"
        placeholder="Enter the title of your note..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            descInputRef.current?.focus();
          }
        }}
      />
      <h2 className="text-lg mb-2 font-semibold text-muted-foreground">
        Description:
      </h2>
      <TextArea
        ref={descInputRef}
        className="bg-white shadow-2xs focus-visible:ring-0 focus:border-2 rounded-md w-full mb-4"
        placeholder="Enter the details of your note..."
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = `${target.scrollHeight}px`;
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            saveNote();
          }
        }}
      />
      <Button
        onClick={saveNote}
        disabled={loading}
        className="bg-primary text-white hover:bg-primary-dark w-full"
      >
        {loading ? "Saving..." : "Save Note"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </section>
  );
};

export default NotesForm;
