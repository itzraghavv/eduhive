import { Loader2 } from "lucide-react";

const No_Note_Selected_To_Preview = () => {
  return (
    <div className="flex-1 flex w-full h-full max-w-3xl items-center justify-center text-muted-foreground ">
      No note selected.
    </div>
  );
};

const Live_Preview_Heading = () => {
  return (
    <span className="text-muted-foreground font-mono text-xs w-full flex items-center justify-center">
      Toggle-off the Live Preview button to preview your notes.
    </span>
  );
};

const NotesPageLoading = () => {
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto px-4 py-4 items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-2">Loading...</h1>
      <Loader2 className="animate-spin" />
      <p className="text-muted-foreground">
        Please wait while we load your notes.
      </p>
      <div className="loader mt-4"></div>
    </div>
  );
};

export { No_Note_Selected_To_Preview, Live_Preview_Heading, NotesPageLoading };
