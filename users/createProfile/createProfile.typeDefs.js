import {gql} from "apollo-server";

// Here is the GraphQL Schema
export default gql`
    type createUserResult {
        createOk: Boolean 
        message: String
    }
    type Mutation {       
        createUser(firstName: String!, LastName: String, email: String!, password: String!, userName: String!): users
    }
`;