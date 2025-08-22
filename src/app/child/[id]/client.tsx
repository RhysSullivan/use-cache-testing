"use client";

import { invalidate } from "./actions";
import { useFormStatus } from "react-dom";

export function InvalidateButton({ id }: { id: string }) {
  const { pending } = useFormStatus();
  const baseStyle = {
    padding: "8px 14px",
    backgroundColor: pending ? "#e2e8f0" : "#2563eb",
    color: pending ? "#475569" : "#ffffff",
    border: "none",
    borderRadius: 6,
    cursor: pending ? "not-allowed" : "pointer",
    fontWeight: 600,
  };

  return (
    <button onClick={() => invalidate(id)} style={baseStyle} disabled={pending}>
      {pending ? "Invalidating..." : "Invalidate"}
    </button>
  );
}
