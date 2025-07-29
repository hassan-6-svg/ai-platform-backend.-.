import { LLMAdapter } from './LLMAdapter';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export class GPT4Adapter implements LLMAdapter {
  modelName = 'gpt-4';

  async sendQuery(prompt: string): Promise<string> {
    const res = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });
    return res.choices?.[0]?.message?.content.trim() ?? '';
  }
}