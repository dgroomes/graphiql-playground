import {Dispatch, SetStateAction, useEffect, useState} from "react";

/**
 * A custom React hook for storing and validating a GitHub personal access token.
 *
 * I'm not sure this is idiomatic React, but I'm trying to learn hooks and experimenting.
 */
export function useToken(): [TokenState, Dispatch<SetStateAction<TokenState>>] {
    const [token, setToken] = useState<TokenState>('empty')
    useEffect(() => {
        if (typeof token === 'object' && token.kind === "entered") {
            const query = `
  query {
    viewer {
      login
    }
  }
`
            // Note: I would love to extract the mechanical unmount cleanup and request aborting stuff away. I believe this is
            // done in libraries like react-query and axios-hooks.
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

            let state = {isMounted: true}

            const asyncWork = async function () {
                console.log("Sending request to GitHub API...")
                const res = await fetch("https://api.github.com/graphql", options)

                if (res.status == 401) {
                    console.log("GitHub API responded with 401 Unauthorized. The token is invalid.")
                    setToken({
                        kind: "invalid",
                        token: token.token
                    })
                    return Promise.reject()
                }
                const data = await res.json()
                // For effect, let's purposely delay the response by a bit.
                await new Promise(resolve => setTimeout(() => resolve(data), 1500))

                if (!state) {
                    console.log("Component is no longer mounted. Short-circuiting the token validation work.")
                    return
                }
                if (signal.aborted) {
                    console.log("Request was aborted. Short-circuiting the token validation work.")
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
            }

            // noinspection JSIgnoredPromiseFromCall
            asyncWork()

            // Remember, this is a "clean up" function. It is called when the component is unmounted.
            return () => {
                state.isMounted = false
                controller.abort()
            }
        }
    }, [token])

    return [token, setToken];
}



