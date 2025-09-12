import { headers } from "next/headers";
import { Suspense } from "react";

async function Navbar() {
  // wait 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const h = await headers();
  const url = h.get("referer");
  const userAgent = h.get("user-agent");
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        background: "linear-gradient(90deg, #0f172a, #1e293b)",
        color: "#e6eef8",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(2,6,23,0.6)",
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <div style={{ fontWeight: 700 }}>Navbar</div>
      <div style={{ opacity: 0.9, fontSize: 12 }}>{userAgent}</div>
      <div style={{ opacity: 0.8, fontSize: 12 }}>{url}</div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        background: "linear-gradient(180deg, #0b1220 0%, #071024 100%)",
        color: "#e6eef8",
        fontFamily:
          "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <Suspense fallback={<div style={{ padding: 12 }}>Loading...</div>}>
        <Navbar />
      </Suspense>
      <main style={{ marginTop: 20 }}>{children}</main>
    </div>
  );
}
