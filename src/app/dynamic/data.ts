import { cookies } from "next/headers";

export async function checkAuth() {
    const jar = await cookies();
    const auth = jar.get("auth");
    return auth?.value === "true";
}