import * as React from "react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
//my import
import ReduxField from "../ReduxField";
import "./ckEditor.sass";
import { ICKEditorProps } from "./CKEditor.type";

class CKEditor extends React.Component<ICKEditorProps> {
  private editor: any;
  private readonly domContainer: React.RefObject<HTMLDivElement>;

  public static defaultProps = {
    config: {},
  };

  constructor(props: ICKEditorProps) {
    super(props);
    this.editor = null;
    this.domContainer = React.createRef();
  }

  public componentDidMount() {
    const { placeholder, input } = this.props;

    DecoupledEditor.create(this.domContainer.current, { placeholder })
      .then((editor) => {
        const addToolbarContainer = () => {
          const toolbar = document.querySelector(".document-editor__toolbar");
          if (toolbar) {
            toolbar.appendChild(editor.ui.view.toolbar.element);
          }
        };

        const onChange = () => {
          editor.model.document.on("change:data", () => {
            input.onChange(editor.getData());
          });
        };
        // @ts-ignore
        window.editor = editor;
        addToolbarContainer();
        onChange();
        console.log("Editor was initialized", editor);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public shouldComponentUpdate(nextProps) {
    if (!this.editor) {
      return false;
    }

    if (this.shouldUpdateContent(nextProps)) {
      this.editor.setData(nextProps.data);
    }

    if ("disabled" in nextProps) {
      this.editor.isReadOnly = nextProps.disabled;
    }

    return false;
  }

  public componentWillUnmount() {
    if (this.editor) {
      this.editor.destroy().then(() => {
        this.editor = null;
      });
    }
  }

  private shouldUpdateContent(nextProps) {
    if (this.props.data === nextProps.data) {
      return false;
    }

    return this.editor.getData() !== nextProps.data;
  }

  public render() {
    return (
      <ReduxField meta={this.props.meta}>
        <div key="document-editor" className="document-editor">
          <div className="document-editor__toolbar" />
          <div className="document-editor__editable-container">
            <div ref={this.domContainer} className="document-editor__editable" />
          </div>
        </div>
      </ReduxField>
    );
  }
}

export default CKEditor;
