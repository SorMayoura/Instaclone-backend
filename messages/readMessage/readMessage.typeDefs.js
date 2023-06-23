import { gql } from 'apollo-server-express';

export default gql`
    type readMessageResult {
        status: Boolean
        message: String
    }
    type Mutation {
        readMessage(id:Int): readMessageResult
    }
`