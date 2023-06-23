import { gql } from 'apollo-server-express';

export default gql`
    type seePhotoLikeResult {
        status: Boolean
        message: String
        data: [User]
    }
    
    type Query {
        seePhotoLike(photoId: Int!): seePhotoLikeResult!
    }
`