import { notFound } from "next/navigation";
import { checkAuth } from "../../data";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { GitHubApi } from "../../github-api";
async function getData() {
    'use cache';
    const githubApi = new GitHubApi();
    const data = await githubApi.getPullRequestReviewComments("facebook", "react", '34394');
    return {
        data: data,
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
        <p>Data: {JSON.stringify(data.data)}</p>
        <p>ID: {id}</p>
    </div>;
}