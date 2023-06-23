import { gql } from "apollo-server-express";

export default gql`
    type seePhotoResult {
        status: Boolean,
        message: String,
        data: Photo
    }
    type Query {
        seePhoto(id: Int): seePhotoResult
    }
`