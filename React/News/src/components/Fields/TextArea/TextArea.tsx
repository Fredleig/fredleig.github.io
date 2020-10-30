import * as React from "react";
//my import
import "./textArea.sass";
import ReduxField from "../ReduxField";
import { ITextAreaProps } from "./TextArea.type";

const TextArea: React.FC<ITextAreaProps> = (props) => {
  const { meta, input, placeholder, spellCheck } = props;

  return (
    <ReduxField meta={meta}>
      <textarea {...input} placeholder={placeholder} spellCheck={spellCheck} />
    </ReduxField>
  );
};

export default React.memo(TextArea);
