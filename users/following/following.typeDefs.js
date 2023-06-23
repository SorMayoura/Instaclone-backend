import { gql } from "apollo-server-express";

export default gql`
    type followingResult {
        status: Boolean
        message: String
    }
    type Mutation {
        following (userName:String): followingResult
    }
`