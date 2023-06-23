import { gql } from 'apollo-server-express';

export default gql`
    type toggleLikeResult {
        status: Boolean
        message: String
        data: Like
    }
    
    type Mutation {
        toggleLike(id:Int!): toggleLikeResult
    }
`;