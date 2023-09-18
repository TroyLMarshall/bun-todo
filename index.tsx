import {renderToString} from "react-dom/server"

const server = Bun.serve({
    hostname: "localhost",
    port: 3000,
    fetch: handler,
});

console.log(`Listening on http://${server.hostname}:${server.port}`)

function handler(request: Request): Response {
    const url = new URL(request.url);

    if (url.pathname === "" || url.pathname === "/")
        return new Response(Bun.file("index.html"));

    if (url.pathname === "/todos" && request.method === "GET")
    return new Response(renderToString(<TodoList todos={[]} />));
        
    if (url.pathname === "/todos" && request.method === "POST")
        return new Response(renderToString(<TodoList todos={[]} />));

    return new Response("Not Found", { status: 404 });
}

function TodoList(props: { todos: { id: number, text: string } [] }) {
    return <ul>{ props.todos.length ? props.todos.map(todo => <li>{todo.text}</li>) : 'No items added'}</ul>
}