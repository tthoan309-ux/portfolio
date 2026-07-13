# Tran Thuan Hoan — Academic Portfolio

A content-driven academic portfolio for Tran Thuan Hoan (Marcuz), an undergraduate researcher in International Economics at Foreign Trade University.

## Stack

- Next.js 15 App Router and React 19
- TypeScript and Tailwind CSS v4
- shadcn/ui-style primitives, Framer Motion, and Lucide
- JSON content collections and MDX research/blog entries
- pnpm, ESLint, and Prettier

## Local development

```bash
pnpm install
pnpm dev
```

Create a production build with `pnpm build`.

## Content system

The site is edited through `content/`:

- `profile.json` — identity, education, languages, and coursework
- `experience.json` — research experience and leadership
- `skills.json` — research interests and technical toolkit
- `publications.json` — working papers, conference papers, and notes
- `activities.json` — awards and academic activities
- `research/*.mdx` — research project records and case studies
- `posts/*.mdx` — searchable field notes

Adding an MDX file with the same frontmatter structure automatically creates a card, a detail page, and a sitemap entry.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL, then deploy the repository to Vercel. No database or external service is required.
