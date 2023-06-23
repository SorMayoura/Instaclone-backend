import { gql } from "apollo-server-express";
// const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');
// const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js');
// import type { FileUpload } from "graphql-upload/processRequest.js";
// import { graphqlUploadExpress } from 'graphql-upload';

export default gql`
    # scalar MyCustomScalar
    scalar Upload
    # type File {
    #     filename: String!
    #     mimetype: String!
    #     encoding: String
    # }

    type editProfileResult {
        status: Boolean,
        message: String,
        data: User
    }
    type Mutation {
        editProfile (
            userName: String, 
            firstName: String,
            LastName: String, 
            password: String,
            email: String,          
            avarta: Upload, 
            bio: String            
        ): editProfileResult
    }
`