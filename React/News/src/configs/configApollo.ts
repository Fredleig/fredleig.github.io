import { ApolloClient, InMemoryCache } from '@apollo/client';

const token = localStorage.getItem("token")
export const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex",
  cache: new InMemoryCache(),
  headers: {
    authorization: token ? `Bearer ${token}` : "",
  }
});
