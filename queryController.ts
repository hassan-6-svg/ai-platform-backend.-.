import { Request, Response } from 'express';
import { prisma } from '../server';
import { GPT4Adapter } from '../adapters/gpt4Adapter';
// import { ClaudeAdapter } from '../adapters/claudeAdapter';
// import { GeminiAdapter } from '../adapters/geminiAdapter';
import { summarizeResponses } from '../summarizer';

export default async function queryController(req: Request, res: Response) {
  const { userId, text } = req.body;
  const prompt = text;

  const adapters = [
    new GPT4Adapter(),
    // new ClaudeAdapter(),
    // new GeminiAdapter(),
  ];

  const dbQuery = await prisma.query.create({
    data: {
      text: prompt,
      userId,
    },
  });

  const promises = adapters.map(async (adapter) => {
    const respText = await adapter.sendQuery(prompt);
    const resp = await prisma.response.create({
      data: {
        model: adapter.modelName,
        text: respText,
        queryId: dbQuery.id,
      },
    });
    return { model: adapter.modelName, text: respText };
  });

  const allResponses = await Promise.all(promises);
  const summary = await summarizeResponses(allResponses);
  res.json({ responses: allResponses, summary });
}