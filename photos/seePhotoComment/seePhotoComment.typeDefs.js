import { gql } from 'apollo-server-express';

export default gql`
    type seePhotoCommentResult {
        status:Boolean
        message: String
        data: [Comment]
    }
    type Query {
        seePhotoComment(photoId:Int!): seePhotoCommentResult! 
    }
`;