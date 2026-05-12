
---

# 2️⃣ ARCHITECTURE.md

```md id="md2"
# Architecture

## Stack Choice

- Next.js for frontend and routing
- TypeScript for safer development
- Supabase for backend/database
- Tailwind CSS for UI
- Vercel for deployment

## System Flow

```mermaid
graph TD
A[User Input Form] --> B[Audit Engine]
B --> C[Savings Calculation]
C --> D[AI Summary Generation]
D --> E[Supabase Storage]
E --> F[Public Audit URL]
F --> G[History Dashboard]