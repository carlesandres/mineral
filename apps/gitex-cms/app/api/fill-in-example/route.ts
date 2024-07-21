import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

// Create an OpenAI API client (that's edge friendly!)
const config = {
  apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(config);

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { prompt } = await req.json();

  const messages: ChatCompletionMessageParam[] = [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: prompt },
  ];

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    messages,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
