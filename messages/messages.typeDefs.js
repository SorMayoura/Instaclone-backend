import { gql } from 'apollo-server-express';

export default gql`
    type Message {
        id:Int!
        payload: String!
        user: User!
        userId: Int
        room: Room!
        roomId: Int!
        read: Boolean
        createdAt: String!
        updatedAt: String!
    }

    type Room {
        id: Int!
        users: [User]
        messages: [Message]
        unreadTotal: Int
        createdAt: String!
        updatedAt: String!
    }
`