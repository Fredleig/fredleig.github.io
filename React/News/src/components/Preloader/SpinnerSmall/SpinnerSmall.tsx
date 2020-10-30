import * as React from "react";
import "./spinnerSmall.sass";
import { ISpinnerSmallProps } from "./SpinnerSmall.type";

const SmallSpinner: React.FC<ISpinnerSmallProps> = (props) => {
  return (
    <div key="spinner-small" className="sk-fading-circle-small-wrap">
      <div className="sk-fading-circle-small">
        <div className="sk-circle sk-circle-1" />
        <div className="sk-circle sk-circle-2" />
        <div className="sk-circle sk-circle-3" />
        <div className="sk-circle sk-circle-4" />
        <div className="sk-circle sk-circle-5" />
        <div className="sk-circle sk-circle-6" />
        <div className="sk-circle sk-circle-7" />
        <div className="sk-circle sk-circle-8" />
        <div className="sk-circle sk-circle-9" />
        <div className="sk-circle sk-circle-10" />
        <div className="sk-circle sk-circle-11" />
        <div className="sk-circle sk-circle-12" />
      </div>
      <div className="spinner-small-children">{props.children}</div>
    </div>
  );
};

export default SmallSpinner;
