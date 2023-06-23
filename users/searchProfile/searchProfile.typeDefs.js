import { gql } from "apollo-server-express";

export default gql`
    type returnResult {
        status: Boolean
        message: String
        data: [User]
    }
    type Query {
        searchProfile(keyword: String) : returnResult
    }
`