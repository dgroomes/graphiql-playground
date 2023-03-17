import React, {useEffect, useState} from 'react'
import GraphiQL from 'graphiql'
import {createGraphiQLFetcher} from '@graphiql/toolkit'
import {Alert, Button, Input, Space, Spin} from "antd"

/**
 * This is one of the main components. I need to extract some of this into smaller components/hooks. I want to use the
 * "Main" component as the actual main component.
 *
 * This component has some logic to request/validate a GitHub personal access token.
 */
export default function GitHubGraphiQL() {
    const [token, setToken] = useState<TokenState>('empty')
    // I would love to extract the mechanical unmount cleanup and request aborting stuff into a hook. I believe this is
    // done in libraries like react-query and axios-hooks.
    useEffect(() => {
        if (typeof token === 'object' && token.kind === "entered") {
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
                    Authorization: `bearer ${token.token}`
                },
                body: JSON.stringify({query}),
                signal
            }

            let isMounted = true

            console.log("Sending request to GitHub API...")
            fetch("https://api.github.com/graphql", options)
                .then(res => {
                    if (res.status == 401) {
                        console.log("GitHub API responded with 401 Unauthorized. The token is invalid.")
                        setToken({
                            kind: "invalid",
                            token: token.token
                        })
                        return Promise.reject()
                    }
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

                    // @ts-ignore
                    const login = data["data"]["viewer"]["login"]
                    console.log(`GitHub login: ${login}`)
                    setToken({
                        kind: "valid",
                        token: token.token,
                        login: login
                    })
                })

            // Remember, this is a "clean up" function. It is called when the component is unmounted.
            return () => {
                isMounted = false
                controller.abort()
            }
        }
    }, [token])

    // Well, I refactored this to be more "algebraic data types"-like but the nesting is a bit much and so is the
    // duplicated input/button stuff.
    if (token === 'empty') {
        return (<Space direction="horizontal">
            <Input.Password
                placeholder="input GitHub personal access token"
                visibilityToggle={false}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setToken({
                        kind: "partial",
                        token: e.target.value
                    })
                }}
            />
            <Button disabled={true}> Submit</Button>
        </Space>)
    } else {

        if (token.kind === "invalid") {
            return (<Alert
                message="Error"
                description="This token is invalid according to the GitHub API. Please double check your token."
                type="error"
                showIcon
            />)
        } else if (token.kind === 'validating') {
            return (<Space direction="horizontal">
                <Input.Password
                    readOnly={true}
                    disabled={true}
                    visibilityToggle={false}
                    placeholder="Validating token..."
                />
                <Spin/>
            </Space>)
        } else if (token.kind === 'partial') {
            return (<Space direction="horizontal">
                <Input.Password
                    placeholder="input GitHub personal access token"
                    visibilityToggle={false}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setToken({
                            kind: "partial",
                            token: e.target.value
                        })
                    }}
                />
                <Button onClick={() => setToken({kind: 'entered', token: token.token})}>
                    Submit
                </Button>
            </Space>)
        } else {

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
    }
}

