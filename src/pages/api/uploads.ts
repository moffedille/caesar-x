import type { APIRoute } from "astro";
import { db } from "../../db";

export const GET: APIRoute = async () => {
    const uploads = db.query('SELECT * from uploads');

    if (uploads) {
        return new Response(JSON.stringify(uploads), { status: 200 });
    } else {
        return new Response(JSON.stringify([]), { status: 200 });
    }
}