import completion from "./completion";
import {
  getStep2ArrayListPrompt,
  getStep2TypescriptPrompt,
  getStep3Prompt,
  getTSCodeByListPrompt,
} from "./prompt";

import type {
  InteField,
  InteFieldConfig,
  InteGenerateCode,
} from "@/@types/code";

export const getStep2Code = async (data: InteFieldConfig) => {
  const { apiKey, code, language, codeType } = data;

  const [typescriptCode, fieldList] = await Promise.all([
    completion(getStep2TypescriptPrompt(code, language, codeType), apiKey),
    completion(getStep2ArrayListPrompt(code, language), apiKey),
  ]);

  return {
    typescriptCode,
    fieldList,
  };
};

export const getTsCode = async (data: InteField[], apiKey: string) => {
  if (!apiKey) {
    new Error("apiKey is required");
  }
  const tscode = await completion(
    getTSCodeByListPrompt(JSON.stringify(data)),
    apiKey
  );
  return {
    tscode,
  };
};

export const getGenerateCode = async (
  data: InteGenerateCode,
  apiKey: string
) => {
  if (!apiKey) {
    throw new Error("apiKey is required");
  }

  const code = await completion(getStep3Prompt(data), apiKey);
  return { code };
};
