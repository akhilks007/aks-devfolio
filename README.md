# aks-devfolio

Personal developer portfolio, built as an npm workspaces monorepo managed with [Lerna](https://lerna.js.org/).

## Packages

- [`packages/devfolio-next-app`](packages/devfolio-next-app) — the portfolio site, built with Next.js.
- [`packages/ui-components`](packages/ui-components) — shared UI components used by the portfolio site.

## Getting started

Install dependencies from the repo root:

```bash
npm install
```

Run the portfolio site in development mode:

```bash
npm run start-next-app
```

The app will be available at [http://localhost:3000](http://localhost:3000).
