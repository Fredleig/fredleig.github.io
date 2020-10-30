import * as React from "react";
//my import
import "./navigation.sass";
import { NavLink } from "react-router-dom";
import { INavigationProps } from "./Navigation.type";

const Navigation: React.FC<INavigationProps> = ({ routes, title }) => {
  return (
    <nav key="navigation" className="navigation">
      {routes.map((value) => {
        return value.navMenu ? (
          <div key={value.name} className={title === value.name ? "wrapper-link active" : "wrapper-link"}>
            <NavLink className="navigation-link" to={value.path}>
              {value.name}
            </NavLink>
          </div>
        ) : null;
      })}
    </nav>
  );
};

export default React.memo(Navigation);
