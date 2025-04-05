import express from 'express';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const chatBot = async (req, res) => {
  try {
    const userQuestion = req.body.question;

    if (!userQuestion) {
      return res.status(400).json({ success: false, message: 'Question is required' });
    }

    const systemPrompt = `
      You are a helpful and knowledgeable medical assistant. When users ask a medical question, provide a clear, detailed, and accurate answer. Break down complex terms into simple language when necessary, and include:

      1. A brief definition or overview of the topic.
      2. Possible causes, symptoms, and risks if relevant.
      3. Diagnostic methods or how it is usually detected.
      4. Available treatments or next steps.
      5. A disclaimer reminding the user to consult a healthcare professional.

      Do not provide diagnoses, prescribe treatments, or encourage self-treatment. Always maintain a respectful and professional tone.
    `;

    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      messages: [
        { role: 'system', content: systemPrompt.trim() },
        { role: 'user', content: userQuestion }
      ],
    });

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    for await (const chunk of result.toReadableStream()) {
      res.write(chunk);
    }
    res.end();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

app.listen(port, () => {
  console.log(`🩺 Medical Assistant server running at http://localhost:${port}`);
});
export default chatBot