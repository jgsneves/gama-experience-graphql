import {gql} from 'apollo-server-express';

export const demandTypeDefs = gql`
    type Demand {
        id: ID!
        name: String!
        client: Client!
        deadline: String
    }

    extend type Query {
        demands: [Demand]!
    }
`;

export const demandResolvers = {
    Query: {
        demands: () => []
    }
};
