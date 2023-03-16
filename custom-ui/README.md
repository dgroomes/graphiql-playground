# custom-ui

NOT YET FULLY IMPLEMENTED

A custom interface built from individual components of the GraphiQL library.


## Overview

This an application of the GraphiQL library that uses some of its components to create a simple "repository metadata
lister" user interface. It is an SPA that uses the GitHub GraphQL API to list the metadata of a user's repositories.
The purpose of this project is to be an intermediate showcase of GraphiQL, focussed on its React components.


## Instructions

Follow these instructions to build and serve the program:

1. Install the dependencies
    * ```shell
      npm install
      ```
2. Serve the content (and build continuously)
    * ```shell
      npm start
      ```
3. Open the browser
    * Open <http://[::1]:8080>
    * Click around the UI and iterate!


## Wish List

General clean ups, todos and things I wish to implement for this project:

* [x] DONE Scaffold the project
* [ ] IN PROGRESS Prompt for an access token. Validate the access token with a request to the GitHub API. Give
  informational UI feedback.
* [ ] Query for the current user's login (assuming the token is a user token)
* [ ] Query (search) for the current user's repositories. Harcode to a 100 limit (which is a limit of the API; then
  you'll need pagination)
* [ ] Query (get) the metadata for each of the repositories
* [ ] Display the information in a table using [React Table](https://react-table-v7.tanstack.com/) 
* [ ] Consider paginating through the results. This would be a cool application because we would see the table size grow.
* [ ] Show the pre-constructed queries in codemirror (using a GraphiQL component). We want the syntax highlighting. Can
  we make them read-only? 

## Reference

* [GitHub GraphQL API](https://docs.github.com/en/graphql)
* [GitHub docs: *Search within a user's or organization's repositories*](https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories#search-within-a-users-or-organizations-repositories)
* [MDN docs: *AbortController*](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
  * I just stumbled on this interesting, modern API. I'm tempted to write my `useEffect` invocations to use it and also
    the 'unmounted' check to do things "the right way". I think I am going to do this. Now, I'm realizing this should
    really be in my `react-playground` repo but for now it's ok. Progress. Functional programming is nice but hey we
    have tons of I/O and stateful stuff.
