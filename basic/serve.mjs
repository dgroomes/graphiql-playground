/*
Serve and bundle the source code using esbuild.

Refer to the API docs https://esbuild.github.io/api/

Remember, the esbuild server builds on-demand instead of proactively. This is actually convenient especially because
esbuild runs so quickly (because there is no type checking!). Here is a quote from the docs:

    With esbuild's web server, each incoming request starts a rebuild if one is not already in progress, and then waits
    for the current rebuild to complete before serving the file. This means esbuild never serves stale build results.

Note: the intellisense is nice compared to using the esbuild CLI.
*/

import * as esbuild from 'esbuild'

const ctx = await esbuild.context({
    entryPoints: [
        {"in": 'src/app.tsx', "out": 'bundle'},
        {"in": 'src/style.css', "out": 'bundle'}
    ],
    platform: 'browser',
    outdir: 'www',
    bundle: true,
    sourcemap: "linked"
});

const {host, port} = await ctx.serve({
    servedir: 'www',
    host: '::1',
    port: 8080
});

console.log("Serving on http://[%s]:%d", host, port)
