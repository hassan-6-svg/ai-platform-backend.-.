import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function summarizeResponses(responses: { model: string; text: string }[]) {
  const system = "Summarize the following AI responses into one best answer:";
  const userContent = responses
    .map((r, i) => `Model ${i + 1} (${r.model}):\n${r.text}`)
    .join('\n\n');

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: userContent },
    ],
  });

  return completion.choices?.[0]?.message?.content.trim() ?? '';
}