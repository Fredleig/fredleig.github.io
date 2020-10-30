import { WrappedFieldProps } from "redux-form";

export interface ICKEditorProps extends WrappedFieldProps {
  // в конфиге задаётся конфиг CKEditor используемый язык и т.д (в плагине нет TS)
  //https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html
  config: object;
  data: string;
  placeholder: string;
}
