import * as React from "react";
import "./pageNotFound.sass";
import { withRouter } from "react-router";
import { IPageNotFoundProps } from "./PageNotFound.type";

const PageNotFound: React.FC<IPageNotFoundProps> = ({ location }) => {
  return (
    <div className="error-not-page-wrapper">
      <div className="container-error-not-page">
        <h2 className="title-page-not-found">
          <span>404</span> Page not found
        </h2>
        <p className="content-page-not-found">
          The page at this address does not exist: <span>{location.state.currentPath}</span>
        </p>
      </div>
    </div>
  );
};

export default withRouter(React.memo(PageNotFound));
