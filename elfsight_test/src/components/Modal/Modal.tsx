import React, { useEffect } from "react";
import * as ReactDOM from "react-dom";
import "./Modal.sass";

interface IModalProps {
  isShowModal: boolean;
  onChangeVisible?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<IModalProps> = (props) => {
  const rootElement = document.createElement("div");
  const { isShowModal, onChangeVisible, className, children } = props;

  useEffect(() => {
    if (isShowModal) {
      rootElement.classList.add("root_modal");
      document.body.appendChild(rootElement);
    } else {
      rootElement.remove();
    }

    return () => rootElement.remove();
  }, [isShowModal, rootElement]);

  const handleClickWrapperModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget === e.target && onChangeVisible?.();
  };

  const content = (
    <div
      onClick={handleClickWrapperModal}
      className={`wrapper_modal ${className || ""}`}
    >
      <div>{children}</div>
    </div>
  );

  return ReactDOM.createPortal(content, rootElement);
};

export default React.memo(Modal);
