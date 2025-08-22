import { Suspense } from "react";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { SecondSince } from "../../client";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <DynamicPage params={params} />;
}
export const generateStaticParams = async () => {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
};

async function DynamicPage({ params }: { params: Promise<{ id: string }> }) {
  "use cache";
  const { id } = await params;
  // wait 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const renderedAt = new Date().toISOString();
  cacheLife({ revalidate: 10 });
  return (
    <div>
      <p>
        This page has a top level 'use cache' and is accessing no dynamic data.
        There is no cache tags or cache life on it
      </p>
      <p>Rendered at: {renderedAt}</p>
      <p>ID: {id}</p>
      <SecondSince start={Date.now()} />
    </div>
  );
}
