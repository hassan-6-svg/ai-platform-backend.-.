import express from 'express';
import queryController from './controllers/queryController';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.post('/api/query', queryController);

app.listen(4000, () => console.log('Server running on port 4000'));