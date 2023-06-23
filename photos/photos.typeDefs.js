import { gql } from "apollo-server-express";

export default gql`
    type Photo{
        id: Int!
        user_ref: User!
        user_Id: Int
        file: String!
        caption: String
        hashtags: [Hashtag]!
        # likes: [Like]!
        createdAt: String!
        updatedAt: String!
        likes: Int
        isMine:Boolean
        comments: Int
        comment: [Comment]
    }

    type Hashtag {
        id: Int!
        photos(page: Int!): [Photo]
        hashtag: String!
        totalPhoto: Int
    }

    type Like {
        id: Int!
        photo: Photo
        photo_Id: Int
        user: User
        user_Id: Int
    }

`;
