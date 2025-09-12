"use cache";

import { getSearchData } from "./get-search-data";

export default async function Page() {
  const data = await getSearchData();
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        padding: 18,
        borderRadius: 10,
        maxWidth: 720,
        margin: "0 auto",
        boxShadow: "0 6px 20px rgba(2,6,23,0.6)",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
        {data.data}
      </div>
      <label style={{ display: "block", marginBottom: 6, color: "#cbd5e1" }}>
        Enter your search query here:
      </label>
      <input
        type="text"
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
          color: "#e6eef8",
        }}
      />
    </div>
  );
}
