import * as React from "react";
import { imageDirectory } from "../../helpers/configsHelper";
import { IconProps } from "./Icon.type";

export enum EIdIcon {
  password = "password",
  showPassword = "showPassword",
  scripts = "scripts",
  time = "time",
  update = "update",
  user = "user",
  warning = "warning",
  averageTime = "averageTime",
  data = "data",
  menu = "menu",
  buttonClose = "buttonClose",
  email = "email",
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, children, idIcon, ...rest } = props;
  return (
    <>
      <svg className={className} {...rest}>
        <use xlinkHref={`${imageDirectory}/icons/sprite.svg#${idIcon}`} />
      </svg>
      {children}
    </>
  );
};

export default React.memo(Icon);
