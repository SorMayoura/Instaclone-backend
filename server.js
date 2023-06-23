import { ApolloServer } from "apollo-server-express";
import express from "express";
import logger from "morgan";
import { typeDefs, resolvers } from "./schema";
import 'dotenv/config';
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from 'graphql-upload';
import http from "http";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

async function startApollerServer() {

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const app = express();

    app.use(logger("tiny"));
    app.use(graphqlUploadExpress());
    app.use("/static", express.static("uploads"));

    const httpServer = http.createServer(app);

    // Creating the WebSocket server
    const wsServer = new WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // Pass a different path here if app.use
        // serves expressMiddleware at a different path
        path: '/graphql',
    });

    // Hand in the schema we just created and have the
    // WebSocketServer start listening.
    const serverCleanup = useServer({
        schema,
        context: async (ctx) => {
            return {
                logginUser: await getUser(ctx.connectionParams.token)
            }
        }
    },
        wsServer);

    const server = new ApolloServer({
        schema,
        context: async ({req}) => {
            return {
                logginUser: await getUser(req.headers.token)
            }
        },
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    await server.start();

    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: process.env.PORT }, () => {
        console.log(`🚀 Server ready at http://localhost:${process.env.PORT}✅`);
    }))

}

startApollerServer();