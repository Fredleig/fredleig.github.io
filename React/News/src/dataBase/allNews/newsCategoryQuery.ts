import gql from "graphql-tag";

// Все новости
export const getPosts = gql`query allPosts($first: Int, $category: String) {
    allPosts(first: $first, filter: { title: $category }, orderBy: createdAt_DESC) {
        id,
        title,
        text,
        updatedAt,
        user {
            id,
            name
        }
    }
}`;

// Колличество новостей
export const getCountPosts = gql`query _allPostsMeta($category: String) {
    _allPostsMeta(filter: { title: $category }) {
        count
    }
}`;
