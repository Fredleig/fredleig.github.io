import * as React from "react";
import "./spinnerBig.sass";

const Spinner: React.FC = () => {
  return (
    <div key="spinner-big" className="wrapper-spinner-big">
      <div className="sk-fading-circle-big">
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
    </div>
  );
};

export default Spinner;
