export const getStep2TypescriptPrompt = (
  code: string,
  language: string,
  codeType?: string
) => {
  return `Generate a Typescript code delimited by Angle brackets, the code in Angle brackets is ${language}. \n
  Please use camel-case method and determine whether it is optional property required in TypeScript. \n
  if the code in Angle brackets does not generate the correct code or is not ${language} ${codeType}, just only return the number 401. \n 
  <>${code}<>`;
};

export const getStep2ArrayListPrompt = (code: string, language: string) => {
  return `Generate a JavaScript Array code and create some object to store in Array by Angle brackets
  Please make per object has name, type, required, labelName properties.\n
  where name is the field name and use camel-case method, converts the ${language} type of the field to Javascript type and assigns values to type, determines whether required is required according to ${language}. \n
  if the code has description value, please assign the description field to labelName, if not have, please translate the field name to Chinese. \n
  if the code in Angle brackets does not generate the correct code, just only return the number 401. \n 
  if not, create a Javascript array named fieldLists. \n
  <>${code}<>`;
};

export const getStep3Prompt = (prompt: any) => {
  const { code, framework, useTs, componetLib, component, mockData } = prompt;
  const useTypescript =
    useTs === "Y" ? "use Typescript, " : "not use TypScript, ";
  const useMockData =
    mockData === "Y" ? `while generating some default data.` : "";
  const useFramework = framework.startsWith("Vue") ? "vue" : "react";
  let fileName = "";
  let frameworkCode = "";

  switch (framework) {
    case "React":
      frameworkCode = "hooks";
      fileName = useTs === "Y" ? "tsx" : "jsx";
      break;
    case "Vue3":
      // 在 text-davinci-003 model 中无法生成 script setup 语法.
      frameworkCode = `use ${framework} template and script grammar and use ref to defined data,`;
      fileName = ".vue";
      break;
    case "Vue2":
      frameworkCode = `use ${framework} template and script grammar,`;
      fileName = ".vue";
      break;

    default:
      break;
  }

  return `Generate a ${useFramework} code delimited by Angle brackets, the code ${frameworkCode} ${useTypescript} ${componetLib} to generate a ${component} component, the component will used in a ${fileName} file. ${useMockData} \n
  if the code in Angle brackets does not generate the correct code, just return the number 401. \n
  <>${code}<>`;
};

export const getTSCodeByListPrompt = (code: any) => {
  return `Generate a Typescript code delimited by Angle brackets. \n
  In the following is a JavaScript Array code, name represents the typescript each field, type represents the type of the field, and required represents whether the field is optional, and set the LabelName as a  per field comment. \n
  if the code in Angle brackets does not generate the correct code, just return the number 401. \n
  <>${code}<>`;
};
