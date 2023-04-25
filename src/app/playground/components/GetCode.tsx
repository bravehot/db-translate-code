import { ProFormRadio, ProFormSelect } from "@ant-design/pro-components";

const GetCode = () => {
  return (
    <>
      <ProFormRadio.Group
        required
        name="framework"
        label="Select Framework"
        options={[
          {
            label: "Vue3",
            value: "Vue3",
          },
          {
            label: "Vue2",
            value: "Vue2",
          },
          {
            label: "React",
            value: "React",
          },
        ]}
      />
      {/* <ProFormDependency name={["framework"]}>
        {({ framework }) => {
          return (
            <>
              {framework === "Vue3" ? <></> : null}
              {framework === "React" ? <></> : null}
            </>
          );
        }}
      </ProFormDependency> */}
      <ProFormRadio.Group
        name="useTs"
        label="Use TypeScript"
        options={[
          {
            label: "Yes",
            value: "Y",
          },
          {
            label: "No",
            value: "N",
          },
        ]}
      />

      <ProFormSelect
        required
        name="componetLib"
        label="UI Library"
        options={[
          {
            label: "Element UI",
            value: "Element UI",
          },
          {
            label: "Element Plus",
            value: "Element Plus",
          },
          {
            label: "Ant Design",
            value: "Ant Design",
          },
          {
            label: "Naive UI",
            value: "Naive UI",
          },
        ]}
      />

      <ProFormSelect
        required
        name="component"
        label="Component"
        options={[
          {
            label: "Table",
            value: "Table",
          },
          {
            label: "Form",
            value: "Form",
          },
        ]}
      />

      <ProFormRadio.Group
        name="mockData"
        label="Mock Data"
        options={[
          {
            label: "Yes",
            value: "Y",
          },
          {
            label: "No",
            value: "N",
          },
        ]}
      />
    </>
  );
};

export default GetCode;
