import { WrappedFieldProps } from "redux-form";
import { EIdIcon } from "../../icons/Icons";

export interface IInputFieldProps extends WrappedFieldProps {
  placeholder?: string;
  type: "text" | "tel" | "password" | "email" | "number" | "range" | "date" | "color" | "url";
  disabled?: boolean;
  label?: string;
  idIcon?: EIdIcon;
  // Чтобы браузер не проверял орфографию текста в поле
  spellCheck?: boolean;
}
