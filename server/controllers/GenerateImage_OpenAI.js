import * as dotenv from "dotenv";
import { createError } from "../error.js";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

// Setup OpenAI API key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Controller to generate Image (REAL OPENAI VERSION)
export const generateImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        // Validate prompt
        if (!prompt || prompt.trim().length === 0) {
            return next(createError(400, "Prompt is required"));
        }

        console.log(`🤖 Generating real AI image for prompt: "${prompt}"`);

        // Call OpenAI DALL-E API
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });

        const generatedImage = response.data.data[0].b64_json;

        console.log("✅ Real AI image generated successfully");
        res.status(200).json({ photo: generatedImage });

    } catch (error) {
        console.error("❌ OpenAI image generation failed:", error);
        next(
            createError(
                error.status,
                error?.response?.data?.error?.message || error.message
            )
        );
    }
};