import gql from "graphql-tag";

export const addUser = gql`mutation createUser($name: String!, $authProvider: AuthProviderSignupData!) {
    createUser(name: $name, authProvider: $authProvider) {
        id,
        name,
        createdAt
    }
}`;
