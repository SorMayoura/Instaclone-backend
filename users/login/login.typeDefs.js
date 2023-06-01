import { gql } from "apollo-server";

export default 
    gql`
    type loginResult {
        loginOk: Boolean!
        token: String
        message: String
    }
    type Mutation {
        login(
            userName: String! 
            password: String!): loginResult!
    } 
    `;