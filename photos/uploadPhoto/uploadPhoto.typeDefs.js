import { gql } from "apollo-server-express";

export default gql`
    type uploadPhotoResult {
        status: String
        message: String
        data: Photo
    }
    type Query {
        allPhoto: [Photo]
    }
    type Mutation {
        uploadPhoto(file: Upload!, caption: String): uploadPhotoResult
    }
`