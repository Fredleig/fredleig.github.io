import { WrappedFieldProps } from "redux-form";

export interface ITextAreaProps extends WrappedFieldProps {
  placeholder?: string;
  // Чтобы браузер не проверял орфографию текста в поле
  spellCheck?: boolean;
}
