import React, { useCallback } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import Ajax from "../../../utils/Ajax/Ajax";
import { requiredRule } from "../../../utils/Validations/validations";
import { useHistory } from "react-router";
import { contacts } from "../../../utils/paths/paths";

enum EFieldsName {
  userName = "userName",
  password = "password",
}

const Auth: React.FC = (props) => {
  const history = useHistory();
  const handleSubmit = useCallback(
    (fieldValues) => {
      Ajax.GET(
        "users",
        `name=${fieldValues[EFieldsName.userName]}&password=${fieldValues[EFieldsName.password]}`
      )
        .then((data) => {
          if (data.length !== 0) {
            localStorage.setItem("userName", fieldValues[EFieldsName.userName]);
          } else {
            message.error("Не правильное имя пользователя или пароль");
          }
        })
          .catch((error: string) => {
            Modal.error({title: "Error", content: error.toString()})
            return Promise.reject()
          })
          .then(() => history.push(contacts));
    },
    [history]
  );

  return (
    <Form name="auth" layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Имя пользователя" name={EFieldsName.userName} rules={[requiredRule]}>
        <Input />
      </Form.Item>
      <Form.Item label="Пароль" name={EFieldsName.password} rules={[requiredRule]}>
        <Input.Password />
      </Form.Item>
      <div className="wrapper-button">
        <Button htmlType="submit" type="primary" className="submit-button">
          Отправить
        </Button>
      </div>
    </Form>
  );
};

export default Auth;
