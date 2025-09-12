import { notFound } from "next/navigation";
import { checkAuth } from "../../data";
async function getData() {
    'use cache';
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return {
        data: new Date().toISOString(),
    };
}


export async function generateStaticParams() {
    return [];
  }
  

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const auth = await checkAuth();
    if(!auth){
        notFound();
      }
    const data = await getData();
    return <div>Use Cache Remote
        <p>Auth: {auth ? "true" : "false"}</p>
        <p>Data: {data.data}</p>
        <p>ID: {id}</p>
    </div>;
}