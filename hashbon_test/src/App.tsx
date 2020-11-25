import React from "react";
import "./App.sass";
import DropDown from "./components/DropDown/DropDown";
import CameraIcon from "@material-ui/icons/Camera";

const getOptions = () => {
  const list = [];
  for (let index = 0; index < 30; index++) {
    list.push({
      key: index,
      icon: <CameraIcon className="icon-currency" />,
      title: `Валюта ${index + 1}`,
      subTitle: "100$",
      subText: "0.79%",
    });
  }
  return list;
};

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="wrapper_drop-down">
        <DropDown options={getOptions()} placeholder="Поиск валют..." />
      </div>
    </div>
  );
};

export default App;
