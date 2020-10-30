import * as React from "react";
//my import
import "./errorMessage.sass";
import { IErrorMessageProps } from "./ErrorMessage.type";

const ErrorMessage: React.FC<IErrorMessageProps> = ({ error }) =>
  error ? <div className="error-message">{error}</div> : null;

export default React.memo(ErrorMessage);
