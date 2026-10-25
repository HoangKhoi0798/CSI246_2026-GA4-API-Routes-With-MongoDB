import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Album from "@/lib/models/Album";

// GET handler - Retrieve all albums
export async function GET() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Fetch all albums, sorted by creation date (newest first)
    const albums = await Album.find({}).sort({ createdAt: -1 });

    // Return the albums with a 200 status code
    return NextResponse.json({ albums }, { status: 200 });
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching albums:", error);

    // Return a generic error message to the client
    return NextResponse.json(
      { error: "Failed to fetch albums" },
      { status: 500 },
    );
  }
}

// POST handler - Create a new album
export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const data = await request.json();

    // Create a new album with the provided data
    const newAlbum = await Album.create(data);

    // Return the created album with a 201 status code
    return NextResponse.json({ album: newAlbum }, { status: 201 });
  } catch (error) {
    console.error("Error creating album:", error);
    return NextResponse.json(
      { error: "Failed to create album" },
      { status: 500 },
    );
  }
}
