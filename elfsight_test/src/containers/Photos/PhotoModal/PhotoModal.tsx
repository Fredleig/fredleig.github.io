import React from "react";
import Modal from "../../../components/Modal/Modal";
import "./PhotoModal.sass";
import Preloader from "../../../components/Preloader/Preloader";

interface IPhotosModalProps {
  data: any;
  indexPhoto?: number;
  isShowModal: boolean;
  onChangeVisible: () => void;
}

interface IPhotosModalState {
  indexImg?: number;
}

class PhotoModal extends React.Component<IPhotosModalProps, IPhotosModalState> {
  private readonly clickIncrementHandler: OmitThisParameter<
    () => void
  > = this.handleClickIncrement.bind(this);
  private readonly clickDecreaseHandler: OmitThisParameter<
    () => void
  > = this.handleClickDecrease.bind(this);

  public state = {
    indexImg: NaN,
  };

  public componentDidUpdate(
    prevProps: Readonly<IPhotosModalProps>,
    prevState: Readonly<IPhotosModalState>
  ): void {
    if (prevProps.indexPhoto !== this.props.indexPhoto) {
      this.setState({ indexImg: this.props.indexPhoto });
    }
  }

  public shouldComponentUpdate(
    nextProps: Readonly<IPhotosModalProps>,
    nextState: Readonly<IPhotosModalState>
  ): boolean {
    return (
      this.state.indexImg !== nextState.indexImg ||
      nextProps.isShowModal !== this.props.isShowModal
    );
  }

  private handleClickIncrement() {
    this.setState({ indexImg: this.state.indexImg + 1 });
  }

  private handleClickDecrease() {
    this.setState({ indexImg: this.state.indexImg - 1 });
  }

  public render(): React.ReactNode {
    const { data, isShowModal, onChangeVisible } = this.props;
    const { indexImg } = this.state;

    if (!isNaN(indexImg)) {
      const photo = data[indexImg];
      return (
        <Modal
          key="modal-image"
          isShowModal={isShowModal}
          className="photo_modal"
          onChangeVisible={onChangeVisible}
        >
          <div className="wrapper_photo_modal">
            <div className="wrapper_photo">
              <img src={photo.url} alt={photo.title} />
              <Preloader className="wrapper_preloader-photo" />
              {data.length - 1 !== indexImg && (
                <button
                  onClick={this.clickIncrementHandler}
                  className="photo_button photo_button-plus"
                >
                  {">"}
                </button>
              )}
              {indexImg !== 0 && (
                <button
                  onClick={this.clickDecreaseHandler}
                  className="photo_button photo_button-minus"
                >
                  {"<"}
                </button>
              )}
            </div>
            <div className="photo_title">{photo.title}</div>
          </div>
        </Modal>
      );
    }

    return null;
  }
}

export default PhotoModal;
