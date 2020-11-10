import React, { useCallback, useState } from "react";
import { Card } from "antd";
import "./AuthorizationPage.sass";
import Auth from "./Authorization/Auth";
import Register from "./Register/Register";

enum EKeyCard {
  authorization = "authorization",
  register = "register",
}

const tabList = [
  {
    key: EKeyCard.authorization,
    tab: "Авторизация",
  },
  {
    key: EKeyCard.register,
    tab: "Регистрация",
  },
];

const tabContent = {
  [EKeyCard.authorization]: <Auth />,
  [EKeyCard.register]: <Register />,
};

const AuthorizationPage: React.FC = () => {
  const [keyCard, setKeyCard] = useState(EKeyCard.authorization);

  const handleTabChange = useCallback((key: string) => {
    setKeyCard(key as EKeyCard);
  }, []);

  return (
    <div className="wrapper-form">
      <Card
        tabList={tabList}
        onTabChange={handleTabChange}
        className="wrapper-form_authorization"
        bordered={true}
      >
        {tabContent[keyCard]}
      </Card>
    </div>
  );
};

export default AuthorizationPage;
