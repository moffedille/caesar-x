import type { APIRoute } from "astro";
import { Readable } from 'stream';
import csv from 'csv-parser';
import { db } from "../../db";

export const POST: APIRoute = async (ctx) => {
    const data = await ctx.request.formData();
    const file = data.get("file") as File;

    if (file) {
        // Record that we have started parsing the file
        db.query('INSERT INTO uploads (file_name, state) VALUES ($1, $2)', [
            file.name,
            'pending',
        ]);

        try {
            const text = await file.text();
            const stream = new Readable();
            
            // Add a `noop` function implementation to avoid runtime errors
            stream._read = () => {};
            
            stream.push(text);
            
            // Add EOF to stream
            stream.push(null);

            const results = [];
            stream
                .pipe(csv({
                    // Make sure we don't have slashes in column names
                    mapHeaders: ({ header }) => header.replace(/\//g, '_'),
                }))
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                    for (const entry of results) {
                        const {
                            seq,
                            name_first,
                            name_last,
                            age, street,
                            city, state,
                            latitude,
                            longitude,
                            ccnumber
                        } = entry;
    
                        await db.query(
                            `INSERT INTO entries (
                                seq,
                                name_first,
                                name_last,
                                age,
                                street,
                                city,
                                state,
                                latitude,
                                longitude,
                                ccnumber
                            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                            ON CONFLICT (seq) DO
                            UPDATE
                            SET
                                name_first=$2,
                                name_last=$3,
                                age=$4,
                                street=$5,
                                city=$6,
                                state=$7,
                                latitude=$8,
                                longitude=$9,
                                ccnumber=$10
                            `,
                            [
                                seq,
                                name_first,
                                name_last,
                                age,
                                street,
                                city,
                                state,
                                latitude,
                                longitude,
                                ccnumber,
                            ]
                        );
                    }

                    db.query('UPDATE uploads SET state=$1 WHERE file_name=$2', [
                        'success',
                        file.name,
                    ]);
                });

            return new Response(null, { status: 200 });
        } catch {
            // If we encounter an error, we should mark the file as such
            db.query('UPDATE uploads SET state=$1 WHERE file_name=$2', [
                'error',
                file.name,
            ]);

            return new Response(null, { status: 400 });
        }
    }

    return new Response(null, { status: 400 });
}
