"use client";

import { useEffect, useState } from "react";

export function SecondSince(props: { start: number }) {
  const [seconds, setSeconds] = useState<number | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(Date.now() - props.start);
    }, 1000);
    return () => clearInterval(interval);
  }, [props.start]);
  if (seconds === null) {
    return <p>Seconds since cached: </p>;
  }
  return <p>Seconds since cached: {(seconds / 1000).toFixed(0)}</p>;
}
