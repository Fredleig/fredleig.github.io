import * as React from "react";
import SpinnerBig from "./SpinnerBig/SpinnerBig";
import SpinnerSmall from "./SpinnerSmall/SpinnerSmall";
import { IPreloaderProps } from "./Preloader.type";

export enum ESizePreloader {
  big = "big",
  small = "small",
}

const Preloader: React.FC<IPreloaderProps> = (props) => {
  const { size, ...rest } = props;

  if (!size || size === ESizePreloader.big) {
    return <SpinnerBig />;
  }

  if (size === ESizePreloader.small) {
    return <SpinnerSmall {...rest} />;
  }
};

export default React.memo(Preloader);
