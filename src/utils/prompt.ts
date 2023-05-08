export const getTypescriptCode = (
  code: string,
  language: string,
  codeType?: string
) => {
  return `Generate Typescript code from ${language} ${codeType} code and determine whether it is optional property Required in TypeScript. \n ${code} \n\n`;
};

export const getFieldList = (language: string, code: string) => {
  return `Uses the JavaScript to generate an array the array variable name is "fieldLists", An object is stored in "fieldLists", and each object has "name", "type", "required", "labelName" properties. where "name" is the field name and use camel-case method, converts the ${language} type of the field to Javascript type and assigns values to "type", determines whether "required" is required according to SQL and "labelName" to the comment value of the ${language} field. \n ${code} \n\n`;
};

export const generateTSCode = (code: string) => {
  return `In the following is a JavaScript Array code, name represents the name of each field, type represents the type of the field, and required represents whether the field is optional, and set the LabelName as a field comment. Based on this code, a TypeScript interface was generated. \n ${code} \n\n`;
};

export const generateCode = (prompt: any) => {
  const { code, framework, useTs, componetLib, component, mockData } = prompt;
  const useTsText = useTs === "Y" ? "Typescript and" : "Not use TypScript,";
  const mockDataText =
    mockData === "Y" ? `while generating some default data.` : "";

  let fileName = "";
  let frameworkCode = "";
  switch (framework) {
    case "React":
      frameworkCode = "hooks";
      fileName = useTsText ? "tsx" : "jsx";
      break;
    case "Vue3":
      // 在 GPT3.5 中无法生成 setup 语法
      // frameworkCode = "<script setup> syntactic sugar, ";
      fileName = ".vue";
      break;
    case "Vue2":
      fileName = ".vue";
      break;

    default:
      break;
  }

  return `According to this Typescript Interface code, use ${framework} framework, ${frameworkCode} ${useTsText} ${componetLib} libraries to generate a ${component} component, the code is comment as the field name of the component. the component will used in a ${fileName} file, ${mockDataText} \n ${code}`;
};
