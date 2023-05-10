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
<script setup lang="ts">
import { Info20Regular as InfoIcon } from "@vicons/fluent";
</script>
<template>
  <section class="flex items-center h-7 leading-7">
    <slot />
    <n-tooltip placement="right">
      <template #trigger>
        <span class="flex ml-2 items-center text-gray-400 cursor-pointer">
          <n-icon :size="16">
            <InfoIcon />
          </n-icon>
        </span>
      </template>
      <slot name="tooltipText" />
    </n-tooltip>
  </section>
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
