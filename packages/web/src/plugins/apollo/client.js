import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import link from './links';

const client = new ApolloClient({
    link,
    connectToDevTools: true,
    cache: new InMemoryCache(),
});

export default client;