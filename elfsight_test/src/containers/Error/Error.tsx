import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./Error.sass";

const Error: React.FC = () => {
  const error = useSelector((state: RootState) => state.dataRetrieval.error);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    error && setIsShowModal(true);
  }, [error]);

  const handleChangeIsShowModal = () => setIsShowModal(!isShowModal);

  return (
    <Modal onChangeVisible={handleChangeIsShowModal} isShowModal={isShowModal}>
      <div className="wrapper-error">
        <div className="error-content">{error}</div>
        <div className="error-modal_footer" onClick={handleChangeIsShowModal}>
          <div>Close</div>
        </div>
      </div>
    </Modal>
  );
};

export default Error;
