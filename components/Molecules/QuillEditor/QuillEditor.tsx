"use client";
import React from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

interface IRichTextEditor {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

function RichTextEditor({ content, setContent }: IRichTextEditor) {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "link"],
      [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
      [{ color: [] }],
    ],
  };
  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "link",
    "list",
    "bullet",
    "align",
    "color",
  ];
  const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

  return (
    <QuillEditor
      value={content}
      onChange={handleEditorChange}
      modules={quillModules}
      formats={quillFormats}
      className="w-full bg-white border border-blue-700 rounded-md"
    />
  );
}

export default RichTextEditor;
