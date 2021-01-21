import "./Preloader.sass";
import React from "react";
interface IPreloaderProps {
  className?: string;
}
const Preloader: React.FC<IPreloaderProps> = (props) => {
  return (
    <div
      className={`${props.className ? props.className : "wrapper_preloader"}`}
    >
      <div className="preloader">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default React.memo(Preloader);
