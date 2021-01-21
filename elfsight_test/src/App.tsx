import "./App.sass";
import React from "react";
import { NavLink } from "react-router-dom";
import { rootPath, routes } from "./utils/routes";
import BreadCrumbs from "./containers/BreadCrumbs/BreadCrumbs";
import { Route, Switch } from "react-router";
import Error from "./containers/Error/Error";

const App: React.FC = () => {
  return (
    <>
      <header>
        <NavLink className="site-name" to={rootPath}>
          Photo Gallery
        </NavLink>
      </header>
      <BreadCrumbs />
      <Switch>
        {routes.map((item) => (
          <Route
            key={item.key}
            exact={!!item.exact}
            path={item.path}
            component={item.component}
          />
        ))}
      </Switch>
      <Error/>
    </>
  );
};

export default App;
