"use server";

import { revalidateTag } from "next/cache";

export async function invalidate(id: string) {
  console.log("invalidating", id);
  revalidateTag(id);
}
