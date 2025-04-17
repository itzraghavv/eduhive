import { Edit, Loader2 } from "lucide-react";

// FONT STYLE / MARKDOWN IMPORTS
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // GitHub Flavored Markdown
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import { ScrollArea } from "@radix-ui/react-scroll-area";
// import "highlight.js/styles/github-dark.css";

const NotesPageHeader = () => {
  return (
    <section className="w-full max-w-3xl text-center mb-6">
      <h1 className="text-3xl font-extrabold text-primary mb-4">Notes Page</h1>
      <p className="text-muted-foreground">
        Create, view, and manage your notes with ease.
      </p>
    </section>
  );
};

const NotesPageLoading = () => {
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto px-4 py-6 items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      <Loader2 className="animate-spin" />
      <p className="text-muted-foreground">
        Please wait while we load your notes.
      </p>
      <div className="loader mt-4"></div>
    </div>
  );
};

const NotesLoading = () => {
  return (
    <div className="flex-1 flex items-center content-center">
      <Loader2 className="animate-spin" />

      <p className="text-muted-foreground w-full max-w-3xl">
        Retrieving Your Data...
      </p>
    </div>
  );
};

export { NotesPageHeader, NotesPageLoading, NotesLoading };
