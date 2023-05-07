"use client";
import { Col, Row } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
  ProFormList,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components";

import type { NextPage } from "next";

const FieldList: NextPage = () => {
  return (
    <ProFormList
      style={{ width: "100%" }}
      name={["fieldList"]}
      min={1}
      copyIconProps={false}
      creatorButtonProps={{ creatorButtonText: "Create a new line" }}
      deleteIconProps={{
        Icon: CloseCircleOutlined,
        tooltipText: "Delete this line",
      }}
    >
      <Row className="w-full !m-0" gutter={24}>
        <Col span={6}>
          <ProFormText
            name="name"
            label="Field Name"
            rules={[{ message: "FieldName is required", required: true }]}
          />
        </Col>
        <Col span={6}>
          <ProFormText
            name="type"
            label="Field Type"
            rules={[{ message: "FieldName is required", required: true }]}
          />
        </Col>
        <Col span={7}>
          <ProFormText
            name="labelName"
            label="Label Name"
            rules={[{ message: "FieldName is required", required: true }]}
          />
        </Col>
        <Col span={4.5}>
          <ProFormSwitch width="xs" name="required" label="Required" />
        </Col>
      </Row>
    </ProFormList>
  );
};

export default FieldList;
