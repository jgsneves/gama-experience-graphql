import {demandResolvers} from './demand/demand';
import {clientResolvers} from './client/client';
import {listResolvers} from './list/list';
import {nodeResolvers} from './node/node';

const resolvers = {
    ...nodeResolvers,
    ...listResolvers,
    ...clientResolvers,
    ...demandResolvers,

    Query: {
        ...clientResolvers.Query,
        ...demandResolvers.Query,
    }
}

export default resolvers;