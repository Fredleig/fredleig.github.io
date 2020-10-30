import * as React from "react";
import { NavLink } from "react-router-dom";
//my import
import { imageDirectory } from "../../../helpers/configsHelper";
import "./logo.sass";
import { rootAllNews } from "../../../routes/path";

const Logo: React.FC = () => {
  return (
    <div key="wrapper-logo" className="wrapper-logo">
      <NavLink className="logo" to={rootAllNews}>
        <img src={`${imageDirectory}/logo.jpg`} alt="logo" />
        News
      </NavLink>
    </div>
  );
};

export default Logo;
