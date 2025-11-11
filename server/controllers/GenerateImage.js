import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { generateMockResponse } from "../utils/mockImages.js";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

// Check if we should use real AI or mock data
const USE_REAL_AI = process.env.USE_REAL_AI === 'true';

// Setup OpenAI (only if using real AI)
let openai = null;
if (USE_REAL_AI) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  openai = new OpenAIApi(configuration);
}

// Mock function to simulate image generation with realistic delay
const generateMockImage = (prompt) => {
  return new Promise((resolve) => {
    const delay = 2000 + Math.random() * 2000;
    setTimeout(() => {
      const mockDataUrl = generateMockResponse(prompt);
      // Extract just the base64 part to match OpenAI response format
      const base64Part = mockDataUrl.split(',')[1]; // Remove "data:image/svg+xml;base64," prefix
      resolve(base64Part);
    }, delay);
  });
};

// Real OpenAI image generation
const generateRealImage = async (prompt) => {
  const response = await openai.createImage({
    prompt,
    n: 1,
    size: "1024x1024",
    response_format: "b64_json",
  });
  return response.data.data[0].b64_json;
};

// Controller to generate Image (HYBRID VERSION)
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt || prompt.trim().length === 0) {
      return next(createError(400, "Prompt is required"));
    }

    let generatedImage;

    if (USE_REAL_AI) {
      console.log(`🤖 Generating REAL AI image for prompt: "${prompt}"`);
      generatedImage = await generateRealImage(prompt);
      console.log("✅ Real AI image generated successfully");
    } else {
      console.log(`🎭 Generating MOCK image for prompt: "${prompt}"`);
      generatedImage = await generateMockImage(prompt);
      console.log("✅ Mock image generated successfully");
    }

    res.status(200).json({ photo: generatedImage });

  } catch (error) {
    const errorMsg = USE_REAL_AI ? "OpenAI API failed" : "Mock generation failed";
    console.error(`❌ ${errorMsg}:`, error);

    next(
      createError(
        error.status || 500,
        error?.response?.data?.error?.message || error.message || "Failed to generate image"
      )
    );
  }
};
