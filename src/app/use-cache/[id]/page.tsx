import { Suspense } from "react";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { SecondSince } from "@/app/client";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicPage params={params} />
    </Suspense>
  );
  
}

async function getUser(id: string) {
    'use cache'
    await new Promise((resolve) => setTimeout(resolve, 3000));
    cacheTag(`user-${id}`);
    cacheLife({ expire: 60 });
  return {
    id,
    name: "John Doe",
  };
}

async function DynamicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser(id);
  const renderedAt = new Date().toISOString();
  return (
    <div>
      <p>Rendered at: {renderedAt}</p>
      <p>ID: {id}</p>
      <SecondSince start={Date.now()} />
      <p>Cache expires in 60 seconds</p>
      <a href='https://github.com/RhysSullivan/use-cache-testing/blob/main/src/app/%5Bid%5D/page.tsx'>View code</a>
    </div>
  );
}
