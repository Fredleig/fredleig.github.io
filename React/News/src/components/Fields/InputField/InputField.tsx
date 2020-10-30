import * as React from "react";
//my import
import Icon from "../../icons/Icons";
import ReduxField from "../ReduxField";
import "./inputField.sass";
import { IInputFieldProps } from "./InputField.type";

const InputField: React.FC<IInputFieldProps> = (props) => {
  const { meta, input, placeholder, type, disabled, idIcon, label, spellCheck } = props;

  return (
    <ReduxField meta={meta}>
      <div key="input-wrap" className="input-wrap">
        <div className="input-icon-wrap">
          {idIcon && (
            <div className="input-icon-circle">
              <Icon idIcon={idIcon} className="input-icon" />
            </div>
          )}
          {label && <div className="input-label">{label}</div>}
        </div>
        <input
          {...input}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          spellCheck={spellCheck}
        />
      </div>
    </ReduxField>
  );
};

export default React.memo(InputField);

