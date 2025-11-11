import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import generateImageRoute from "./routes/GenerateImage.js";
import posts from "./routes/Posts.js";

dotenv.config();

const app = express();

// CORS configuration for production
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://localhost:3000", 
    /https:\/\/.*\.vercel\.app$/,
    /https:\/\/.*\.railway\.app$/
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); // for form data

app.use("/api/generateImage/", generateImageRoute);
app.use("/api/post/", posts);

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello Users",
  });
});

const connectDB = () => {
  console.log("🔍 Debug - MONGODB_URL:", process.env.MONGODB_URL ? "SET" : "NOT SET");
  console.log("🔍 Debug - URL starts with:", process.env.MONGODB_URL?.substring(0, 20));

  // Check if we have a valid MongoDB URL
  if (!process.env.MONGODB_URL || process.env.MONGODB_URL.includes('localhost') || process.env.MONGODB_URL.includes('mock')) {
    console.log("🎭 Running in MOCK mode - MongoDB connection skipped");
    return;
  }

  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 30000, // 30 second timeout
      socketTimeoutMS: 45000, // 45 second socket timeout
      bufferMaxEntries: 0, // Disable mongoose buffering
      maxPoolSize: 10, // Maintain up to 10 socket connections
    })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => {
      console.error("❌ Failed to connect to MongoDB");
      console.error(err);
    });
};

const startServer = async () => {
  try {
    connectDB();
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
      console.log("🗄️  Database: Real MongoDB Atlas");
      console.log("🎨 Image Generation: Mock (free gradients)");
      console.log("☁️  Image Storage: Real Cloudinary");
      console.log("💰 Total Cost: $0 (all free tiers)");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
