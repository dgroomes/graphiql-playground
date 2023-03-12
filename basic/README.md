# basic

A basic GraphiQL project that fronts the `graphql-pokemon` project's GraphQL API.


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
    * Open <http://[::1]:8000>
    * Click around the UI and iterate!


## Wish List

General clean ups, todos and things I wish to implement for this project:

* [ ] How can I bundle the CSS? I don't want to version control the GraphiQL CSS. 


## Reference

* [GitHub repo `reach/reach-ui` issue #916: *Compatibility with React 18*](https://github.com/reach/reach-ui/issues/916)
  * This issue is why there are so many `npm WARN ERESOLVE overriding peer dependency` logs when you run `npm install`.
* [`graphql-pokemon` docs page](https://graphql-pokemon.js.org/introduction/welcome)
  > This projects contains a GraphQL API for retrieving information about Pokémon. The API allows users to query for information about Pokémon, including their types, abilities, and moves.
