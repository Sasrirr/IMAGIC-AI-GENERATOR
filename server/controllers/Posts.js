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
    const { name, prompt, photo } = req.body;
    
    // Check if MongoDB is connected
    const mongoose = await import('mongoose');
    if (mongoose.default.connection.readyState !== 1) {
      console.log("⚠️ MongoDB not connected, cannot save post");
      return res.status(200).json({ 
        success: true, 
        data: { name, prompt, photo: "demo-image.jpg" },
        message: "Demo mode - post not saved to database" 
      });
    }

    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.secure_url,
    });

    return res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    console.log("Error creating post:", error.message);
    
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
