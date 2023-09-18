const server = Bun.serve({
    hostname: "localhost",
    port: 3000,
    fetch: handler,
});

console.log(`Listening on http://${server.hostname}:${server.port}`)

function handler(request: Request): Response {
    const url = new URL(request.url);

    if (url.pathname === '' || url.pathname === '/')
        return new Response(Bun.file('index.html'));

    return new Response("Not Found", { status: 404 });
}