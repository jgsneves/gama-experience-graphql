import { gql } from 'apollo-server-express';
import {clientTypeDefs} from './client/client';
import {demandTypeDefs} from './demand/demand';

const typeDefs = gql`
    type Query {
        _root: String
    }

    ${clientTypeDefs}
    ${demandTypeDefs}
`;

export default typeDefs;