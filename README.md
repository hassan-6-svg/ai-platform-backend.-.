# AI Platform Backend

This project is a backend system for querying multiple AI models (like GPT-4) and summarizing their responses.

## Features
- Queries GPT-4 and other models (Claude, Gemini – you can add them)
- Stores responses in a PostgreSQL database
- Summarizes multiple answers into one final response

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Add `.env` file
Create a `.env` file in the root with:
```
DATABASE_URL="your_postgres_url_here"
OPENAI_API_KEY="your_openai_key_here"
```

### 3. Run Prisma Setup
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Start the Server
```bash
npx ts-node src/server.ts
```

Server will run on: `http://localhost:4000`