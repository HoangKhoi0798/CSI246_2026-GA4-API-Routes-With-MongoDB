import mongoose from "mongoose";

// Define the interface for our Album document
interface IAlbum extends mongoose.Document {
  title: string;
  artist: string;
  year: number;
  genre: string;
  createdAt: Date;
  updatedAt: Date;
}

// Check if the model already exists before creating a new one
// This is important in Next.js development due to hot reloading
const Album =
  mongoose.models.Album ||
  mongoose.model<IAlbum>(
    "Album",
    new mongoose.Schema(
      {
        title: {
          type: String,
          required: [true, "Please provide an album title"],
          maxlength: [100, "Title cannot be more than 100 characters"],
        },
        artist: {
          type: String,
          required: [true, "Please provide an artist name"],
          maxlength: [100, "Artist name cannot be more than 100 characters"],
        },
        year: {
          type: Number,
          required: [true, "Please provide a release year"],
          min: [1900, "Year must be after 1900"],
          max: [new Date().getFullYear(), "Year cannot be in the future"],
        },
        genre: {
          type: String,
          required: [true, "Please provide a genre"],
          maxlength: [50, "Genre cannot be more than 50 characters"],
        },
      },
      {
        timestamps: true, // This automatically adds createdAt and updatedAt fields
      },
    ),
  );

export default Album;
