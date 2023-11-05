# graphiql-playground

📚 Learning and exploring GraphiQL, the in-browser GraphQL IDE.

> A graphical interactive in-browser GraphQL IDE.
> 
> -- <cite> https://github.com/graphql/graphiql/tree/main/packages/graphiql </cite>


## Overview

GraphiQL is a rich and actively-developed toolkit for creating GraphQL tooling using web technologies: HTML, CSS and
JavaScript. I want to learn more about it, and this repository is a place for me to do that.


## Standalone subprojects

This repository illustrates different concepts, patterns and examples via standalone subprojects. Each sub-project is
completely independent of the others and do not depend on the root project. This _standalone sub-project constraint_
forces the subprojects to be complete and maximizes the reader's chances of successfully running, understanding, and
re-using the code.

The subprojects include:


### `basic/`

A basic GraphiQL project that fronts the `graphql-pokemon` project's GraphQL API.

See the README in [basic/](basic/).


## Wish List

General clean-ups, TODOs and things I wish to implement for this project:

* [x] DONE Create a `basic` example project that is a minimal GraphiQL setup. It uses JS (update: well whatever, I'm going to use TypeScript). It doesn't customize anything.
  Maybe query the GitHub GraphQL API? Use esbuild.
 * [ ] ABANDONED (I had started `custom-ui` and make it into something but it's moved to its own repo [my-github-explorer](https://github.com/dgroomes/my-github-explorer)) Create a deconstructed example which exposes some pre-built queries and shows the results in a bespoke summary
  view (instead of JSON). This works if the queries are fixed (exact known shape of the data) and so the summary view
  can also be fixed. Maybe use the GitHub GraphQL API as an example and show a summary of my repos.  


## Reference

* [GitHub repo: `graphql/graphiql`](https://github.com/graphql/graphiql)
  * The home of GraphiQL.
* [GitHub repo: `graphql-java-playground`](https://github.com/dgroomes/graphql-java-playground)
  * Another one of my playground repositories. In this one I explored the GraphQL Java framework and also include a basic
    GraphiQL setup.
