import React from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import "./App.sass";
import ImageGroup from "./components/ImageGroup/ImageGroup";
import ImageItem from "./components/ImageItem/ImageItem";
import { getData } from "./services/getData";

interface IAppState {
  inputValue: string;
  isLoading: boolean;
  isAlertDataEmpty: boolean;
  isAlertInputData: boolean;
  isAlertError: boolean;
  images: { url: string; tag: string }[];
  uniqueTags: string[];
}

class App extends React.PureComponent<unknown, IAppState> {
  private readonly downloadHandler: OmitThisParameter<() => void>;
  private readonly inputChangeHandler: OmitThisParameter<
    (ev: React.SyntheticEvent<HTMLInputElement>) => void
  >;
  private readonly clearHandler: OmitThisParameter<() => void>;
  private readonly groupHandler: OmitThisParameter<() => void>;

  constructor(props: unknown) {
    super(props);
    this.downloadHandler = this.handleDownload.bind(this);
    this.inputChangeHandler = this.handleInputChange.bind(this);
    this.clearHandler = this.handleClear.bind(this);
    this.groupHandler = this.handleGroup.bind(this);
    this.state = {
      inputValue: "",
      images: [],
      uniqueTags: [],
      isLoading: false,
      isAlertDataEmpty: false,
      isAlertInputData: false,
      isAlertError: false,
    };
  }

  private handleDownload() {
    const { inputValue, images } = this.state;
    if (inputValue) {
      this.setState({ isLoading: true, isAlertInputData: false });

      getData(inputValue)
        .then((result) => {
          if (result.data.length === 0) {
            this.setState({ isAlertDataEmpty: true, isLoading: false });
            return;
          } else {
            this.setState({ isAlertDataEmpty: false });
          }

          images.push({ url: result.data.image_url, tag: inputValue });
          this.setState({ ...this.state, isLoading: false });
        })
        .then(() => {
          if (this.state.uniqueTags.length !== 0) {
            this.getUniqueTags();
          }
        })
        .catch((err) => this.setState({ isAlertError: true, isLoading: false }));
    } else {
      this.setState({ isAlertInputData: true });
    }
  }

  private getUniqueTags() {
    const tags = this.state.images.map((item) => item.tag);
    this.setState({ uniqueTags: Array.from(new Set(tags)).sort() });
  }

  private handleInputChange(ev: React.SyntheticEvent<HTMLInputElement>) {
    this.setState({ inputValue: ev.currentTarget.value });
  }

  private handleClear() {
    this.setState({ images: [], uniqueTags: [] });
  }

  private handleGroup() {
    if (this.state.uniqueTags.length !== 0) {
      this.setState({ uniqueTags: [] });
      return;
    }

    this.getUniqueTags();
  }

  public render(): React.ReactNode {
    const {
      inputValue,
      images,
      isLoading,
      isAlertDataEmpty,
      isAlertInputData,
      isAlertError,
      uniqueTags,
    } = this.state;

    return (
      <Container>
        <Row>
          <Col>
            <div className="top-panel">
              <input
                type="text"
                name="search-tag"
                value={inputValue}
                onChange={this.inputChangeHandler}
                className="top-panel_input"
              />
              <Button
                variant="primary"
                className="button"
                onClick={this.downloadHandler}
                disabled={isLoading}
              >
                {isLoading ? <>Загрузка...</> : <>Загрузить</>}
              </Button>
              <Button variant="secondary" className="button" onClick={this.clearHandler}>
                Очистить
              </Button>
              <Button variant="success" className="button" onClick={this.groupHandler}>
                {uniqueTags.length === 0 ? <>Группировать</> : <>Разгруппировать</>}
              </Button>
            </div>
          </Col>
        </Row>
        {isAlertDataEmpty && (
          <Row className="wrapper_row-alert">
            <Alert variant="warning">По тегу ничего не найдено!</Alert>
          </Row>
        )}
        {isAlertInputData && (
          <Row className="wrapper_row-alert">
            <Alert variant="info">Заполните поле 'тег'!</Alert>
          </Row>
        )}
        {isAlertError && (
          <Row className="wrapper_row-alert">
            <Alert variant="danger">Произошла http ошибка!</Alert>
          </Row>
        )}
        {uniqueTags.length === 0 && (
          <Row>
            {images.map((item, index) => (
              <ImageItem key={index} urlImage={item.url} />
            ))}
          </Row>
        )}
        {uniqueTags.map((tagName) => (
          <ImageGroup key={tagName} images={images} tagName={tagName} />
        ))}
      </Container>
    );
  }
}

export default App;
