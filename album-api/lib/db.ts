import mongoose from "mongoose";

// Track the connection status
let isConnected = false;

export const connectToDatabase = async () => {
  // If we're already connected, use the existing connection
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    // Check if we have a MONGODB_URI environment variable
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local",
      );
    }

    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI, {
      // These options help with connection stability
      bufferCommands: false,
    });

    // Update connection status
    isConnected = true;
    console.log("New database connection established");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};
