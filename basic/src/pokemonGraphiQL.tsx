import React from 'react';
import GraphiQL from 'graphiql';
import {createGraphiQLFetcher} from '@graphiql/toolkit';

export default function PokemonGraphiQL() {
    const defaultQuery = `
query {
    getFuzzyPokemon(pokemon: "turtle", take: 3) {
        species
        types {
            name
        }
    }
}`

    const fetcher = createGraphiQLFetcher({
        url: 'https://graphqlpokemon.favware.tech/v7',
    });

    return <GraphiQL fetcher={fetcher} defaultQuery={defaultQuery}/>
}
