import {demandResolvers} from './demand/demand';
import {clientResolvers} from './client/client'

const resolvers = {
    ...clientResolvers,
    ...demandResolvers,

    Query: {
        ...clientResolvers.Query,
        ...demandResolvers.Query,
    }
}

export default resolvers;