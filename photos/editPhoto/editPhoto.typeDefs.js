import { gql } from 'apollo-server-express';

export default gql`
    type searchPhotoResult{
        status: Boolean,
        message: String,
        data: [Photo]
    }

    type editPhotoResult {
        status: Boolean,
        message: String,
        data: Photo
    }

    type Query {
        searchPhoto(caption:String!, page: Int!): searchPhotoResult!
    }

    type Mutation {
        editPhoto (id: Int!, caption: String): editPhotoResult!
    }
`;