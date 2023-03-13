import React from 'react';
import GraphiQL from 'graphiql';
import {createGraphiQLFetcher} from '@graphiql/toolkit';

export default function GitHubGraphiQL() {
    const defaultQuery = `
{
    search(query: "user:dgroomes", type: REPOSITORY, first: 100) {
        repositoryCount
        edges {
            node {
                ... on Repository {
                    name
                     
                }
            }
        }
    }
}
`

    // TODO: Requests to the API won't work until we incorporate personal access token.
    const fetcher = createGraphiQLFetcher({
        url: 'https://api.github.com/graphql',
    });

    return <GraphiQL fetcher={fetcher} defaultQuery={defaultQuery}/>
}
