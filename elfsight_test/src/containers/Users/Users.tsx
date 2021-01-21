import React, { useEffect } from "react";
import { Col, Container, Row } from "react-grid-system";
import { NavLink } from "react-router-dom";
import "./Users.sass";
import User from "../../components/User/User";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/dataRetrieval/dataRetrieval";
import { noAvatarSrc } from "../../utils/helpers";
import { RootState } from "../../store";
import Preloader from "../../components/Preloader/Preloader";

const Users: React.FC = () => {
  const usersData = useSelector((state: RootState) => state.dataRetrieval);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (!usersData.loading) {
    return (
      <Container>
        <Row>
          {usersData.data.map((value: any) => (
            <Col
              key={value.id}
              xl={3}
              md={4}
              lg={4}
              sm={6}
              className="wrapper_card-user"
            >
              <NavLink
                className="card-user_link"
                to={`/users/${value.id}/albums`}
              >
                <User image={noAvatarSrc}>{value.username}</User>
              </NavLink>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  return <Preloader />;
};

export default Users;
