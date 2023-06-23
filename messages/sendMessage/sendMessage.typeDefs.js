import { gql } from 'apollo-server-express';

export default gql`
    type sendMessageResult {
        status: Boolean,
        message: String,
        data: Message
    }
    type Mutation {
        sendMessage(userId: Int, payload: String!, roomId: Int): sendMessageResult
    }
`;