import * as React from "react";
import { Align, Justify } from "react-grid-system";

export interface IModalWindowProps {
  onVisible: () => void,
  align?: Align,
  justify?: Justify,
  style?: object
  children?: React.ReactNode
}
