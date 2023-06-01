import { gql } from "apollo-server";

export default 
    gql`
    type editUserResult {
        editOk: Boolean 
        message: String
    }
    type Mutation {
        editUser(
            firstName: String
            LastName: String
            userName: String
            email: String
            password: String
        ): editUserResult
    }`;

  