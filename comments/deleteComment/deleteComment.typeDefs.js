import { gql } from 'apollo-server-express';

export default gql`
    type deleteCommentResult{        
        status: Boolean,
        message: String,
        data: Comment
    }
    type Mutation {
        deleteComment(id:Int!): deleteCommentResult!
    }
`
