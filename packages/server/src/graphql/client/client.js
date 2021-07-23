import {gql} from 'apollo-server-express';
import createRepository from '../../dataBase/createRepository';
import * as uuid from 'uuid';

const clientRepository = createRepository('client');

export const clientTypeDefs = gql`
  type Client implements Node {
    id: ID!
    name: String!
    email: String!
    disabled: Boolean!
  }

  type ClientList implements List {
    items: [Client!]!
    totalItens: Int!
  }

  input ClientListFilter {
    name: String
    email: String
    disabled: Boolean
  }

  input ClientListOptions {
    take: Int
    skip: Int
    sort: ListSort
    filter: ClientListFilter
  }

  extend type Query {
    client(id: ID!): Client
    clients(options: ClientListOptions): ClientList
  }

  input CreateClientInput {
    name: String!
    email: String!
  }

  input UpdateClientInput {
    id: ID!
    name: String!
    email: String!
    disabled: Boolean!
  }

  extend type Mutation {
    createClient(input: CreateClientInput!): Client!
    updateClient(input: UpdateClientInput!): Client!
    deleteClient(id: ID!): Client!
  }
`;

export const clientResolvers = {
  Query: {
    client: async (_, { id }) => {
      const clients = await clientRepository.read();
      const client = clients.find(client => client.id === id);
      if (!client) throw new Error('Cannot find current user!');
      return client;
    },
    clients: async (_, args) => {
      const {
        skip = 0,
        take = 10,
        sort,
        filter
      } = args.options || {};

      const clients = await clientRepository.read();

      if (sort) {
        clients.sort((clientA, clientB) => {
          if (!['name', 'email', 'disabled'].includes(sort.sorter)) {
            throw new Error(`Cannot sort by field "${sort.sorter}".`);
          }

          const fieldA = clientA[sort.sorter];
          const fieldB = clientB[sort.sorter];

          if (typeof fieldA === 'string') {
            if (sort.sortment === ListSortmentEnum.ASC)
              return fieldA.localeCompare(fieldB);
            else return fieldB.localeCompare(fieldA);
          }

          if (sort.sortment === ListSortmentEnum.ASC)
            return Number(fieldA) - Number(fieldB);
          else return Number(fieldB) - Number(fieldA);
        });
      }

      const filteredClients = clients.filter((client) => {
          if (!filter || Object.keys(filter).length === 0) return true;
  
          return Object.entries(filter).every(([field, value]) => {
            if (client[field] === null || client[field] === undefined)
              return false;
            if (typeof value === 'string') {
              if (value.startsWith('%') && value.endsWith('%'))
                return client[field].includes(value.substr(1, value.length - 2));
              if (value.startsWith('%'))
                return client[field].endsWith(value.substr(1));
              if (value.endsWith('%'))
                return client[field].startsWith(
                  value.substr(0, value.length - 1)
                );
              return client[field] === value;
            }
            return client[field] === value;
          });
      });
        
      return {
          items: filteredClients.slice(skip, skip + take),
          totalItens: filteredClients.length
      }
    }
  },

  Mutation: {
    createClient: async (_, { input }) => {
      const clients = await clientRepository.read();
      
      const client = {
        id: uuid.v4(),
        name: input.name,
        email: input.email,
        disabled: false,
      };

      await clientRepository.write([...clients, client]);

      return client;
    },

    updateClient: async (_, { input }) => {
      const clients = await clientRepository.read();

      const currentClient = clients.find(client => client.id === input.id);

      if (!currentClient) throw new Error('No client with this id');
      
      const updatedClient = {
        ...currentClient,
        name: input.name,
        email: input.email,
        disabled: input.disabled,
      };

      const updatedClients = clients.map(client => {
        if (client.id === updatedClient.id) return updatedClient;
        return client;
      })

      await clientRepository.write(updatedClients);

      return updatedClient;
    },

    deleteClient: async (_, { id }) => {
      const clients = await clientRepository.read();

      const client = clients.find(client => client.id === id);

      if (!client) throw new Error('Cant find client with the current id.')

      const filteredClients = clients.filter(item => item.id !== id);

      await clientRepository.write(filteredClients);

      return client;
    }
  }
};