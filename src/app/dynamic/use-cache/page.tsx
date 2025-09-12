import { checkAuth } from "../data";

async function getData() {
    'use cache';
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return {
        data: new Date().toISOString(),
    };
}

export default async function Page() {
    const auth = await checkAuth();
    const data = await getData();
    return <div>Use Cache
        <p>Auth: {auth ? "true" : "false"}</p>
        <p>Data: {data.data}</p>
    </div>;
}