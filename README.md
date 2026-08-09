# Nexzy Money

Nexzy Money is a Next.js MVP for Indian personal finance calculators.

## Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Recharts (ready for charts)
- Client-side calculation architecture

## Local development
1. Install Node.js 20+ (Node 22 recommended).
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:3000

## Hostinger
Deploy as a Node.js Web App. Build command: `npm run build`. Start command: `npm start`.

Do not upload `node_modules`. Hostinger installs dependencies during deployment.

## Important
The tax calculator is an architecture placeholder in this MVP. Before production financial use, populate and test financial-year-specific rules from official sources. Do not publish unverified tax results as authoritative advice.

## Roadmap
- Add verified FY tax rules
- Complete all calculation engines
- Add charts and PDF reports
- Add admin CMS/configuration
- Add privacy-conscious analytics
- Add unit/regression tests
