import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';


async function startApolloServer() {
    const typeDefs =  gql`
        type Client {
            id: ID!
            name: String!
        }
    
        type Demand {
            id: ID!
            name: String!
            client: Client!
            deadline: String
        }
    
        type Query {
            demands: [Demand]!
        }
    `;

    const resolvers = {
        Query: {
            demands: () => [],
        }
    };

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    const app = express();
    server.applyMiddleware({ app });
  
    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    return {server, app};
}


startApolloServer();
