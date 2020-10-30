import gql from "graphql-tag";

export const createNews = gql`mutation createPost($text: String!, $title: String!) {
    createPost(text: $text, title: $title) {
        id,
        createdAt,
        text,
        title
    }
}`;
