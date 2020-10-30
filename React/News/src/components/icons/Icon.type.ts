import * as React from "react";
import { EIdIcon } from "./Icons";

export interface IconProps {
  children?: React.ReactNode;
  className: string;
  idIcon: EIdIcon;
  onClick?: () => void;
}
