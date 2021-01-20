import React from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import "./App.css";
import Collapse from "./components/Collapse/Collapse";
import { useSelector } from "react-redux";
import { TRootState } from "./index";
import Search from "./containers/Searsh/Searsh";

const App: React.FC = () => {
  const data = useSelector((state: TRootState) => state.data);

  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark">
          <div>
            <a href="/" className="navbar-brand name-program">
              Поиск документов
            </a>
          </div>
        </Navbar>
      </header>
      <main className="main-container">
        <Container fluid={true}>
          <Row>
            <Col xl={5}>
              <Search />
            </Col>
            <Col>
              {data.map((value: any) => (
                <div key={value.id} className="collapse-item">
                  <Collapse title={value.name}>{value.description}</Collapse>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default App;
