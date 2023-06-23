import { gql } from "apollo-server-express";

export default gql`
    type createProfileResult {
        status: Boolean
        message: String
        data: [User]
    }
    type Mutation {
        createProfile(
            userName: String!, 
            firstName: String!,
            LastName: String, 
            password: String!,
            email: String!,
            # following User? @relation(references: [User.follower])
            # follower User? @relation( references: [User.following])
            avarta: Upload, 
            bio: String
        ): createProfileResult,
    }
`;

