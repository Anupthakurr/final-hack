import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// Configuration - USE ENVIRONMENT VARIABLES IN PRODUCTION
const GEMINI_API_KEY = 'AIzaSyBgYyVNNVNSSaz0akKLFL2POIBbZvxblwY'; // Replace with your actual API key
const MODEL_NAME = 'gemini-1.5-pro-latest';
const TEMPERATURE = 0.7;

// System prompt
const systemPrompt =  `You are a helpful and knowledgeable healthcare assistant.

Provide accurate, evidence-based medical information in short paragraphs and clearly structured points using Markdown formatting.

When answering, format like this:
- Start with a 1-2 line paragraph summary
- Use numbered points for steps or structured info
- Use bullet points for lists
- Keep each paragraph or point short (2-3 lines)
- Use markdown syntax for **bold**, _italics_, and [links](https://example.com) when relevant
- Ensure readability for a non-medical audience

Always include:
1. **Brief explanation**
2. **Common symptoms**
3. **General treatment or management**
4. **Prevention tips**
5. **Disclaimer** about professional medical advice
6. **References** to trusted health organizations

Respond clearly and professionally.`;

const chatBot = async (req, res) => {
  try {
    // Validate request
    if (!req.body?.query) {
      return res.status(400).json({ 
        error: 'Query is required in the request body' 
      });
    }

    const llm = new ChatGoogleGenerativeAI({
        model: MODEL_NAME,  // Ensure this is the correct parameter name
        apiKey: GEMINI_API_KEY,
        temperature: TEMPERATURE,
        maxOutputTokens: 2048,
      });
    // Generate response
    const response = await llm.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(req.body.query),
    ]);

    return res.status(200).json({ 
      response: response.content 
    });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ 
      error: 'Failed to process your request',
      details: error.message,
      // Include stack trace only in development
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }
};

export default chatBot;