import { Form } from "antd";
import React from "react";

const withForm = (Component: React.ComponentType<any>) => {
  const WithForm: React.FC = () => {
    const [form] = Form.useForm();
    return <Component form={form} />;
  };
  return WithForm;
};

export default withForm;
