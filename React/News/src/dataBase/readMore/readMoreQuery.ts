import gql from "graphql-tag";

// Получить одну новость
export const getOneNews = gql`query Post($id: ID, $commentsFirst: Int) {
    Post(id: $id) {
        id,
        title,
        text,
        updatedAt,
        _commentsMeta {
            count
        }
        user {
            id,
            name
        },
        comments(first: $commentsFirst, orderBy: createdAt_DESC) {
            id,
            updatedAt,
            user {
                id,
                name
            },
            text,
        }
    }
}`;

