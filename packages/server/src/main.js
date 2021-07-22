import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';


async function startApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    const app = express();
    server.applyMiddleware({ app, bodyParserConfig: true, });
  
    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    return {server, app};
}


startApolloServer();
