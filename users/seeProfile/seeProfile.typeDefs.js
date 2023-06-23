import { gql } from "apollo-server-express";

export default gql`
    type seeProfileResult{
        status: Boolean
        message: String
        data: [User]
    }
    type Query {
        seeProfile(userName: String!): seeProfileResult
        allProfile: seeProfileResult
    }
`;