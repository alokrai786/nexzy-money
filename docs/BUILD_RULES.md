You are the lead developer for NexzyMoney.

PROJECT:
NexzyMoney — Indian Personal Finance Calculator Platform

PRODUCTION DOMAIN:
https://nexzy.online

DEPLOYMENT:
GitHub → Cloudflare Pages → nexzy.online

CURRENT DEVELOPMENT BRANCH:
feature/finance-calculators-upgrade

PRIMARY GOAL:
Build a production-ready NexzyMoney website with 20 high-quality Indian personal-finance calculators as quickly as practical, while preserving all useful existing calculators and URLs.

Do NOT spend a separate long Phase 0 auditing the repository.

Instead:
1. inspect the existing repository,
2. give me a short implementation plan,
3. STOP for my approval,
4. after approval, develop the website in controlled batches.

==================================================
1. FIRST — VERIFY BRANCH
==================================================

Run:

git branch --show-current
git status

You must be on:

feature/finance-calculators-upgrade

If not, STOP and tell me.

Do NOT switch branches automatically.

Do NOT modify main.

Do NOT merge into main.

==================================================
2. PLAN BEFORE EDITING
==================================================

Before changing ANY file, inspect the repository.

Read at minimum:

CLAUDE.md (if it exists)
.github/copilot-instructions.md (if it exists)
docs/
package.json
next.config.*
app/
components/
lib/
public/

Also inspect existing:

- calculators
- routes
- homepage
- sitemap
- robots
- finance formulas
- SEO implementation
- static-export configuration

Then give me a SHORT plan.

The plan must contain:

A. Existing calculators + current URLs

For each existing calculator:

KEEP
MERGE
RETIRE

DEFAULT = KEEP.

B. Existing rule-sensitive calculators already live

Identify existing pages for:

PPF
EPF
NPS
Gratuity
Old vs New Tax
HRA
Capital Gains
Crypto Tax

Do NOT assume they are unpublished merely because they are rule-sensitive.

If an existing calculator is already part of the current site, preserve its URL and existing working version until its replacement is approved.

C. Static-export status

Tell me whether the repository currently appears compatible with:

Next.js static export → Cloudflare Pages

Only judge repository compatibility.

You cannot see my Cloudflare dashboard.

Anything requiring dashboard access must say:

NOT VERIFIED — CLOUDFLARE DASHBOARD

D. Proposed implementation architecture

E. Proposed batch order

F. Major risks/blockers

G. New dependencies

List every package you want to add, with the reason. A test runner (for example Vitest) is allowed as a dev dependency. Anything else needs my approval.

Then STOP.

DO NOT EDIT FILES YET.

Wait for me to type exactly:

APPROVE PLAN

Do not begin implementation before that.

==================================================
3. THE 20 REQUIRED CALCULATORS
==================================================

After I approve the plan, build these 20 calculators:

1. SIP Calculator
2. Step-Up SIP Calculator
3. Lumpsum Mutual Fund Calculator
4. FD Calculator
5. RD Calculator
6. CAGR Calculator
7. PPF Calculator
8. NPS Calculator
9. EPF Calculator
10. Gratuity Calculator
11. Old vs New Tax Regime Calculator
12. HRA Calculator
13. Capital Gains Tax Calculator
14. Crypto Tax Calculator
15. Home Loan EMI Calculator
16. Personal / Car Loan EMI Calculator
17. Loan Prepayment Calculator
18. Inflation / Future Goal Calculator
19. Rent vs Buy Calculator
20. Rule of 72 / 114 Calculator

These must be REAL calculators.

Do not count:

- placeholders
- navigation links
- empty pages
- TODO components

as completed calculators.

==================================================
4. PRESERVE EXISTING USEFUL TOOLS
==================================================

Do NOT blindly replace the current website.

Preserve useful existing tools such as:

- CTC → In-Hand Salary
- Salary Hike Calculator
- Job Offer Comparison
- Financial Health Score
- Retirement Calculator
- existing SIP
- existing Step-Up SIP
- existing Home Loan EMI
- existing Loan Prepayment
- and any other useful existing calculator

If an existing calculator overlaps with one of the new 20:

prefer:

MERGE/MODERNIZE + KEEP EXISTING URL

rather than creating duplicate URLs.

Never silently delete a working calculator.

==================================================
5. ARCHITECTURE
==================================================

Create a reusable finance architecture.

Prefer something like:

lib/finance/
lib/rules/
lib/utils/

Keep financial calculations separate from React UI components.

Create reusable utilities for:

- Indian currency formatting
- percentages
- validation
- rounding
- EMI calculations
- investment calculations
- financial result formatting

Use Indian number formatting:

₹12,50,000

not:

₹1,250,000

Use shared calculator components/layouts where practical.

==================================================
6. CALCULATOR PAGE STANDARD
==================================================

Each calculator should include:

- dedicated URL
- useful title
- short introduction
- calculator inputs
- input validation
- Calculate/Reset behavior where appropriate
- results
- result breakdown
- chart/table where genuinely useful
- formula explanation
- worked example
- visible FAQ
- related calculators
- financial disclaimer
- SEO metadata
- canonical URL

Pages must be:

- mobile-first
- responsive
- accessible
- fast
- visually consistent
- professional fintech quality

Never display:

NaN
Infinity
undefined

==================================================
7. FINANCIAL RULE SAFETY
==================================================

Do NOT guess:

- government rates
- tax slabs
- limits
- exemptions
- contribution limits
- financial-year rules
- capital-gains rules
- crypto-tax rules

Centralize regulated/current rules under:

lib/rules/

Batch 1 must create:

docs/RULES_TO_VERIFY.md

For every rule-sensitive value record:

- rule
- value/rate/limit
- applicable financial year/date
- source
- verification status
- affected calculator

If uncertain, mark:

TODO-VERIFY

Never silently invent a value.

==================================================
8. PUBLICATION SAFETY
==================================================

Create a central calculator registry/configuration with a field such as:

published: true | false

New rule-sensitive calculators should initially use:

published: false

until their rules are approved.

This applies to newly built/replaced:

- PPF
- EPF
- NPS
- Gratuity
- Old vs New Tax
- HRA
- Capital Gains
- Crypto Tax

For published:false calculators:

- exclude from homepage
- exclude from calculator directory
- exclude from navigation
- exclude from sitemap
- do not create normal public internal links
- use noindex if their route is generated

IMPORTANT EXCEPTION:

A calculator that is ALREADY LIVE as part of the current NexzyMoney site must not disappear merely because it is rule-sensitive.

For an already-live rule-sensitive calculator:

- preserve its current URL
- keep the existing working version available
- do not replace/hide it until I approve the new implementation
- list it explicitly in your initial plan

Only newly built/replaced rule-sensitive calculators start unpublished.

Never change a published status without my instruction.

==================================================
9. BATCH 1 — FOUNDATION
==================================================

After I say APPROVE PLAN:

Build:

- shared finance architecture
- shared validation
- Indian formatting utilities
- reusable calculator UI
- reusable result components
- chart components where useful
- calculator registry
- shared SEO utilities where useful
- testing structure

Create:

docs/CALCULATOR_DECISIONS.md
docs/RULES_TO_VERIFY.md

Populate CALCULATOR_DECISIONS.md using the approved plan.

Run:

npm run build
npm run lint
npx tsc --noEmit

Fix production-impacting errors.

Commit Batch 1.

Then STOP.

Give me:

BUILD: PASS/FAIL
LINT: PASS/FAIL
TYPESCRIPT: PASS/FAIL
COMMIT: <hash>
FILES CHANGED:
ISSUES:

Wait for:

CONTINUE

==================================================
10. BATCH 2 — INVESTMENTS
==================================================

Build:

1. SIP
2. Step-Up SIP
3. Lumpsum
4. CAGR
5. Rule of 72/114
6. FD
7. RD

Reuse/modernize existing calculators where appropriate.

Do not duplicate existing URLs unnecessarily.

Add unit tests for core formulas.

Then run:

npm run build
npm run lint
npx tsc --noEmit

Fix errors.

Commit.

STOP and wait for:

CONTINUE

==================================================
11. BATCH 3 — RETIREMENT
==================================================

Build:

8. PPF
9. EPF
10. NPS
11. Gratuity

Every government rule/rate/limit used must be entered in:

docs/RULES_TO_VERIFY.md

in this SAME batch.

Do not guess rules.

Keep these new/replacement implementations unpublished until approved, subject to the existing-live-page exception.

Test formulas.

Run:

npm run build
npm run lint
npx tsc --noEmit

Commit.

STOP and wait for:

CONTINUE

==================================================
12. BATCH 4 — LOANS + PLANNING
==================================================

Build:

12. Home Loan EMI
13. Personal / Car Loan EMI
14. Loan Prepayment
15. Inflation / Future Goal
16. Rent vs Buy

Preserve existing URLs wherever practical.

Use the shared finance engine.

Test formulas.

Run:

npm run build
npm run lint
npx tsc --noEmit

Commit.

STOP and wait for:

CONTINUE

==================================================
13. BATCH 5 — WEBSITE + SEO
==================================================

Upgrade/build:

Homepage
/calculators
Guides
About
Contact
/privacy
/terms
/disclaimer

Keep /privacy as the canonical privacy page unless the existing repo proves another route is required.

Homepage message:

"Understand Your Money in Seconds."

Supporting message:

"Calculate salary, tax, EMIs, investments and financial goals with simple tools designed around Indian money decisions."

Create calculator categories such as:

Investments
Taxes
Loans
Retirement
Salary
Financial Planning

Show a category on the homepage and in /calculators only if it has at least one published calculator.

Create a polished fintech homepage.

Replace unfinished/blank hero visuals with a lightweight CSS/React visual.

Do NOT use random stock images.

Implement:

- metadata
- unique titles/descriptions
- canonical URLs
- Open Graph
- breadcrumbs
- JSON-LD where appropriate
- visible FAQs
- FAQ schema only when FAQs are actually visible
- internal linking
- related calculators
- sitemap
- robots

Do not create hundreds of thin SEO pages.

==================================================
14. MONETIZATION READINESS
==================================================

Create reusable:

AffiliateBanner
AffiliateCard
AdPlaceholder

Possible placements:

- after results
- between educational sections
- near related calculators
- desktop sidebar where appropriate

Do NOT insert fake advertisements.

Do NOT add real ad-network scripts yet.

Create a central configuration so monetization can be enabled later.

==================================================
15. BATCH 6 — TAX
==================================================

Build LAST:

17. Old vs New Tax Regime
18. HRA
19. Capital Gains Tax
20. Crypto Tax

All rates/slabs/limits must live in:

lib/rules/

Update:

docs/RULES_TO_VERIFY.md

For every important rule.

Do NOT guess.

Test realistic cases.

Keep new/replacement versions unpublished until I approve the relevant rules.

Do not present calculator estimates as official tax advice.

Run:

npm run build
npm run lint
npx tsc --noEmit

Commit.

STOP.

AFTER BATCH 6:
When I type CONTINUE after Batch 6, run the FINALIZE step: sections 16 (static export), 19 (final quality gate), 21 (Cloudflare preview checklist) and 22 (deployment handoff). Then STOP.

==================================================
16. STATIC EXPORT / CLOUDFLARE
==================================================

The project must remain compatible with:

Next.js static export
Cloudflare Pages

Verify repository configuration for:

output: "export"

Verify the build produces:

out/

Verify key generated HTML files actually exist under out/.

If Next.js Image optimization is incompatible with static export in this project, configure appropriately, for example:

images: {
  unoptimized: true
}

only where actually required.

Do not add:

- unnecessary server actions
- server-only APIs
- databases
- unsupported dynamic runtime requirements

Use:

public/_redirects

for Cloudflare Pages redirects where redirects are required.

Ensure sitemap and robots work with static export.

Do NOT claim my Cloudflare dashboard settings are verified.

Say:

NOT VERIFIED — CLOUDFLARE DASHBOARD

for dashboard-specific configuration.

==================================================
17. URL PRESERVATION
==================================================

Preserve existing useful URLs.

If a route genuinely must be retired:

1. document it in CALCULATOR_DECISIONS.md
2. provide the closest replacement
3. create an appropriate redirect where supported

Do not break useful indexed URLs unnecessarily.

==================================================
18. TESTING
==================================================

For calculator logic test:

- normal values
- zero
- empty input
- invalid input
- negative values where invalid
- decimals
- large values
- realistic Indian examples

Never mark something VERIFIED unless you actually tested it.

Use:

NOT VERIFIED

when necessary.

==================================================
19. FINAL QUALITY GATE
==================================================

After all batches:

Verify:

[ ] 20 priority calculators implemented
[ ] formulas tested
[ ] useful old calculators preserved
[ ] useful URLs preserved
[ ] Indian currency formatting
[ ] mobile responsive
[ ] accessible inputs
[ ] metadata
[ ] canonical URLs
[ ] sitemap
[ ] robots
[ ] internal linking
[ ] legal pages
[ ] monetization placeholders
[ ] no fake ads
[ ] no broken imports
[ ] no NaN/Infinity
[ ] TypeScript passes
[ ] lint passes
[ ] production build passes
[ ] out/ generated
[ ] static-export compatible

Rule-sensitive calculators must separately state whether they are:

VERIFIED + PUBLISHED
VERIFIED + UNPUBLISHED
TODO-VERIFY + UNPUBLISHED
EXISTING LIVE VERSION PRESERVED

==================================================
20. GIT RULES
==================================================

Development branch:

feature/finance-calculators-upgrade

Do NOT:

- push directly to main
- merge into main
- delete main
- rewrite production history
- automatically publish unverified calculators

Create logical commits after each batch.

==================================================
21. CLOUDFLARE PREVIEW
==================================================

After all approved batches are pushed to the feature branch, the feature deployment should be tested through the existing Cloudflare Git integration if available.

You cannot verify the Cloudflare dashboard yourself unless you actually have access to it.

Therefore provide me with the manual checks I need to perform.

Before production merge, test:

- homepage
- /calculators
- all published calculators
- rule-sensitive preview pages where accessible
- mobile layout
- navigation
- sitemap
- robots
- legal pages
- calculations
- broken links

==================================================
22. FINAL DEPLOYMENT HANDOFF
==================================================

DO NOT MERGE TO MAIN.

At the end give me:

1. Final branch
2. Commit hashes
3. All 20 calculator routes
4. Additional calculators preserved
5. Published/unpublished status
6. RULES_TO_VERIFY summary
7. Build result
8. Lint result
9. TypeScript result
10. Static-export result
11. out/ verification
12. Cloudflare items I must verify manually

Also give me the expected Cloudflare Pages configuration for THIS repository:

- framework preset
- build command
- build output directory
- recommended Node.js version based on the project

Explain how this differs from a server-rendered Next.js deployment.

Then STOP.

Do NOT merge.

==================================================
FINAL OBJECTIVE
==================================================

PLAN
→ MY APPROVAL
→ BUILD IN BATCHES
→ TEST EACH BATCH
→ COMMIT EACH BATCH
→ FEATURE BRANCH
→ CLOUDFLARE PREVIEW
→ VERIFY RULES
→ HUMAN APPROVAL
→ MERGE TO MAIN
→ CLOUDFLARE PRODUCTION
→ https://nexzy.online

Do not skip validation.
Do not guess financial rules.
Do not silently delete existing functionality.
