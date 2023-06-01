import {gql} from "apollo-server";

// Here is the GraphQL Schema
export default gql`
    type users {
        id: Int
        firstName: String
        LastName:  String
        email:     String
        password: String
        userName:  String
        createdAt: String
        updatedAt: String
    }
`;