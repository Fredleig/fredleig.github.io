import { Form, Input } from "antd";
import React from "react";
import { Rule } from "antd/es/form";

interface IEditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputRules?: Rule[];
  record: any;
  children: React.ReactNode;
}

const EditableCell: React.FC<IEditableCellProps> = (props) => {
  const { editing, dataIndex, title, inputRules, record, children, ...restProps } = props;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item rules={inputRules}style={{ margin: 0 }} name={dataIndex}>
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default React.memo(EditableCell);
