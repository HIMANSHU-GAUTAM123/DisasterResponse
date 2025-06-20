const { GoogleGenerativeAI } = require("@google/generative-ai");
const { supabase } = require('../supabase/client');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function extractLocationFromText(description) {
  const cacheKey = `gemini-location-${Buffer.from(description).toString('base64')}`;

  // Check cache first
  const { data: cached } = await supabase
    .from('cache')
    .select('value')
    .eq('key', cacheKey)
    .gt('created_at', new Date(Date.now() - 3600000).toISOString()) // 1 hour TTL
    .single();

  if (cached) return cached.value;

  // Call Gemini API if not cached
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
  const prompt = `Extract the primary location name from this disaster description. Return only the location name and nothing else:\n\n${description}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const location = response.text().trim();

    // Cache the result
    await supabase
      .from('cache')
      .upsert({
        key: cacheKey,
        value: location,
        created_at: new Date().toISOString()
      });

    return location;
  } catch (error) {
    console.error(`Gemini location extraction failed: ${error}`);
    throw error;
  }
}

async function verifyImage(imageUrl) {
  if (!process.env.GEMINI_API_KEY) {
    // Mock response
    return { isDisaster: true, confidence: 0.85 };
  }
  // Replace with actual Gemini API call if available
  // ...
  return { isDisaster: true, confidence: 0.92 };
}

module.exports = { extractLocationFromText, verifyImage }; 