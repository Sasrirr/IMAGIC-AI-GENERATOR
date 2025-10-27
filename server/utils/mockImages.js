// Mock image generator with sample base64 images
// NOTE: These are placeholder images - replace with actual sample images for better demo
export const mockImageData = {
    // Orange gradient (represents sunset/landscape)
    sunset: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAANlBMVEX/wAD/0AD/vwD/ygD/xAD/1QD/2gD/zQD/yQD/0wD/3wD/5gD/4AD/6QD/7wD/8wD/9wD//wCpWe8yAAAACXBIWXMAAAsSAAALEgHS3X78AAAB9klEQVR4nO3dyUrEQBRAUZ+g6P8fW1BQcFzI5SbvnLUz3SRVXZLu7gYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",

    // Blue gradient (represents abstract/space)
    abstract: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAANlBMVEX/AAD/EAD/IAD/MAD/QAD/UAD/YAD/cAD/gAD/kAD/oAD/sAD/wAD/0AD/4AD/8AD//wCLfW7VAAAACXBIWXMAAAsSAAALEgHS3X78AAAB9klEQVR4nO3dyUrEQBRAUZ+g6P8fW1BQcFzI5SbvnLUz3SRVXZLu7gYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",

    // Purple gradient (represents space/galaxy)
    space: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAANlBMVEX/AH//EH//IH//MH//QH//UH//YH//cH//gH//kH//oH//sH//wH//0H//4H//8H///H8mKv8yAAAACXBIWXMAAAsSAAALEgHS3X78AAAB9klEQVR4nO3dyUrEQBRAUZ+g6P8fW1BQcFzI5SbvnLUz3SRVXZLu7gYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",

    // Green gradient (represents nature)
    nature: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAANlBMVEX/wP8A/wAA/xAA/yAA/zAA/0AA/1AA/2AA/3AA/4AA/5AA/6AA/7AA/8AA/9AA/+AA/+A/wCsAAAAACXBIWXMAAAsSAAALEgHS3X78AAAB9klEQVR4nO3dyUrEQBRAUZ+g6P8fW1BQcFzI5SbvnLUz3SRVXZLu7gYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",

    // Gray gradient (represents city/urban)
    city: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAANlBMVEXAwMC8vLy4uLi0tLS9vb2xsbGtra2pqamnp6ehoaGdnZ2bm5uXl5eTk5OPj4+Li4uHh4eDg4N/f3+bAAAACXBIWXMAAAsSAAALEgHS3X78AAAB9klEQVR4nO3dyUrEQBRAUZ+g6P8fW1BQcFzI5SbvnLUz3SRVXZLu7gYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",

    // Default colorful pattern
    default: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAOVBMVEX/wAD/AAD/gAD/IAD/MAD/QAD/UAD/YAD/cAD/kAD/oAD/sAD/wAD/0AD/4AD/8AD//wD/EAD/vwCWbG8yAAAACXBIWXMAAAsSAAALEgHS3X78AAAB9klEQVR4nO3dyUrEQBRAUZ+g6P8fW1BQcFzI5SbvnLUz3SRVXZLu7gYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
};

// Mock responses based on prompt keywords
export const generateMockResponse = (prompt) => {
    const lowerPrompt = prompt.toLowerCase();

    // Simple keyword matching for different mock images
    if (lowerPrompt.includes('sunset') || lowerPrompt.includes('mountain') || lowerPrompt.includes('landscape')) {
        return mockImageData.sunset;
    } else if (lowerPrompt.includes('abstract') || lowerPrompt.includes('art') || lowerPrompt.includes('painting')) {
        return mockImageData.abstract;
    } else if (lowerPrompt.includes('space') || lowerPrompt.includes('galaxy') || lowerPrompt.includes('stars')) {
        return mockImageData.space;
    } else if (lowerPrompt.includes('nature') || lowerPrompt.includes('forest') || lowerPrompt.includes('tree')) {
        return mockImageData.nature;
    } else if (lowerPrompt.includes('city') || lowerPrompt.includes('building') || lowerPrompt.includes('urban')) {
        return mockImageData.city;
    } else {
        // Default to colorful pattern for unmatched prompts
        return mockImageData.default;
    }
};