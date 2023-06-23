import { gql } from 'apollo-server-express';

export default gql`
    type createCommentResult{
        status: Boolean,
        message: String,
        data: Comment
    }
    type Mutation {
        createComment(photoId: Int!, payload: String!): createCommentResult!
    }
`