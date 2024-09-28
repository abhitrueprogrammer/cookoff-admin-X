"use client"; // This registers <Editor> as a Client Component
import { QuestionResponse } from "@/api/questions";
import { BlockNoteEditor } from "@blocknote/core"; // Import the correct type
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

let editorInstance: BlockNoteEditor; // Declare the editor outside to access it globally

export default function Editor() {
  // Creates a new editor instance and stores it in the editor state.
  const editor = useCreateBlockNote();
  editorInstance = editor; // Assign the editor instance to a global variable

  // Renders the editor instance using a React component.
  return <BlockNoteView theme="dark" className="col-span-3" editor={editor} />;
}

// Access the editor instance globally and return the markdown.
export function getData() {
  if (editorInstance) {
    return editorInstance.blocksToMarkdownLossy(editorInstance.document);
  } else {
    return null; // Handle the case where editor is not yet initialized
  }
}
export async function changeData(q:QuestionResponse) {
    if (editorInstance) {
        const md = await editorInstance.tryParseMarkdownToBlocks(q.Description);
        editorInstance.replaceBlocks(editorInstance.document, md);
    
    }
  }
  