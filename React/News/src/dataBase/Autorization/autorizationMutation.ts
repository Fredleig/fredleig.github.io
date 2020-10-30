import gql from "graphql-tag";

export const autorization = gql`mutation signinUser($email: String!, $password: String!) {
    signinUser(email: {email: $email, password: $password}) {
        token,
        user {
            id,
            name,
            password
        }
    }
}`;
