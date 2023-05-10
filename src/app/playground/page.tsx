"use client";
import { useMemo, useRef, useState } from "react";
import { Button, Col, Row, Spin, message } from "antd";
import {
  ProFormSelect,
  ProFormText,
  StepsForm,
} from "@ant-design/pro-components";

import CodeEditor from "./components/CodeEditor";
import FieldList from "./components/FieldList";
import GetCode from "./components/GetCode";
import CodeHighlight from "./components/CodeHighlight";

import { getCodeField, getGenerateCode, getTsCode } from "@/utils/request";

import type { ProFormInstance } from "@ant-design/pro-components";
import type { InteCodeEditorProp } from "./components/CodeEditor";
import type { NextPage } from "next";

export interface InteEditorConfig extends Omit<InteCodeEditorProp, "setCode"> {}

enum StepEnum {
  SETP_1,
  SETP_2,
  SETP_3,
}

const Playground: NextPage = () => {
  const formMapRef = useRef<
    React.MutableRefObject<ProFormInstance<any> | undefined>[]
  >([]);
  const [messageApi, contextHolder] = message.useMessage();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [codeHighlightLanguage, setCodeHighlightLanguage] =
    useState<string>("");
  const [workFlow, setWorkFlow] = useState<{
    [key in StepEnum]?: string;
  }>({});

  const apiKeyMemo = useMemo(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("_apiKey");
    }
    return "";
  }, []);

  const getTsCodeFieldList = async (
    apiKey: string,
    language: string,
    codeType?: string
  ): Promise<boolean> => {
    setLoading(true);
    const { tscode, fieldList } = await getCodeField({
      code,
      apiKey,
      language,
      codeType,
    });

    try {
      const currentFieldList = eval(
        `() => {${fieldList?.replaceAll("\n", "")} \n return fieldLists}`
      )();

      if (typeof window !== undefined && !localStorage.getItem("_apiKey")) {
        localStorage.setItem("_apiKey", apiKey);
      }

      formMapRef?.current?.forEach((formInstanceRef, stepIndex) => {
        if (stepIndex === StepEnum.SETP_2) {
          formInstanceRef.current?.setFieldsValue({
            fieldList: currentFieldList,
          });
        }
      });
      setCodeHighlightLanguage("typescript");

      setCode(tscode?.replace("\n", "") || "");
      setWorkFlow({
        ...workFlow,
        [StepEnum.SETP_1]: code,
        [StepEnum.SETP_2]: tscode?.replace("\n", "")!,
      });
      return true;
    } catch (error) {
      console.log("error: ", error);
      messageApi.error("Failed to parse field list");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex-1 w-full relative overflow-auto">
      {contextHolder}
      <Row className="w-full h-full">
        <Col span={12}>
          {currentStep === StepEnum.SETP_1 ? (
            <CodeEditor
              code={code}
              setCode={setCode}
              language={formMapRef.current[
                StepEnum.SETP_1
              ]?.current?.getFieldValue("language")}
            />
          ) : (
            <CodeHighlight language={codeHighlightLanguage} code={code} />
          )}
        </Col>
        <Col span={12}>
          <section className="w-full h-full bg-black/50 p-4 box-border">
            <StepsForm
              formMapRef={formMapRef}
              current={currentStep}
              onCurrentChange={(step) => {
                setCurrentStep(step);
              }}
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
                      <Button
                        key="pre1"
                        onClick={() => {
                          setCode(workFlow[StepEnum.SETP_1] || "");
                          setCodeHighlightLanguage("typescript");
                          props.onPre?.();
                        }}
                      >
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
                      <Button
                        key="pre2"
                        onClick={() => {
                          setCode(workFlow[StepEnum.SETP_2] || "");
                          setCodeHighlightLanguage("typescript");
                          props.onPre?.();
                        }}
                      >
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
                  language: "sql",
                  key: apiKeyMemo,
                }}
                onFinish={async (value) => {
                  if (!code) {
                    messageApi.error("Please input some code");
                    return false;
                  }
                  return await getTsCodeFieldList(
                    value.key,
                    value.language,
                    value.codeType
                  );
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
                  rules={[
                    {
                      required: true,
                      message: "Language is required",
                    },
                  ]}
                  placeholder="Select language"
                  name="language"
                  label="Language"
                  options={[
                    { label: "TypeScript", value: "typeScript" },
                    { label: "Prisma", value: "prisma" },
                    { label: "JavaScript", value: "javaScript" },
                    { label: "Java", value: "java" },
                    { label: "Go", value: "go" },
                    { label: "Python", value: "python" },
                    { label: "SQL Language", value: "sql" },
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
                  const API_KEY = apiKeyMemo;
                  const { tscode } = await getTsCode(val.fieldList, API_KEY!);
                  setCode(tscode || "");
                  setLoading(false);
                  setWorkFlow({
                    ...workFlow,
                    [StepEnum.SETP_2]: tscode,
                  });
                  return true;
                }}
              >
                <FieldList />
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
                  const API_KEY = apiKeyMemo;

                  const data = await getGenerateCode(
                    {
                      code,
                      framework: val.framework,
                      useTs: val.useTs,
                      componetLib: val.componetLib,
                      component: val.component,
                      mockData: val.mockData,
                    },
                    API_KEY!
                  );
                  setLoading(false);
                  setCode(data?.code || "");
                  setCodeHighlightLanguage(
                    formMapRef.current[StepEnum.SETP_3]?.current?.getFieldValue(
                      "framework"
                    )
                  );
                  setWorkFlow({
                    ...workFlow,
                    [StepEnum.SETP_3]: data?.code,
                  });
                  return true;
                }}
              >
                <GetCode />
              </StepsForm.StepForm>
            </StepsForm>
          </section>
        </Col>
      </Row>
      {isLoading ? (
        <Spin
          tip="Generating Code By AI..."
          size="large"
          className="!absolute top-0 left-0 w-full h-full bg-black/20 !flex flex-col items-center justify-center"
        />
      ) : null}
    </section>
  );
};

export default Playground;
