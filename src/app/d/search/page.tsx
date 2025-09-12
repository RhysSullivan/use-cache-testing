"use cache";

import { getSearchData } from "../get-search-data";
import Link from "next/link";
export default async function Page() {
  const data = await getSearchData();
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        background: "rgba(255,255,255,0.02)",
        color: "#e6eef8",
        maxWidth: 680,
        margin: "0 auto",
      }}
    >
      <Link href="/d">Back to Home</Link>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Search Results</div>
      <div style={{ opacity: 0.9 }}>{data.data}</div>
    </div>
  );
}
