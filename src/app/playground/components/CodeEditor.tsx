"use client";
import Editor from "@monaco-editor/react";
import type { NextPage } from "next";

export interface InteCodeEditorProp {
  code: string;
  setCode: (code: string) => void;
  language: string;
}

const CodeEditor: NextPage<InteCodeEditorProp> = ({
  code,
  setCode,
  language,
}) => {
  const handleChange = (val: string | undefined) => {
    if (val) {
      setCode(val);
    }
  };

  return (
    <Editor
      theme="vs-dark"
      value={code}
      language={language}
      onChange={handleChange}
    />
  );
};

export default CodeEditor;
