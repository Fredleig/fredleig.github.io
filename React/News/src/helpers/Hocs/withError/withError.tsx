import * as React from "react";
import ModalWindow from "../../../components/ModalWindow/ModalWindow";
import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { IWithErrorProps } from "./withError.type";
import "./withError.sass";

const withError = (Component: React.ComponentType | React.NamedExoticComponent) => {
  const WithError: React.FC<IWithErrorProps> = (props) => {
    const { error, ...rest } = props;
    const [isVisibleWindowError, setIsVisibleWindowError] = useState(false);

    useEffect(() => {
      error && setIsVisibleWindowError(true);
    }, [error]);

    const handleChangeIsVisibleModal = useCallback(() => {
      setIsVisibleWindowError(!isVisibleWindowError);
    }, [isVisibleWindowError]);

    return (
      <>
        <Component {...rest} />
        {isVisibleWindowError && (
          <ModalWindow onVisible={handleChangeIsVisibleModal} justify="center" align="center">
            <div className="error-modal_wrapper">Error: {error}</div>
          </ModalWindow>
        )}
      </>
    );
  };

  const mapStateToProps = (state) => ({
    error: state.queryReducer.error?.message,
  });

  return connect(mapStateToProps)(WithError);
};

export default withError;
