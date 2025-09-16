import { Suspense } from "react";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";

import { SecondSince } from "../../client";

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

async function DynamicPage({ params }: { params: Promise<{ id: string }> }) {
  "use cache: remote";
  const { id } = await params;
  // wait 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const renderedAt = new Date().toISOString();
  cacheLife({ expire: 60 });
  cacheTag(`runtime-cache-${id}`);
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
