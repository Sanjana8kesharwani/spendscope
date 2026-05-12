# Reflection

## 1. Hardest Bug

The hardest bug was handling Supabase RLS permissions and table access issues. The app was failing silently during inserts. I debugged by checking browser console logs, verifying API exposure settings, and finally fixing table permissions using SQL GRANT statements.

## 2. Decision Reversal

Initially I planned to use server-side rendering for the audit page, but later moved parts to client-side state handling because dynamic interactions and lead capture became easier to manage.

## 3. Week 2 Improvements

If I had another week, I would add PDF export, benchmark analytics, advanced audit recommendations, authentication, and more detailed AI analysis.

## 4. AI Usage

I used ChatGPT for debugging help, architecture decisions, UI improvements, and productivity acceleration. I did not fully trust AI-generated code without reviewing it carefully. One example where AI was wrong was a Supabase permission fix suggestion that conflicted with my existing RLS setup.

## 5. Self Rating

- Discipline: 8/10 — Worked consistently across multiple days.
- Code Quality: 7/10 — Good structure but can improve modularization.
- Design Sense: 8/10 — Focused heavily on clean SaaS UI patterns.
- Problem Solving: 8/10 — Resolved multiple backend and deployment issues.
- Entrepreneurial Thinking: 7/10 — Focused on user value and lead generation flow.