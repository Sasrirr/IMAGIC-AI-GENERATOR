import Post from "../models/Posts.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
export const getAllPosts = async (req, res, next) => {
  try {
    // Check if MongoDB is connected
    const mongoose = await import('mongoose');
    if (mongoose.default.connection.readyState !== 1) {
      console.log("⚠️ MongoDB not connected, returning empty posts array");
      return res.status(200).json({
        success: true,
        data: [],
        message: "Database not connected - running in demo mode"
      });
    }

    const posts = await Post.find({}).timeout(5000); // 5 second timeout
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error.message);

    // Return empty array instead of error for better UX
    if (error.message.includes('buffering timed out') || error.message.includes('timeout')) {
      console.log("🔄 Database timeout - returning empty posts array");
      return res.status(200).json({
        success: true,
        data: [],
        message: "Database timeout - running in demo mode"
      });
    }

    return next(
      createError(
        error.status || 500,
        error?.response?.data?.error?.message || error.message
      )
    );
  }
};

// Create new post
export const createPost = async (req, res, next) => {
  try {
    console.log("📥 CREATE POST REQUEST RECEIVED");
    console.log("📊 Request body keys:", Object.keys(req.body));
    
    const { name, prompt, photo } = req.body;
    
    console.log("📝 Post creation data:");
    console.log("  - Name:", name);
    console.log("  - Prompt:", prompt);
    console.log("  - Photo length:", photo ? photo.length : 0);
    console.log("  - Photo type:", photo ? (photo.startsWith('data:') ? 'base64 data URL' : 'unknown format') : 'no photo');

    // Check if MongoDB is connected
    const mongoose = await import('mongoose');
    console.log("🔍 MongoDB connection state:", mongoose.default.connection.readyState);
    
    if (mongoose.default.connection.readyState !== 1) {
      console.log("⚠️ MongoDB not connected, returning demo response");
      const demoResponse = {
        success: true,
        data: { name, prompt, photo: "demo-image.jpg" },
        message: "Demo mode - post not saved to database"
      };
      console.log("📤 Sending demo response:", demoResponse);
      return res.status(200).json(demoResponse);
    }

    console.log("☁️ Uploading to Cloudinary...");
    const photoUrl = await cloudinary.uploader.upload(photo);
    console.log("✅ Cloudinary upload successful:", photoUrl.secure_url);
    
    console.log("💾 Saving to MongoDB...");
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.secure_url,
    });
    console.log("✅ Post saved to MongoDB:", newPost._id);

    const response = { success: true, data: newPost };
    console.log("📤 Sending success response");
    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error in createPost:", error.message);
    console.error("🔍 Error stack:", error.stack);

    // Handle timeout or connection errors gracefully
    if (error.message.includes('buffering timed out') || error.message.includes('timeout')) {
      console.log("🔄 Database timeout during post creation");
      const { name, prompt } = req.body;
      return res.status(200).json({
        success: true,
        data: { name, prompt, photo: "demo-image.jpg" },
        message: "Demo mode - post not saved due to database timeout"
      });
    }

    return next(
      createError(error.status || 500, error?.response?.data?.error?.message || error.message)
    );
  }
};
