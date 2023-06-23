import { gql } from "apollo-server-express";

export default gql`
    type unfollowingResult {
        status: Boolean
        message: String
    }

    type Mutation {
        unfollow (userName: String) : unfollowingResult
    }
`;