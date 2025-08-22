import { Suspense } from "react";
import { unstable_cacheLife as cacheLife } from "next/cache";
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
  const data = await fetchFromCMS(id);
  const renderedAt = new Date().toISOString();
  cacheLife({ expire: 20 });

  return (
    <div>
      <p>Rendered at: {renderedAt}</p>
      <p>ID: {data.id}</p>
      <SecondSince start={Date.now()} />
    </div>
  );
}

async function fetchFromCMS(id: string) {
  "use cache: remote";
  cacheLife({ revalidate: 10 });
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return { id };
}
