import { getCache } from "@vercel/functions";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest,   { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const cache = getCache();
    if(!id){
        return new Response('No id provided', { status: 400 });
    }
    const data = await cache.get(`runtime-cache-${id}`);
    return new Response(JSON.stringify(data), { status: 200 });
}