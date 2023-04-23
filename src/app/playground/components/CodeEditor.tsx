"use client";

import Editor from "@monaco-editor/react";
import type { NextPage } from "next";

interface InteCodeEditorProp {
  code: string;
  setCode: (code: string) => void;
}

const CodeEditor: NextPage<InteCodeEditorProp> = ({ code, setCode }) => {
  const handleChange = (val: string | undefined) => {
    if (val) {
      setCode(val);
    }
  };

  return <Editor theme="vs-dark" value={code} onChange={handleChange} />;
};

export default CodeEditor;
