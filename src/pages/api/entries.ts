import type { APIRoute } from "astro";
import { db } from "../../db";

export const GET: APIRoute = async (ctx) => {
    const url = new URL(ctx.request.url);

    const limit =  getNumericQueryParam(url.searchParams.get('limit'), 50);
    const offset = getNumericQueryParam(url.searchParams.get('offset'), 0);
    const q = url.searchParams.get('q');
    
    // Add the initial params needed for the query
    const params: any = [limit, offset];

    let query = `SELECT *, count(*) OVER()::int AS total FROM entries`;

    if (q) {
        // If the search query param is present, we add a similarity search
        params.push(q);
        query = `${query}
            WHERE
                SIMILARITY(name_first, $3) > 0.4 OR
                SIMILARITY(name_last, $3) > 0.4 OR
                SIMILARITY(street, $3) > 0.4 OR
                SIMILARITY(city, $3) > 0.4
        `;
    }

    query = `${query} ORDER BY seq LIMIT $1 OFFSET $2`;

    const entries = await db.query(query, params);

    const total = entries.rows[0]?.total ?? 0;
    const rowCount = entries.rowCount;

    return new Response(JSON.stringify({
        offset,
        rowCount,
        total,
        entries: entries.rows.map(({total, ...rest}) => rest),
    }), { status: 200 })
}

const getNumericQueryParam = (value: string, fallback: number): number => {
    const parsedValue = parseInt(value);

    if (parsedValue) {
        return parsedValue;
    }

    return fallback;
}