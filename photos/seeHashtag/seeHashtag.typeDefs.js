import { gql } from "apollo-server-express";

export default gql`
    type seeHashtagResult {
        status: Boolean,
        message: String,
        data: Hashtag
    }
    type Query {
        seeHashtag(hashtag: String!): seeHashtagResult
    }
`