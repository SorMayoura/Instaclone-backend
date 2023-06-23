import { gql } from "apollo-server-express";

export default gql`
    type loginResult {
        status: Boolean
        message: String
        token: String
    }
    type Mutation {
        login (
            userName: String!,
            password: String!
        ): loginResult
    }
`