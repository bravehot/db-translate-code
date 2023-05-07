const code = `
export interface InteGenerateCode {
  code: string;
  framework: string;
  useTs: "Y" | "N";
  componetLib: string;
  component: string;
  mockData: "Y" | "N";
}
`;
import CodeHighlight from "../playground/components/CodeHighlight";
const Docs = () => {
  return (
    <>
      Docs
      <CodeHighlight language="typescript" code={code} />
    </>
  );
};

export default Docs;
