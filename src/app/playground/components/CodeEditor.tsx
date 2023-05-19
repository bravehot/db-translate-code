"use client";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import "@uiw/react-textarea-code-editor/dist.css";

export interface InteCodeEditorProp {
  code: string;
  setCode: (code: string) => void;
  language: string;
}

const Editor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false }
);

const CodeEditor: NextPage<InteCodeEditorProp> = ({
  code,
  setCode,
  language,
}) => {
  return (
    <div data-color-mode="dark" className="w-full h-full">
      <Editor
        className="w-full h-full"
        value={code}
        language={language}
        placeholder="Please enter code."
        onChange={(event) => setCode(event.target.value || "")}
        style={{
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          fontSize: 12,
        }}
      />
    </div>
  );
};

export default CodeEditor;
