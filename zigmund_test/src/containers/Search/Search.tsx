import React, { useCallback } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./Search.sass";
import { actionGetRequest } from "../../store/RequestGet/RequestGet";

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const handleOnChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        actionGetRequest({
          url: `/orgs/${ev.target.value}/repos`
        })
      );
    },
    [dispatch]
  );

  return (
    <Card className="text-left card-search">
      <Card.Body>
        <Card.Title>Search Company</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Enter a company to fetch a repositories
        </Card.Subtitle>
        <Form.Control
          type="text"
          placeholder="Company..."
          onChange={handleOnChange}
        />
      </Card.Body>
    </Card>
  );
};

export default Search;
