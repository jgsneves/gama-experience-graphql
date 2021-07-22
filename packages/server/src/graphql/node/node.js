import { gql } from 'apollo-server-express';

export const nodeTypeDefs = gql`
  interface Node {
    id: ID!
  }
`;

export const nodeResolvers = {
  Node: {
    __resolveType: () => null,
  },
};