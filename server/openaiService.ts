import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

if (!process.env.OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY is not set. AI summary generation will be disabled.');
}

/**
 * Generate an AI summary for a podcast episode
 * @param title - The episode title
 * @param description - The episode description
 * @returns A summarized version of the episode content
 */
export async function generateEpisodeSummary(title: string, description: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            "You are an expert podcast summarizer. Your task is to create concise, engaging summaries of cricket podcast episodes. " +
            "Focus on the main topics, key points, and interesting insights. Use professional language while maintaining an engaging tone. " +
            "Keep the summary between 100-150 words. Format it as a single paragraph with no bullet points or numbering."
        },
        {
          role: "user",
          content: `Create a concise summary of this cricket podcast episode.\n\nTitle: ${title}\n\nDescription: ${description}`
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return response.choices[0].message.content || "Unable to generate summary.";
  } catch (error: any) {
    console.error("Error generating episode summary:", error);
    return "An error occurred while generating the episode summary.";
  }
}