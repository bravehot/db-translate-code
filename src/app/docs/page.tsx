"use client";
const code1 = `
export interface InteGenerateCode {
  code: string;
  framework: string;
  useTs: "Y" | "N";
  componetLib: string;
  component: string;
  mockData: "Y" | "N";
}
`;

const code2 = `
  <template>
    <div>button</div>
  </template>
`;
import { useState } from "react";
import CodeHighlight from "../playground/components/CodeHighlight";
const Docs = () => {
  const [status, setStaus] = useState(false);
  const [language, setLanguage] = useState("typescript");
  const [code, setCode] = useState(code1);

  const handleChange = () => {
    if (status) {
      setCode(code1);
      setLanguage("typescript");
    } else {
      setCode(code2);
      setLanguage("Vue");
    }
    setStaus((prev) => !prev);
  };
  return (
    <>
      <button onClick={handleChange}>change</button>
      <CodeHighlight language={language} code={code} />
    </>
  );
};

export default Docs;
