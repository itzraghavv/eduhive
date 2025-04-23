import { sendNoteQuery } from "@/hooks/use-chat";
import { toast } from "sonner";

export const handleDictionary = async ({
  selectedContent,
  noteContent,
}: {
  selectedContent: string;
  noteContent: string;
}) => {
  if (!noteContent) {
    toast.error("No Note Detected");
    return;
  }
  if (!selectedContent) {
    toast.error("No Selection Detected");
    return;
  }

  const response = sendNoteQuery({
    selectedContent: selectedContent,
    noteContent: noteContent,
    rephrase: false,
  });

  console.log("AIRESPONSE : ", response);
};

export const handleRephrase = async ({
  selectedContent,
  noteContent,
}: {
  selectedContent: string;
  noteContent: string;
}) => {
  if (!noteContent) {
    toast.error("No Note Detected");
    return;
  }
  if (!selectedContent) {
    toast.error("No Selection Detected");
    return;
  }

  const response = sendNoteQuery({
    selectedContent: selectedContent,
    noteContent: noteContent,
    rephrase: true,
  });
  console.log("AIRESPONSE : ", response);
};
