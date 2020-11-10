import React, { useCallback } from "react";
import { Button, Form, Input, message, Modal } from "antd";
import Ajax from "../../../utils/Ajax/Ajax";
import {
  minNumSymbolRule,
  repeatPasswordRule,
  requiredRule,
} from "../../../utils/Validations/validations";

enum EFieldsName {
  username = "username",
  password = "password",
  repeatPassword = "repeatPassword",
}

const Register: React.FC = () => {
  const handleSubmit = useCallback((fieldValues) => {
    Ajax.GET("users", `name=${fieldValues[EFieldsName.username]}`)
      .then((data) => {
        if (data.length === 0) {
          Ajax.POST("users", {
            name: fieldValues[EFieldsName.username],
            password: fieldValues[EFieldsName.password],
          }).then(() => message.success("Пользователь создан"));
        } else {
          message.error("Такое имя существует");
        }
      })
      .catch((error: string) => Modal.error({ title: "Error", content: error.toString() }));
  }, []);

  return (
    <Form name="register" layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Имя пользователя" name={EFieldsName.username} rules={[requiredRule]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name={EFieldsName.password}
        hasFeedback={true}
        rules={[requiredRule, minNumSymbolRule(4)]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Повторить пароль"
        name={EFieldsName.repeatPassword}
        hasFeedback={true}
        rules={[requiredRule, repeatPasswordRule(EFieldsName.password)]}
      >
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

export default Register;
