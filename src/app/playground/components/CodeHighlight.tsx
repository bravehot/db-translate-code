"use client";
import { LegacyRef, useCallback, useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import { message } from "antd";

import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/toolbar/prism-toolbar";

// import "prismjs/components/prism-sql";
// import "prismjs/components/prism-cshtml";
// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-jsx";
// import "prismjs/components/prism-go";
// import "prismjs/components/prism-typescript";
// import "prismjs/components/prism-java";
// import "prismjs/components/prism-python";

import "prismjs/themes/prism.css";
import "prismjs/themes/prism-okaidia.css";

import type { NextPage } from "next";

const CodeHighlight: NextPage<{
  language: string;
  code: string;
}> = ({ language, code }) => {
  const preRef = useRef<LegacyRef<HTMLElement> | undefined>();
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
  }, []);

  useEffect(() => {
    if (language.startsWith("Vue")) {
      setPrismLanguage(() => "cshtml");
    } else if (language === "React") {
      setPrismLanguage(() => "jsx");
    } else {
      setPrismLanguage(() => language.toLocaleLowerCase());
    }

    console.log(prismLanguage);
    import("prismjs/components/prism-" + prismLanguage);
    Prism.highlight(code, Prism.languages["js"], prismLanguage);

    console.log(123123);
  }, [language, code, prismLanguage]);
  return (
    <section className="w-full h-full">
      {contextHolder}
      {prismLanguage}
      <pre className="Code line-numbers w-full h-full !p-1 !rounded-none !m-0 overflow-hidden">
        <code className={`language-${prismLanguage} overflow-hidden h-full`}>
          {code}
        </code>
      </pre>
    </section>
  );
};

export default CodeHighlight;
