export const getTypescriptCode = (
  code: string,
  language = "",
  codeType = ""
) => {
  return `Extract the relevant fields from the ${language} ${codeType} code below and convert the type to a lowercase Typescript type. finally return a Typescript Interface. ${code}`;
};

export const getFieldList = (code: string) => {
  return `The following Typescript Interface code has several fields, uses the JavaScript language to generate an array the variable name is  fieldLists, make each object in the array stores the name and type and required of each Javascript type field. finally returns the fieldLists array to me. \n ${code}`;
};

export const generateTSCode = (code: string) => {
  return `In the following JSON is a JavaScript code, name represents the name of each field, type represents the type of the field, and required represents whether the field is optional. An Interface of Typescript is generated based on this code. \n ${code}`;
};

export const generateCode = (prompt: any) => {
  const { code, framework, useTs, componetLib, component, mockData } = prompt;
  const useTsText = useTs === "Y" ? "Typescript" : "";
  const mockDataText =
    mockData === "Y" ? `while generating some default data` : "";
  return `According to this Typescript Interface code, use ${framework} framework, script SetUp, ${useTsText} and ${componetLib} component libraries and  generate a ${component} component to be used in a .vue file ${mockDataText}. \n ${code}`;
};
