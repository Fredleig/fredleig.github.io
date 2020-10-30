import gql from "graphql-tag";

// Получить одну новость
export const addComment = gql`mutation addComent($postId: ID, $text: String!) {
    createComment(postId: $postId, text: $text) {
        text
    }
}`;
