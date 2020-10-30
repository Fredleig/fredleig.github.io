import { WrappedFieldMetaProps } from "redux-form";
import * as React from "react";

export interface IReduxFieldProps {
  meta: WrappedFieldMetaProps;
  children: React.ReactNode;
}
