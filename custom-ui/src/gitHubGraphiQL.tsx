import React, {useEffect, useState} from 'react'
import GraphiQL from 'graphiql'
import {createGraphiQLFetcher} from '@graphiql/toolkit'
import {Alert, Button, Input, Space, Spin} from "antd"

/**
 * This is one of the main components. I need to extract some of this into smaller components/hooks. I want to use the
 * "Main" component as the actual main component.
 *
 * This component has some (gnarly) logic to request/validate a GitHub personal access token.
 */
export default function GitHubGraphiQL() {
    const [tokenButtonPressed, setTokenButtonPressed] = useState(false)
    // Note: I should use more of a typed state machine to track: "not pressed", "pressed", "validating", "validated", "invalid"
    // but I won't for now.
    const [valid, setValid] = useState<boolean>(null)
    const [token, setToken] = useState<string>(null)
    const [login, setLogin] = useState<string>(null)
    // I would love to extract the mechanical unmount cleanup and request aborting stuff into a hook. I believe this is
    // done in libraries like react-query and axios-hooks.
    useEffect(() => {
        if (tokenButtonPressed && valid === null) {
            const query = `
  query {
    viewer {
      login
    }
  }
`

            const controller = new AbortController()
            const signal = controller.signal
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `bearer ${token}`
                },
                body: JSON.stringify({query}),
                signal
            }

            let isMounted = true

            console.log("Sending request to GitHub API...")
            fetch("https://api.github.com/graphql", options)
                .then(res => {
                    // todo handle failures
                    return res.json()
                })
                .then(data => {
                    // For effect, let's purposely delay the response by a bit.
                    return new Promise(resolve => setTimeout(() => resolve(data), 1500))
                })
                .then(function (data) {
                    if (!isMounted) {
                        console.log("Component is no longer mounted. Short-circuiting the setLogin() call.")
                        return
                    }
                    if (signal.aborted) {
                        console.log("Request was aborted. Short-circuiting the setLogin() call.")
                        return
                    }

                    const login = data["data"]["viewer"]["login"]
                    console.log(`GitHub login: ${login}`)
                    setLogin(login)
                    setValid(true)
                })

            // Remember, this is a "clean up" function. It is called when the component is unmounted.
            return () => {
                isMounted = false
                controller.abort()
            }
        }
    }, [tokenButtonPressed, valid])

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

    const fetcher = createGraphiQLFetcher({
        url: 'https://api.github.com/graphql',
        headers: {
            Authorization: `bearer ${token}`
        }
    })

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

