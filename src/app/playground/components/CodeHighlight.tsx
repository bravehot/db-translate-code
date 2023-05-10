"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { ocean } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyOutlined } from "@ant-design/icons";
import { message } from "antd";

interface InteCodeHighlightProp {
  language: string;
  code: string;
}

const CodeHighlight: NextPage<InteCodeHighlightProp> = ({ language, code }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [highlightLanguage, setHighlightLanguage] =
    useState<string>("typescript");

  useEffect(() => {
    if (language.startsWith("Vue")) {
      setHighlightLanguage(() => "xml");
    } else if (language === "React") {
      setHighlightLanguage(() => "jsx");
    } else {
      setHighlightLanguage(() => language.toLocaleLowerCase());
    }
  }, [language]);

  const handleCopy = async () => {
    await window.navigator.clipboard.writeText(code);
    messageApi.success("Copied  🎉 ");
  };

  return (
    <section className="relative">
      {contextHolder}
      <SyntaxHighlighter
        className="h-full w-full mt-0"
        language={highlightLanguage}
        showLineNumbers
        wrapLines
        style={ocean}
      >
        {code}
      </SyntaxHighlighter>
      <CopyOutlined
        className="absolute top-2 right-2 cursor-pointer"
        onClick={handleCopy}
      />
    </section>
  );
};

export default CodeHighlight;
