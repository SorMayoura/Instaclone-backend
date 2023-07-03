import { gql } from 'apollo-server-express';

export default gql`
    type meResult {
        status: Boolean,
        message: String,
        data: User
    }
    type Query {
        me:meResult
    },
`;