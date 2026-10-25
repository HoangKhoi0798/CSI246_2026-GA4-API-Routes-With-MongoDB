import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Album from "@/lib/models/Album";

// Helper function to check if an ID is valid
function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

// GET handler - Retrieve a specific album
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Validate the ID format
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
    }

    await connectToDatabase();

    // Find the album by ID
    const album = await Album.findById(id);

    // Check if album exists
    if (!album) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    return NextResponse.json({ album }, { status: 200 });
  } catch (error) {
    console.error("Error fetching album:", error);
    return NextResponse.json(
      { error: "Failed to fetch album" },
      { status: 500 },
    );
  }
}

// PUT handler - Update a specific album
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Validate the ID format
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
    }

    await connectToDatabase();

    // Get the update data from the request body
    const updateData = await request.json();

    // Find and update the album
    const updatedAlbum = await Album.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    // Check if album exists
    if (!updatedAlbum) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    return NextResponse.json({ album: updatedAlbum }, { status: 200 });
  } catch (error) {
    console.error("Error updating album:", error);
    return NextResponse.json(
      { error: "Failed to update album" },
      { status: 500 },
    );
  }
}

// DELETE handler - Delete a specific album
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Validate the ID format
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid album ID" }, { status: 400 });
    }

    await connectToDatabase();

    // Find and delete the album
    const deletedAlbum = await Album.findByIdAndDelete(id);

    // Check if album exists
    if (!deletedAlbum) {
      return NextResponse.json({ error: "Album not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Album deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting album:", error);
    return NextResponse.json(
      { error: "Failed to delete album" },
      { status: 500 },
    );
  }
}
