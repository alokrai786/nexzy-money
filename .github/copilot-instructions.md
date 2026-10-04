# NexzyMoney: standing instructions for Copilot

Project: NexzyMoney, Indian personal finance calculators. Production: https://nexzy.online
Deploy path: GitHub -> Cloudflare Pages (existing project "nexzy-money").
Stack: Next.js App Router, TypeScript, Tailwind CSS, static export. Calculators run client-side.

## Branch rules
- Work only on feature/finance-calculators-upgrade. Check with `git branch --show-current` at the start of every task.
- Never modify, push to, or merge into main. Never create a PR unless I ask. Never switch branches yourself.

## How to work
- Follow docs/BUILD_RULES.md and docs/MASTER_PROMPT.md.
- Work one batch at a time. After each batch: run `npm run build`, `npm run lint` and `npx tsc --noEmit`, fix errors, commit, then STOP and report. Wait for me to type CONTINUE.
- Before the first batch, give me a short plan and wait for me to type APPROVE PLAN. Do not edit files before that.
- Make small, focused changes. Do not rewrite files you were not asked to touch.

## Honesty rules
- Never say something is done, passing, fixed or verified unless you ran the command or opened the file in this session. Otherwise write NOT VERIFIED.
- Report BUILD, LINT and TYPESCRIPT as PASS or FAIL with the real error count.
- If you cannot do something (for example see my Cloudflare dashboard), say so plainly. Write: NOT VERIFIED - CLOUDFLARE DASHBOARD.

## Finance rules
- Keep formulas in lib/finance/ and government rules, rates, slabs and limits in lib/rules/. No financial logic inside React components.
- Do NOT guess any tax slab, rate, limit or date. If unsure, mark TODO-VERIFY and record it in docs/RULES_TO_VERIFY.md (rule, value, financial year, source, verification status, affected calculator).
- Use Indian number formatting (Rs 12,50,000). Never show NaN, Infinity or undefined. Validate every input.
- Say "estimated" never "guaranteed". Every rule-sensitive page needs a "rules may change, verify with official sources" disclaimer.

## Preserve existing work
- Keep every existing useful calculator and its URL. Retire only if broken beyond repair, a true duplicate, or wrong and unfixable. Record every keep/merge/retire decision in docs/CALCULATOR_DECISIONS.md. A retired URL needs a 301 redirect (public/_redirects).
- An already-live page stays live and unchanged until I approve its replacement.
- New or replaced rule-sensitive calculators (PPF, EPF, NPS, Gratuity, Old vs New Tax, HRA, Capital Gains, Crypto Tax) start with published: false in the calculator registry (hidden from homepage, directory, navigation and sitemap, noindex). Never flip published to true without my instruction.

## Static export
- Must stay compatible with Next.js static export and Cloudflare Pages (output: "export", build output in out/). No server actions, API routes, databases or server-only APIs.
- Do not add dependencies without asking me, except a test runner as a dev dependency.
- No fake ads and no real ad or tracking scripts.
