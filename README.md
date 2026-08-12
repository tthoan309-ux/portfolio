# Trần Thuận Hoàn — Academic Research Portfolio

A content-driven academic website for Trần Thuận Hoàn (preferred name: Marcuz), an undergraduate researcher in International Economics at Foreign Trade University.

## Stack

- Next.js 15 App Router and React 19
- TypeScript and Tailwind CSS v4
- shadcn/ui-style primitives, Framer Motion, and Lucide
- JSON content collections and MDX research pages
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
- `capabilities.json` — research topics and their research entries
- `competencies.json` — broader competency areas and supporting evidence
- `applied-work.json` — coursework, dashboards, and machine-learning work shown separately from research
- `publications.json` — research in preparation and research notes
- `research/*.mdx` — individual research pages
- `posts/*.mdx` — searchable research notes

Adding an MDX file with the required frontmatter automatically creates a research page and sitemap entry. Add its slug to `capabilities.json` to place it under a capability on the homepage.

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the canonical production URL, then deploy the repository to Vercel. No database or external service is required.

## CV source

The public CV is authored in XeLaTeX so Vietnamese typography and hyperlinks remain native in the PDF:

```powershell
xelatex -interaction=nonstopmode -halt-on-error -output-directory=output/pdf cv/Tran_Thuan_Hoan_Research_CV.tex
```

The source is `cv/Tran_Thuan_Hoan_Research_CV.tex`; the website serves the verified build from `public/marcuz-cv.pdf`.
