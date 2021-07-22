import { gql } from 'apollo-server-express';
import {clientTypeDefs} from './client/client';
import {demandTypeDefs} from './demand/demand';
import {listTypeDefs} from './list/list';
import {nodeTypeDefs} from './node/node'

const typeDefs = gql`
    type Query {
        _root: String
    }

    ${nodeTypeDefs}
    ${listTypeDefs}
    ${clientTypeDefs}
    ${demandTypeDefs}
`;

export default typeDefs;