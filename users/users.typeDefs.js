import { gql } from "apollo-server-express";

export default gql`
    type User {
        id: Int!
        firstName: String!
        LastName:  String
        password: String!
        email:     String!
        userName:  String!
        following: [User]
        follower: [User]
        avarta: String
        bio: String
        # photos: [Photo]
        totalFollowing: Int
        totalFollower: Int
        isFollowing: Boolean
        isMe: Boolean        
    }
`;
