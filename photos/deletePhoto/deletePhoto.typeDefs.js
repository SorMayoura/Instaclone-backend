import { gql } from 'apollo-server-express';

export default gql`
    type deletePhotoResult{
        status: Boolean,
        message: String,
        data: Photo
    }
    type Mutation {
        deletePhoto(id:Int!): deletePhotoResult!
    }
`