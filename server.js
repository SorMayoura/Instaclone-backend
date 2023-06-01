import {ApolloServer} from "apollo-server";
import schema from "./schema";
import {getUser, protectResolver} from "./users/users.utils";
require("dotenv").config();

const server = new ApolloServer({
    schema,
    context: async ({req}) => {
        return {
            loggedUser: await getUser(req.headers.token),
            protectResolver
        }
    }
});

const PORT = process.env.PORT;

server.listen(PORT).then(() => console.log(`server is running on http://localhost:${PORT}/`));