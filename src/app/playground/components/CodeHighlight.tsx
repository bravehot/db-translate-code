"use client";
import { LegacyRef, useCallback, useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import { message } from "antd";

import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/toolbar/prism-toolbar";

import "prismjs/components/prism-sql";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-go";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";

import "prismjs/themes/prism.css";
import "prismjs/themes/prism-okaidia.css";

import type { NextPage } from "next";

const CodeHighlight: NextPage<{
  language: string;
  code: string;
}> = ({ language, code }) => {
  const preRef = useRef<LegacyRef<HTMLElement>>();
  const [messageApi, contextHolder] = message.useMessage();

  const [prismLanguage, setPrismLanguage] = useState<string>(
    language.toLocaleLowerCase()
  );

  const handleCopyCode = useCallback(async () => {
    await window.navigator.clipboard.writeText(code);
    messageApi.success("Copied to clipboard");
  }, [messageApi, code]);

  useEffect(() => {
    Prism.plugins.toolbar.registerButton("copy button", {
      text: "Copy", // required
      onClick: handleCopyCode,
    });
  }, [handleCopyCode]);

  useEffect(() => {
    if (language.startsWith("Vue")) {
      setPrismLanguage(() => "cshtml");
    } else if (language === "React") {
      setPrismLanguage(() => "jsx");
    } else {
      setPrismLanguage(() => language.toLocaleLowerCase());
    }

    preRef.current = Prism.highlight(code, Prism.languages.js, prismLanguage);
    console.log(" preRef.current: ", preRef.current);
  }, [language]);
  return (
    <section className="w-full h-full">
      {contextHolder}
      {prismLanguage}

      {preRef.current && (
        <pre className="Code line-numbers w-full h-full !p-1 !rounded-none !m-0 overflow-hidden">
          <code
            dangerouslySetInnerHTML={{ __html: preRef.current }}
            className={`language-${prismLanguage} overflow-hidden h-full`}
          />
        </pre>
      )}
    </section>
  );
};

export default CodeHighlight;
