import completion from "./completion";
import {
  generateCode,
  generateTSCode,
  getFieldList,
  getTypescriptCode,
} from "./prompt";

import type {
  InteField,
  InteFieldConfig,
  InteGenerateCode,
} from "@/@types/code";

const getCodeField = async (data: InteFieldConfig) => {
  const { apiKey, code, language, codeType } = data;

  const tscode = await completion(
    getTypescriptCode(code, language, codeType),
    apiKey
  );
  const fieldList = await completion(getFieldList(language, code), apiKey);
  return {
    tscode,
    fieldList,
  };
};

const getTsCode = async (data: InteField[], apiKey: string) => {
  if (!apiKey) {
    new Error("apiKey is required");
  }
  const tscode = await completion(generateTSCode(JSON.stringify(data)), apiKey);
  return {
    tscode,
  };
};

const getGenerateCode = async (data: InteGenerateCode, apiKey: string) => {
  if (!apiKey) {
    throw new Error("apiKey is required");
  }

  const code = await completion(generateCode(data), apiKey);
  return { code };
};

export { getCodeField, getTsCode, getGenerateCode };
