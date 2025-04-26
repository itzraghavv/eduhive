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

  try {
    const response = await sendNoteQuery({
      selectedContent: selectedContent,
      noteContent: noteContent,
      rephrase: false,
    });

    console.log("AI Response (Dictionary):", response);
    return response; // Return the response to the caller
  } catch (error) {
    console.error("Error in handleDictionary:", error);
    toast.error("Failed to fetch dictionary response.");
    return null;
  }
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

  try {
    const response = await sendNoteQuery({
      selectedContent: selectedContent,
      noteContent: noteContent,
      rephrase: true,
    });

    console.log("AI Response (Rephrase):", response);
    return response; // Return the response to the caller
  } catch (error) {
    console.error("Error in handleRephrase:", error);
    toast.error("Failed to fetch rephrase response.");
    return null;
  }
};
