import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";

interface IErrorModalProps {
  error: any;
}

const ErrorModal: React.FC<IErrorModalProps> = (props) => {
  const { error } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error && error.status !== 404) {
      setShow(true);
    }
  }, [error]);

  const handleCloseModal = useCallback(() => {
    setShow(false);
  }, []);

  return (
    <Modal
      show={show}
      onHide={handleCloseModal}
      dialogClassName="modal-90w"
      aria-labelledby="example-custom-modal-styling-title"
      centered={true}
    >
      <Modal.Header>
        <Modal.Title>Error {error?.status}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>{error?.statusText}</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function mapStateToProps(state: any) {
  return {
    error: state.getRequestReducer.error,
  };
}

export default connect(mapStateToProps)(ErrorModal);
