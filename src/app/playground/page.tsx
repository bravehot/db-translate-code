"use client";
import { useState } from "react";
import { Button, Col, Row, Spin, message } from "antd";
import {
  ProFormSelect,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
import CodeEditor from "./components/CodeEditor";

import { getFieLdList, getGenerateCode, getTsCode } from "../utils/request";

import FieldList from "./components/FieldList";
import GetCode from "./components/GetCode";

import type { InteCodeEditorProp } from "./components/CodeEditor";
import type { InteField } from "../@types/playground";

export interface InteEditorConfig extends Omit<InteCodeEditorProp, "setCode"> {}

const Playground = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("typescript");
  const [fieldList, setFieldList] = useState<InteField[]>([]);

  const getTsCodeFieldList = async (
    apiKey: string,
    language?: string,
    codeType?: string
  ) => {
    const { data } = await getFieLdList({
      code,
      apiKey,
      language,
      codeType,
    });
    const { tscode, fieldList } = data;

    try {
      const currentFieldList = eval(
        `() => {${fieldList.replaceAll("\n", "")} return fieldLists}`
      )();
      setFieldList(currentFieldList);
    } catch (error) {
      console.log("error: ", error);
      messageApi.error("Failed to parse field list");
    }

    if (!localStorage.getItem("_apiKey")) {
      localStorage.setItem("_apiKey", apiKey);
    }
    setCode(tscode.replace("\n", ""));
    setLoading(false);
    setLanguage("typescript");
  };

  return (
    <section className="flex-1 w-full overflow-auto">
      {contextHolder}
      <Row className="w-full h-full">
        <Col span={12}>
          <CodeEditor code={code} setCode={setCode} language={language} />
        </Col>
        <Col span={12}>
          <section className="w-full h-full bg-black/50 p-4 box-border">
            <StepsForm
              containerStyle={{ minWidth: "auto", width: "100%" }}
              submitter={{
                render: (props: any) => {
                  if (props.step === 0) {
                    return [
                      <Button
                        key="next0"
                        type="primary"
                        onClick={() => {
                          props.form?.submit?.();
                        }}
                      >
                        Next Step
                      </Button>,
                    ];
                  }

                  if (props.step === 1) {
                    return [
                      <Button key="pre1" onClick={() => props.onPre?.()}>
                        Previous Step
                      </Button>,
                      <Button
                        type="primary"
                        key="next1"
                        onClick={() => props.onSubmit?.()}
                      >
                        Next Step {">"}
                      </Button>,
                    ];
                  }

                  if (props.step === 2) {
                    return [
                      <Button key="pre2" onClick={() => props.onPre?.()}>
                        Previous Step
                      </Button>,
                      <Button
                        type="primary"
                        key="next2"
                        onClick={() => props.onSubmit?.()}
                      >
                        Generate Code {">"}
                      </Button>,
                    ];
                  }
                },
              }}
            >
              <StepsForm.StepForm
                className="mt-5"
                title="Config"
                initialValues={{
                  language: "TypeScript",
                }}
                onFinish={async (value) => {
                  if (!code) {
                    messageApi.error("Please input some code");
                    return false;
                  }
                  setLoading(true);
                  await getTsCodeFieldList(
                    value.key,
                    value.language,
                    value.codeType
                  );
                  return true;
                }}
                onValuesChange={(val) => {
                  if (val.language) {
                    setLanguage(val.language.toLowerCase());
                  }
                }}
              >
                <ProFormText
                  rules={[
                    {
                      required: true,
                      message: "API Key is required",
                    },
                  ]}
                  name="key"
                  label="API Key"
                  placeholder="Input your OpenAI Key"
                />

                <ProFormSelect
                  placeholder="Select language"
                  name="language"
                  label="Language"
                  options={[
                    { label: "TypeScript", value: "TypeScript" },
                    { label: "Prisma", value: "Prisma" },
                    { label: "JavaScript", value: "JavaScript" },
                    { label: "Java", value: "Java" },
                    { label: "Go", value: "Go" },
                    { label: "Python", value: "Python" },
                  ]}
                />

                <ProFormSelect
                  placeholder="Select code type"
                  name="codeType"
                  label="Code Type"
                  options={[
                    { label: "Entity Class", value: "Entity Class" },
                    { label: "SQL Language", value: "SQL Language" },
                  ]}
                />
              </StepsForm.StepForm>
              <StepsForm.StepForm
                title="Field"
                onFinish={async (val) => {
                  setLoading(true);
                  const { data } = await getTsCode(val.fieldList);
                  setCode(data.tscode);
                  setLoading(false);
                  return true;
                }}
              >
                <FieldList fieldList={fieldList} />
              </StepsForm.StepForm>
              <StepsForm.StepForm
                title="Get Code"
                initialValues={{
                  framework: "Vue3",
                  useTs: "Y",
                  componetLib: "Element Plus",
                  component: "Table",
                  mockData: "Y",
                }}
                onFinish={async (val) => {
                  setLoading(true);
                  const { data } = await getGenerateCode({
                    code,
                    framework: val.framework,
                    useTs: val.useTs,
                    componetLib: val.componetLib,
                    component: val.component,
                    mockData: val.mockData,
                  });
                  setLoading(false);
                  setCode(data.code);
                  setLanguage(val.component.toLowerCase());
                  return true;
                }}
              >
                <GetCode />
              </StepsForm.StepForm>
            </StepsForm>
          </section>
        </Col>
        {isLoading ? (
          <Spin
            tip="Generating code By AI..."
            size="large"
            className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center"
          />
        ) : null}
      </Row>
    </section>
  );
};

export default Playground;
