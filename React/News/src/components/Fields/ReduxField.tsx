import * as React from "react";
import "./reduxField.sass";
import { IReduxFieldProps } from "./ReduxField.type";

const ReduxField: React.FC<IReduxFieldProps> = (props) => {
  const {
    meta: { touched, error },
    children,
  } = props;

  return (
    <div key="field-wrapper" className="field-wrapper">
      {children}
      {touched && error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default React.memo(ReduxField);
