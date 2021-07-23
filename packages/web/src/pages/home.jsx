import React from 'react';
import {gql} from 'graphql-tag'
import {useQuery} from 'react-apollo';

const GET_CLIENT_LIST = gql`
    query GET_CLIENT_LIST($skip: Int!, $take: Int!) {
        clients(options: {
            skip: $skip
            take: $take
        }) {
            items {
                id
                name
                email
            }
            totalItens
        }
    }
`;

const Home = () => {
    const {data, loading, error, fetchMore} = useQuery(GET_CLIENT_LIST, {
        fetchPolicy: 'cache-and-network',
        variables: {
            skip: 0,
            take: 10,
        }
    });

    function handleClickButton() {
        fetchMore({
            variables: {
                skip: data.clients.items.length,
                take: 10,
            },
            updateQuery: (result, { fetchMoreResult }) => {
                if (!fetchMoreResult) return result;
                return {
                    ...result,
                    clients: {
                        ...result.clients,
                        items: result.clients.items.concat(fetchMoreResult.clients.items),
                        totalItens: fetchMoreResult.clients.totalItens
                    }
                }
            }
        })
    }

    if (error) return <p>error</p>

    if (loading) return <p>Loading...</p>
    
    if (data) return (
        <>
        <h1>Clientes:</h1>
        {data.clients.items.map(item => (
            <ul key={item.id}>
                <li>{item.name}</li>
                <li>{item.email}</li>
            </ul>
        ))}
        <button type="button" onClick={handleClickButton}>Carregar mais...</button>
        </>
    )
}

export default Home;