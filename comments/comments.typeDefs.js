import { gql } from 'apollo-server-express';

export default gql`
    type Comment {
        id: Int!
        user: User!
        photo: Photo!
        payload: String!
        createdAt: String
        updatedAt: String
        userId: Int
        photoId: Int
        isMine: Boolean

    }
`