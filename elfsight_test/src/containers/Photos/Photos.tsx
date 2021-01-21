import React from "react";
import { connect, DispatchProp } from "react-redux";
import { RootState } from "../../store";
import Preloader from "../../components/Preloader/Preloader";
import { getPhotos } from "../../store/dataRetrieval/dataRetrieval";
import { RouteComponentProps, withRouter } from "react-router";
import "./Photos.sass";
import PhotoModal from "./PhotoModal/PhotoModal";

interface IPhotosProps
  extends RouteComponentProps<{ id_user: string; id_album: string }>,
    DispatchProp<any> {
  data: RootState["dataRetrieval"];
}

interface IPhotosState {
  isShowModal: boolean;
  indexPhoto?: number;
}

class Photos extends React.PureComponent<IPhotosProps, IPhotosState> {
  private readonly changeIsShowModalHandler: OmitThisParameter<
    (index?: number) => void
  > = this.handleChangeIsShowModal.bind(this);

  public state = {
    isShowModal: false,
    indexPhoto: undefined,
  };

  public static mapStateToProps(state: RootState) {
    return {
      data: state.dataRetrieval,
    };
  }

  public componentDidMount(): void {
    const {
      match: { params },
    } = this.props;
    this.props.dispatch(
      getPhotos({ userId: params.id_user, albumId: params.id_album })
    );
  }

  private handleChangeIsShowModal(index?: number) {
    index !== undefined
      ? this.setState({
          isShowModal: !this.state.isShowModal,
          indexPhoto: index,
        })
      : this.setState({ isShowModal: !this.state.isShowModal });
  }

  public render(): React.ReactNode {
    const { data } = this.props;
    const { isShowModal, indexPhoto } = this.state;
    if (!data.loading) {
      return (
        <div className="photos_list">
          {data.data.map((item: any, index: number) => {
            const handleClick = () => this.changeIsShowModalHandler(index);
            return (
              <div onClick={handleClick} className="photos_item" key={item.id}>
                <img
                  loading="lazy"
                  className="photos_thumb"
                  src={item.thumbnailUrl}
                  alt={item.title}
                />
              </div>
            );
          })}
          <PhotoModal
            data={data.data}
            isShowModal={isShowModal}
            indexPhoto={indexPhoto}
            onChangeVisible={this.changeIsShowModalHandler}
          />
        </div>
      );
    }

    return <Preloader />;
  }
}

export default connect(Photos.mapStateToProps)(withRouter(Photos));
