import { gql } from 'apollo-server-express';

export default gql`
    type seeFeedResult {
        status: Boolean,
        message: String, 
        data: [Photo]
    }
    type Query {
        seeFeed(offset:Int!): [Photo]!
    }
`