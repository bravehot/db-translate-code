"use client";
import { useState } from "react";
import { Button, Col, Row, Spin, message } from "antd";

import {
  ProFormSelect,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
import CodeEditor from "./components/CodeEditor";

import type { InteCodeEditorProp } from "./components/CodeEditor";
import { getFieLdList } from "../utils/request";

export interface InteEditorConfig extends Omit<InteCodeEditorProp, "setCode"> {}

const Playground = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("typescript");

  const getTypescriptCode = async (
    apiKey: string,
    language?: string,
    codeType?: string
  ) => {
    setLoading(true);
    const { data } = await getFieLdList({
      code,
      apiKey,
      language,
      codeType,
    });
    console.log(data);
    setCode(data.tscode);
    setLoading(false);
  };

  return (
    <section className="flex-1 w-full">
      {contextHolder}

      <Row className="w-full h-full">
        <Col span={14}>
          <CodeEditor code={code} setCode={setCode} language={language} />
        </Col>
        <Col span={10}>
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
                  getTypescriptCode(value.key, value.language, value.codeType);
                  return true;
                }}
                onValuesChange={(val) => {
                  if (val.language) {
                    setLanguage(val.language.toLowerCase());
                  }
                }}
              >
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
              </StepsForm.StepForm>
              <StepsForm.StepForm title="Field"></StepsForm.StepForm>
              <StepsForm.StepForm title="Get Code"></StepsForm.StepForm>
            </StepsForm>
          </section>
        </Col>
      </Row>

      {isLoading ? (
        <Spin
          tip="Generating code By AI..."
          size="large"
          className="w-full h-full flex items-center justify-center"
        />
      ) : null}
    </section>
  );
};

export default Playground;
