import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// Configuration - USE ENVIRONMENT VARIABLES IN PRODUCTION
const GEMINI_API_KEY = 'AIzaSyBgYyVNNVNSSaz0akKLFL2POIBbZvxblwY'; // Replace with your actual API key
const MODEL_NAME = 'gemini-1.5-pro-latest';
const TEMPERATURE = 0.7;

// System prompt
const systemPrompt = `You are a helpful and knowledgeable healthcare assistant.
Provide accurate, evidence-based medical information while being clear that you're not replacing professional medical advice.
Always encourage users to consult healthcare professionals for specific medical concerns.
Focus on general health information, wellness tips, and medical education.

When responding to medical questions, always include:
1. A brief explanation of the condition or health topic
2. Common symptoms or signs to be aware of
3. General treatment approaches or management strategies
4. Prevention tips when applicable
5. Clear disclaimer about consulting healthcare professionals
6. References to reputable health organizations when possible`; // Keep your existing prompt

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