import { gql } from 'apollo-server-express';

export default gql`
    type result {
        status: Boolean,
        message: String,
        data: Comment
    }
    type Mutation {
        editComment(id:Int!, payload: String): result
    }
`