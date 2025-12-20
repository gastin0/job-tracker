import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("job_tracker");

        const collections = await db
        .listCollections()
        .toArray();

        return Response.json({
            status: "connected",
            collections: collections.map(c => c.name),
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500}
        );
    }
}