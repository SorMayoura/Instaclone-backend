import client from "../../client";

export default {
    Query: {
        getUsers: () => client.users.findMany(),
        getUser: (_, {userName}) => 
            client.users.findFirst(
            {where: {userName}}
        )
    }
}