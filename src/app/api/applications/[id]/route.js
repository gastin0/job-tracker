import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const client = await clientPromise;
    const db = client.db("job-tracker");

    const application = await db.collection("applications").findOne({
        _id: new ObjectId(params.id),
    });

    if (!application) {
        return NextResponse.json({ error: "Not found!" }, { status: 404 });
    }

    return NextResponse.json({
        ...application,
        _id: application._id.toString(),
    });
}

export async function PUT(req, { params }) {
    const adminSecret = req.headers.get("x-admin-secret");

    if (adminSecret !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("job-tracker");

    await db.collection("applications").updateOne(
        { _id: new ObjectId(params.id) },
        { $set: body }      
    );

    return NextResponse.json({ success: true });
}

export async function DELETE(req, { params }) {
    const adminSecret = req.headers.get("x-admin-secret");

    if (adminSecret !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("job-tracker");

    await db.collection("applications").deleteOne({
        _id: new ObjectId(params.id),
    });

    return NextResponse.json({ success: true });
}
