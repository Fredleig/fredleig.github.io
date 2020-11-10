import "./Header.sass";
import React, { useCallback } from "react";
import { ExportOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";
import { root } from "../../utils/paths/paths";

const Header: React.FC<any> = (props) => {
  const history = useHistory();

  const handleExit = useCallback(() => {
    localStorage.clear();
    history.push(root);
  }, [history]);

  return (
    <header>
      <div className="wrapper_left-Panel">
        <h1 className="text">Контакты</h1>
      </div>
      <div className="wrapper_right-panel">
        <h3 className="text user-name">{localStorage.getItem("userName")}</h3>
        <ExportOutlined className="exit-icon" onClick={handleExit} />
      </div>
    </header>
  );
};

export default Header;
