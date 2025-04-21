"use client";

import { Download } from "lucide-react";

import { Button } from "./ui/button";

import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; // Table plugin
import "jspdf-autotable"; // Ensure plugin is registered
import ReactMarkdown from "react-markdown"; // Markdown renderer
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

// import "css-oklch/polyfill";
// import { parse, formatRgb } from "culori";

import { useNotesContext } from "@/context/NotesContext";
import { toast } from "sonner";

interface PdfGeneratorProps {
  markdown: string;
}

const PdfGenerator = () => {
  // const { selectedNote } = useNotesContext();
  // const contentRef = useRef<HTMLDivElement>(null); // Capture the DOM node :contentReference[oaicite:1]{index=1}

  // const handleDownload = async () => {
  //   if (!selectedNote || !selectedNote.description) {
  //     console.error("No note selected or description is missing.");
  //     return;
  //   }
  //   toast("Started making pdf");
  //   const doc = new jsPDF({ format: "a4", unit: "pt" }); // Instantiate jsPDF :contentReference[oaicite:2]{index=2}

  //   toast("1");
  //   const htmlEl = contentRef.current;
  //   const htmlEl2 = document.getElementById("content-to-pdf");
  //   if (!htmlEl) {
  //     console.log("here");
  //     if (!htmlEl2) {
  //       console.log("NOPE");
  //       return;
  //     }
  //   }

  //   // Convert the HTML container into PDF (image-based snapshot)
  //   toast("2");
  //   if (!htmlEl) {
  //     console.error("HTML element is null.");
  //     toast("2");
  //     return;
  //   }
  //   toast("wait");
  //   await doc.html(htmlEl, {
  //     callback: (docInstance) => {
  //       // Add a sample table at the end using AutoTable :contentReference[oaicite:3]{index=3}
  //       // autoTable(docInstance, {
  //       //   head: [["Column A", "Column B"]],
  //       //   body: [
  //       //     ["Data A1", "Data B1"],
  //       //     ["Data A2", "Data B2"],
  //       //   ],
  //       //   startY: docInstance.getNumberOfPages() * 280,
  //       // });
  //       docInstance.save("document.pdf"); // Trigger download :contentReference[oaicite:4]{index=4}
  //     },
  //     x: 20,
  //     y: 20,
  //     html2canvas: { scale: 0.5 }, // Adjust snapshot quality
  //   });
  //   toast("Converted into pdf");
  // };

  return (
    <Button>
      {/* <div className="" ref={contentRef}> */}
      {/* <ReactMarkdown
        //   remarkPlugins={[remarkGfm, remarkBreaks]}
        //   rehypePlugins={[rehypeHighlight]}
        > */}
      {/* {selectedNote?.description}
        </ReactMarkdown>
      </div> */}
      <Download size={18} />
    </Button>
  );
};

export default PdfGenerator;
