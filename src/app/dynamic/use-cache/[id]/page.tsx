import { notFound } from "next/navigation";
import { checkAuth } from "../../data";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { GitHubApi } from "../../github-api";
async function getData() {
    'use cache'
    const api = new GitHubApi();
  const owner = "facebook";
  const repo = "react";
  const prNumber = "34394";
    try {
      const [prData, diffData, filesData, issueComments, reviewComments] =
        await Promise.all([
          api.getPullRequest(owner, repo, prNumber),
          api.getPullRequestDiff(owner, repo, prNumber),
          api.getPullRequestFiles(owner, repo, prNumber),
          api.getPullRequestIssueComments(owner, repo, prNumber),
          api.getPullRequestReviewComments(owner, repo, prNumber),
        ]);
  
      return {
        pr: prData,
        diff: diffData,
        files: filesData,
        issueComments,
        reviewComments,
      };
    } catch (error) {
      console.error("Error fetching PR data:", error);
      return null;
    }
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
        <p>Data: {JSON.stringify(data)}</p>
        <p>ID: {id}</p>
    </div>;
}