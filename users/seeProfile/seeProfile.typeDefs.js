import {gql} from "apollo-server";

// Here is the GraphQL Schema
export default gql`
    type Query {
        getUsers: [users]
        getUser(userName: String!) : users
    }
`;