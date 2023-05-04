export interface InteFieldConfig {
  code: string;
  apiKey: string;
  language?: string;
  codeType?: string;
}

export interface InteField {
  name: string;
  type: string;
  required: boolean;
}

export interface InteGenerateCode {
  code: string;
  framework: string;
  useTs: "Y" | "N";
  componetLib: string;
  component: string;
  mockData: "Y" | "N";
}
