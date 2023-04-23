"use client";
import { Button, Col, ConfigProvider, Row, message } from "antd";
import CodeEditor from "./components/CodeEditor";
import theme from "../utils/theme";
import {
  ProFormSelect,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";
import { useState } from "react";

const Playground = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [code, setCode] = useState<string>("");
  return (
    <section className="flex-1 w-full">
      <ConfigProvider theme={theme}>
        {contextHolder}
        <Row className="w-full h-full">
          <Col span={14}>
            <CodeEditor code={code} setCode={setCode} />
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
                  onFinish={async (value) => {
                    if (!code) {
                      messageApi.error("Please input some code");
                      return false;
                    }
                    return true;
                  }}
                >
                  <ProFormSelect
                    placeholder="Select language"
                    name="language"
                    label="Language"
                    options={[
                      { label: "TypeScript", value: "TypeScript" },
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
                      { label: "Prisma", value: "Prisma" },
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
      </ConfigProvider>
    </section>
  );
};

export default Playground;
