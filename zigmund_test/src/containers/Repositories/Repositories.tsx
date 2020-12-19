import React from "react";
import {
  Card,
  Col,
  Container,
  ListGroup,
  Pagination,
  Row,
  Spinner,
} from "react-bootstrap";
import { connect } from "react-redux";
import "./Repositories.sass";

type TRepository = {
  id: number;
  name: string;
  html_url: string;
  forks_count: number;
  watchers_count: number;
  stargazers_count: number;
};

interface IRepositoriesProps {
  data: TRepository[];
  loading: boolean;
  isNotFound: boolean;
}

interface IRepositoriesState {
  startIndex: number;
  endIndex: number;
  activePage: number;
}

class Repositories extends React.PureComponent<
  IRepositoriesProps,
  IRepositoriesState
> {
  private readonly limitRecording: number = 6;

  public state = {
    startIndex: 0,
    endIndex: this.limitRecording,
    activePage: 1,
  };

  public static mapStateToProps(state: any) {
    return {
      data: state.getRequestReducer.data,
      loading: state.getRequestReducer.loading,
      isNotFound: state.getRequestReducer.error?.status === 404,
    };
  }

  public componentDidUpdate(prevProps: Readonly<IRepositoriesProps>): void {
    if (prevProps.loading && !this.props.loading && this.props.data) {
      this.setState({
        startIndex: 0,
        endIndex: this.limitRecording,
        activePage: 1,
      });
    }
  }

  private handlePaginationClick(page: number) {
    return (ev: React.MouseEvent) => {
      ev.preventDefault();
      this.setState({
        startIndex: page * this.limitRecording - this.limitRecording,
        endIndex: page * this.limitRecording,
        activePage: page,
      });
    };
  }

  private getItem(item: TRepository) {
    return (
      <Col key={item.id} md={4}>
        <ListGroup className="repository">
          <ListGroup.Item>
            Name repository:{" "}
            <a href={item.html_url} className="text-primary">
              {item.name}
            </a>
          </ListGroup.Item>
          <ListGroup.Item>
            Forks: <strong>{item.forks_count}</strong>
          </ListGroup.Item>
          <ListGroup.Item>
            Watchers: <strong>{item.watchers_count}</strong>
          </ListGroup.Item>
          <ListGroup.Item>
            Stargazers: <strong>{item.stargazers_count}</strong>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    );
  }

  private getContent(
    data: IRepositoriesProps["data"],
    isNotFound: boolean,
    loading: boolean
  ) {
    if (loading) {
      return (
        <div className="wrapper-spinner">
          <Spinner animation="border" variant="secondary" />
        </div>
      );
    }

    if (isNotFound) {
      return <div>Not Found</div>;
    }

    if (data) {
      const { startIndex, endIndex, activePage } = this.state;
      const repositoryList: JSX.Element[] = [];
      const paginationList: JSX.Element[] = [];

      for (let index = startIndex; index < endIndex; index++) {
        if (data[index]) {
          repositoryList.push(this.getItem(data[index]));
        } else {
          break;
        }
      }

      for (
        let number = 1;
        number <= Math.ceil(data.length / this.limitRecording);
        number++
      ) {
        paginationList.push(
          <Pagination.Item
            key={number}
            disabled={number === activePage}
            onClick={this.handlePaginationClick(number)}
          >
            {number}
          </Pagination.Item>
        );
      }

      return [
        repositoryList,
        <Col key="container-item">
          <Pagination className="pagination-wrapper">
            {paginationList}
          </Pagination>
        </Col>,
      ];
    }
  }

  public render() {
    const { data, isNotFound, loading } = this.props;

    if (data || isNotFound || loading) {
      return (
        <Card>
          <Card.Body>
            <Container>
              <Row>{this.getContent(data, isNotFound, loading)}</Row>
            </Container>
          </Card.Body>
        </Card>
      );
    }

    return null;
  }
}

export default connect(Repositories.mapStateToProps)(Repositories);
