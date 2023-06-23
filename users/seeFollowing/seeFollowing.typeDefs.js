import { gql } from "apollo-server-express";

export default gql`
    type seeFollowingResult {
        status: Boolean
        message: String
        data: [User]
    }
    type Query {
        seeFollowings (userName: String, lastID: Int): seeFollowingResult
    }
`