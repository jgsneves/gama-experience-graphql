import {ApolloLink, Observable} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import {onError} from 'apollo-link-error';
import {setContext} from "apollo-link-context";

const loggerLink = new ApolloLink((operation, forward) => new Observable(observer => {
    forward(operation).subscribe({
        next: result => {
            console.log('Log: ', result);
            observer.next(result);
        },
        error: observer.complete.bind(observer),
        complete: observer.complete.bind(observer),
    })
}))

const link = ApolloLink.from([
    loggerLink,
    onError((error) => {
        console.log('GraphQLError:',error);
    }),
    setContext((_, { headers }) => {
        return {
            headers,
        }
    }),
    createHttpLink({
        uri: 'http://localhost:4000/graphql',

    })
]);

export default link;