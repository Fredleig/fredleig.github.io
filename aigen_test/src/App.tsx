import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Form, Navbar, Row } from "react-bootstrap";
import "./App.css";
import { ajax } from "./utils/Ajax";
import Collapse from "./components/Collapse/Collapse";

const docUrl = "documents";
const App: React.FC = () => {
  const [data, setData] = useState([]);
  const [validId, setValidId] = useState(true);
  const [params, setParams] = useState<{ id?: string; name?: string }>({
    id: undefined,
    name: undefined,
  });

  useEffect(() => {
    if (validationId(params.id)) {
      ajax
        .get(docUrl, {
          params: {
            id: params.id,
          },
        })
        .then((data) => {
          setData(data.data);
        });
    }
    if (params.name && !params.id) {
      ajax
        .get(docUrl, {
          params: {
            name: params.name,
          },
        })
        .then((data) => {
          setData(data.data);
        });
    }
  }, [params.id, params.name]);

  const validationId = (id?: string) => !isNaN(Number(id)) && id;

  const handleChangeId = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (validationId(ev.target.value)) {
        setParams({ ...params, id: ev.target.value });
      } else {
        if (!ev.target.value) {
          setParams({ ...params, id: undefined });
          setValidId(true);
        } else {
          setValidId(false);
        }
      }
    },
    [params]
  );

  const handleChangeName = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setParams({ ...params, name: ev.target.value });
    },
    [params]
  );

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
              <Form.Label>ID документа</Form.Label>
              <Form.Control onChange={handleChangeId} />
              {validId && (
                <Form.Text className="text-muted">
                  Если поле ID документа, будет заполнено все остальные поля
                  будут проигнорированы
                </Form.Text>
              )}
              {!validId && (
                <Form.Text className="text-muted">
                  ID должен быть числом
                </Form.Text>
              )}
              <Form.Label>Имя документа</Form.Label>
              <Form.Control onChange={handleChangeName} />
              <Form.Text className="text-muted"></Form.Text>
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
