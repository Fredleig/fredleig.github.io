import * as React from "react";
import * as ReactDOM from "react-dom";
import { Container, Row } from "react-grid-system";
// my import
import "./modalWindow.sass";
import Icon, { EIdIcon } from "../icons/Icons";
import { IModalWindowProps } from "./ModalWindow.type";

const marginTop = 15;
const containerStyle = {
  margin: `${marginTop}% auto`,
  background: "#ffffff",
};

const rowStyle = {
  padding: "30px 30px 60px",
  minHeight: "350px",
};

class ModalWindow extends React.PureComponent<IModalWindowProps> {
  private readonly modalRoot: HTMLDivElement = document.createElement("div");

  public componentDidMount(): void {
    this.modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(this.modalRoot);
    document.body.classList.add("body-modal-open");
  }

  public componentWillUnmount(): void {
    document.body.removeAttribute("class");
    document.body.removeChild(this.modalRoot);
  }

  private get modal(): React.ReactNode {
    const { onVisible, style, justify, align, children } = this.props;

    return (
      <div key="modal-background" className="modal-background">
        <div key="modal-wrapper">
          <Container key="modal-container" style={containerStyle} className="modal-container">
            <div className="header-modal">
              <div className="button-close">
                <Icon className="button-icon" onClick={onVisible} idIcon={EIdIcon.buttonClose} />
              </div>
            </div>
            <Row style={{ ...rowStyle, ...style }} justify={justify} align={align}>
              {children}
            </Row>
          </Container>
        </div>
      </div>
    );
  }

  public render(): React.ReactNode {
    return ReactDOM.createPortal(this.modal, this.modalRoot);
  }
}

export default ModalWindow;

