import { useState } from "react";

export function Search() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          const url = new URL("/d/search", window.location.href);
          url.searchParams.set("q", e.target.value);
          window.history.pushState({}, "", url.toString());
        }}
      />
    </div>
  );
}
