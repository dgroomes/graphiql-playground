import React, {useState} from 'react';
import GraphiQL from 'graphiql';
import {createGraphiQLFetcher} from '@graphiql/toolkit';
import {Alert, Button, Input, Space, Spin} from "antd";

/**
 * This is one of the main components. I need to extract some of this into smaller components/hooks. I want to use the
 * "Main" component as the actual main component.
 *
 * This component has some logic to request/validate a GitHub personal access token.
 */
export default function GitHubGraphiQL() {

    const [tokenButtonPressed, setTokenButtonPressed] = useState(false)
    // Note: I should use more of a state machine to track: "not pressed", "pressed", "validating", "validated", "invalid"
    // but I won't for now.
    const [valid, setValid] = useState<boolean>(null)
    const [token, setToken] = useState<string>(null)

    if (valid === false) {
        return (<Alert
            message="Error"
            description="This token is invalid according to the GitHub API. Please double check your token."
            type="error"
            showIcon
        />)
    }

    if (tokenButtonPressed && valid === null) {
        return (<Space direction="horizontal">
            <Input.Password
                readOnly={true}
                disabled={true}
                visibilityToggle={false}
                placeholder="Validating token..."
            />
            <Spin/>
            <Alert
                message="TODO"
                description="The token validation has not been implemented yet."
                type="info"
                showIcon
            />
        </Space>)
    }

    if (!tokenButtonPressed) {
        return (<Space direction="horizontal">
            <Input.Password
                placeholder="input GitHub personal access token"
                visibilityToggle={false}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setToken(e.target.value)
                }}
            />
            <Button onClick={() => setTokenButtonPressed(true)}>
                Submit
            </Button>
        </Space>)
    }


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

    return (<>
        <Alert
            message="TODO"
            description="The token was validated, but the rest of the application has not been implemented yet."
            type="info"
            showIcon
        />
        <GraphiQL fetcher={fetcher} defaultQuery={defaultQuery}/>
    </>)
}

