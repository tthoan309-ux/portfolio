# Tran Thuan Hoan — Academic Research Portfolio

A content-driven academic website for Tran Thuan Hoan (Marcuz), an undergraduate researcher in International Economics at Foreign Trade University.

## Stack

- Next.js 15 App Router and React 19
- TypeScript and Tailwind CSS v4
- shadcn/ui-style primitives, Framer Motion, and Lucide
- JSON content collections and MDX research notes/case studies
- pnpm, ESLint, and Prettier

## Run locally on Windows PowerShell

Corepack ships with Node.js and reads the pinned pnpm version from this repository.

```powershell
cd Z:\Marcuz1\Portfolio
corepack pnpm install
corepack pnpm dev
```

Open <http://localhost:3000> while the terminal remains running. Stop the server with `Ctrl + C`.

Create a production build with:

```powershell
corepack pnpm build
```

## Content system

The site is edited through `content/`:

- `profile.json` — identity, education, languages, and coursework
- `experience.json` — research experience and leadership
- `capabilities.json` — research capability domains and their evidence
- `research-agenda.json` — current and evolving research directions
- `publications.json` — working papers and research notes
- `research/*.mdx` — research case studies
- `posts/*.mdx` — searchable research notes

Adding an MDX file with the required frontmatter automatically creates a research page and sitemap entry. Add its slug to `capabilities.json` to place it under a capability on the homepage.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL, then deploy the repository to Vercel. No database or external service is required.
