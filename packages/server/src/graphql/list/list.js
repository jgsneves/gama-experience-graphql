import { gql } from 'apollo-server-express';

export const listTypeDefs = gql`
    interface List {
        items: [Node!]!
        totalItens: Int!
    }

    enum ListSortmentEnum {
        ASC
        DESC
    }

    input ListSort {
        sorter: String!
        sortment: ListSortmentEnum! 
    }
`;

export const ListSortmentEnum = Object.freeze({
    ASC: 'ASC',
    DESC: 'DESC',
})

export const listResolvers = {
    List: {
        __resolveType: () => null,
    }
}