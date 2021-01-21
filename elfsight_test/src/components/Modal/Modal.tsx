import React, {useEffect, useRef} from "react";
import * as ReactDOM from "react-dom";
import "./Modal.sass";

interface IModalProps {
  isShowModal: boolean;
  onChangeVisible?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<IModalProps> = (props) => {
  const rootElement = useRef(document.createElement("div"));
  const { isShowModal, onChangeVisible, className, children } = props;

  useEffect(() => {
    if (isShowModal) {
      rootElement.current.classList.add("root_modal");
      document.body.appendChild(rootElement.current);
    } else {
      rootElement.current.remove();
    }

    return () => rootElement.current.remove();
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

  return ReactDOM.createPortal(content, rootElement.current);
};

export default React.memo(Modal);
