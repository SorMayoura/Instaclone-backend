import { gql } from "apollo-server-express";

export default gql`
    type seeFollowersResult {
        status: Boolean,
        message: String,
        data: [User]
        totalPages: Int
    }
    type Query {
        seeFollowers (userName: String, page: Int) : seeFollowersResult
    }
`;