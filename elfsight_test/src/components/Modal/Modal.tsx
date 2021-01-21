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
  const rootElement = useRef<undefined | HTMLDivElement>();
  const { isShowModal, onChangeVisible, className, children } = props;

  useEffect(() => {
    const element = getRootElement();

    if (isShowModal) {
      element.classList.add("root_modal");
      document.body.appendChild(element);
    } else {
      element.remove();
    }

    return () => element.remove();
  }, [isShowModal]);

  const getRootElement = () => {
    if(!rootElement.current) {
      rootElement.current = document.createElement("div");
      return rootElement.current;
    }

    return rootElement.current;
  }

  const handleClickWrapperModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget === e.target && onChangeVisible?.();
  };

  const content = (
    <div
      key="wrapper_modal"
      onClick={handleClickWrapperModal}
      className={`wrapper_modal ${className || ""}`}
    >
      <div>{children}</div>
    </div>
  );

  return ReactDOM.createPortal(content, getRootElement());
};

export default React.memo(Modal);
