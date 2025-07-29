export interface LLMAdapter {
  modelName: string;
  sendQuery(prompt: string): Promise<string>;
}