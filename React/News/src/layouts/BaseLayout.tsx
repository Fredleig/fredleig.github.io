import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { renderRoutes } from "react-router-config";
import { Container } from "react-grid-system";
// my import
import "./baseLayout.sass";
import Logo from "../containers/Aside/Logo/Logo";
import Navigation from "../containers/Aside/Navigation/Navigation";
import { getTitle } from "../helpers/routesHelpers";
import UserMenu from "../containers/UserMenu/UserMenu";
import { IBaseLayoutProps } from "./BaseLayout.type";

const containerStyle = {
  boxSizing: "content-box",
} as const;

const BaseLayout: React.FC<IBaseLayoutProps> = (props) => {
  const { route: { routes }, location } = props;
  const [headerClassName, setHeaderClassName] = useState(null);

  useEffect(() => {
    function handleScroll(e) {
      // больше высоты верхней панельки
      if (e.currentTarget.pageYOffset > 60) {
        setHeaderClassName("header-fixed");
      } else {
        setHeaderClassName("header-relative");
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const title = useMemo(() => {
    return getTitle(location, routes);
  }, [location, routes])

  return (
    <>
      <header key="home-header" className={headerClassName}>
        <UserMenu routes={routes} title={title} />
      </header>
      <Container style={containerStyle} key="base-layout-container">
        <div className="wrapper-layout">
          <aside>
            <Logo />
            <Navigation routes={routes} title={title} />
          </aside>
          <main>{renderRoutes(routes)}</main>
        </div>
      </Container>
    </>
  );
};

export default React.memo(BaseLayout);
