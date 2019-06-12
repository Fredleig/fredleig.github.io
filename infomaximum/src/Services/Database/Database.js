//! Запросы к базе данных
import React from 'react';
import gql from "graphql-tag";

const Database = (function () {

  //* Получить пользователя
  function getUserDB() {
    let query = gql`
      query getUser($email: String!) {
        User(email: $email){
          id
          email
          password
        }
      }`;

    return query;
  }

  //* Получить токен для авторизации
  function signinUserDB() {
    let query = gql`
      mutation signinUser($email: String!, $password: String!) {
        signinUser(email: {email: $email, password: $password}) {
          token
        }
      }`;
    return query
  }

  return {
    getUserDB,
    signinUserDB
  }
})();

export default Database;