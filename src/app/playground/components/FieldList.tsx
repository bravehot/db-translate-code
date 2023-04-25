"use client";
import { Button, Col, Empty, Row, message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
  ProFormList,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components";

import type { NextPage } from "next";
import type { InteField } from "@/app/@types/playground";
const list = [
  { name: "id", type: "number", required: true },
  { name: "name", type: "string", required: true },
  { name: "avatar", type: "string", required: false },
  { name: "wallet", type: "string", required: true },
  { name: "email", type: "string", required: true },
  { name: "balance", type: "number", required: true },
  { name: "conversationId", type: "string", required: false },
  { name: "createdAt", type: "Date", required: true },
  { name: "updatedAt", type: "Date", required: true },
];

interface InteFieldListProp {
  fieldList: InteField[];
}
const FieldList: NextPage<InteFieldListProp> = ({ fieldList }) => {
  fieldList = list;
  return (
    <>
      {fieldList.length ? (
        <ProFormList
          style={{ width: "100%" }}
          name="fieldList"
          min={1}
          copyIconProps={false}
          creatorButtonProps={{ creatorButtonText: "Create a new line" }}
          deleteIconProps={{
            Icon: CloseCircleOutlined,
            tooltipText: "Delete this line",
          }}
          initialValue={fieldList}
        >
          <Row className="w-full" gutter={24}>
            <Col span={10}>
              <ProFormText
                name="name"
                label="FieldName"
                rules={[{ message: "FieldName is required", required: true }]}
              />
            </Col>
            <Col span={9}>
              <ProFormText
                name="type"
                label="FieldType"
                rules={[{ message: "FieldName is required", required: true }]}
              />
            </Col>
            <Col span={5}>
              <ProFormSwitch width="xs" name="required" label="Required" />
            </Col>
          </Row>
        </ProFormList>
      ) : (
        <Empty className="my-5" />
      )}
    </>
  );
};

export default FieldList;
