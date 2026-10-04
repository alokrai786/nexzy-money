You are a senior full-stack engineer, product designer, Indian personal-finance calculator expert, technical SEO engineer, and performance optimization specialist.
I want you to BUILD/REBUILD my complete website called:
NexzyMoney
Domain:
https://nexzy.online
GitHub repository:
https://github.com/alokrai786/nexzy-money
The website is an Indian personal finance calculator platform.
IMPORTANT:
I am not a technical developer. You must make the implementation production-ready and explain important steps clearly.
==================================================
PRIMARY OBJECTIVE
==================================================
Build a fast, premium, mobile-first Indian personal finance website containing exactly these 20 core calculators:
SIP Calculator
Step-Up SIP Calculator
Lumpsum Mutual Fund Calculator
FD (Fixed Deposit) Calculator
RD (Recurring Deposit) Calculator
CAGR Calculator
PPF Calculator
NPS Calculator
EPF Calculator
Gratuity Calculator
Old vs New Tax Regime Calculator
HRA Calculator
Capital Gains Tax Calculator
Crypto Tax Calculator
Home Loan EMI Calculator
Personal/Car Loan EMI Calculator
Loan Prepayment Calculator
Inflation / Future Goal Calculator
Rent vs Buy Calculator
Rule of 72 / Rule of 114 Calculator
The website should feel like a professional Indian fintech product.
Do NOT create a generic template.
The goal is:
Excellent UX
Accurate calculations
Fast loading
Mobile-first
SEO optimized
Google-friendly technical architecture
High Core Web Vitals
Strong internal linking
Schema markup where appropriate
Programmatic calculator pages where useful
Affiliate/advertising-ready layout
No unnecessary signup
No intrusive popups
No dark patterns
Easy to maintain
Easy to add future calculators
Ready for Cloudflare Pages deployment
Static-export compatible where possible
==================================================
2. EXISTING TECHNOLOGY
Use the existing project architecture where practical.
Preferred stack:
Next.js
React
TypeScript
Tailwind CSS
Use reusable components.
Do NOT introduce unnecessary frameworks or dependencies.
Use:
Next.js App Router
TypeScript
Tailwind CSS
React components
Recharts only where charts genuinely improve understanding
The website must work with:
npm install
npm run build
The final project must have ZERO TypeScript/build errors.
==================================================
3. IMPORTANT DEVELOPMENT RULE
Work on the current feature branch only.
DO NOT modify main.
DO NOT merge the branch.
DO NOT deploy anything yourself unless explicitly instructed.
Before changing architecture, inspect the existing repository.
Preserve working functionality where possible.
Do not break existing calculators or pages unnecessarily.
If existing code can be reused safely, refactor it rather than duplicating it.
==================================================
4. WEBSITE INFORMATION ARCHITECTURE
Create this structure:
/
/calculators
/calculators/sip-calculator
/calculators/step-up-sip-calculator
/calculators/lumpsum-calculator
/calculators/fd-calculator
/calculators/rd-calculator
/calculators/cagr-calculator
/calculators/ppf-calculator
/calculators/nps-calculator
/calculators/epf-calculator
/calculators/gratuity-calculator
/calculators/old-vs-new-tax-regime
/calculators/hra-calculator
/calculators/capital-gains-tax-calculator
/calculators/crypto-tax-calculator
/calculators/home-loan-emi-calculator
/calculators/personal-car-loan-emi-calculator
/calculators/loan-prepayment-calculator
/calculators/inflation-future-goal-calculator
/calculators/rent-vs-buy-calculator
/calculators/rule-of-72-114-calculator
Also create:
/guides
/about
/contact
/privacy-policy
/terms
/disclaimer
==================================================
5. HOMEPAGE
Create a premium homepage.
Hero:
Headline:
"Understand Your Money in Seconds."
Subheadline:
"Free Indian financial calculators for salary, tax, investments, loans, retirement and everyday money decisions."
Primary CTA:
"Explore Calculators"
Secondary CTA:
"Calculate My Money"
Show calculator categories:
INVESTMENTS
SIP
Step-Up SIP
Lumpsum
FD
RD
CAGR
PPF
NPS
EPF
TAX & SALARY
Old vs New Tax Regime
HRA
Capital Gains Tax
Crypto Tax
Gratuity
LOANS & HOME
Home Loan EMI
Personal/Car Loan EMI
Loan Prepayment
Rent vs Buy
FINANCIAL PLANNING
Inflation/Future Goal
Rule of 72/114
Create "Popular Calculators" section.
Create "Latest Financial Guides" section.
Create strong internal links to all calculators.
==================================================
6. CALCULATOR UX
Every calculator must have:
Clear title
Short explanation
Input section
Calculate/update button where appropriate
Results card
Formula/explanation
Visual chart where useful
Example calculation
FAQ section
Disclaimer
Related calculators
Internal links
Affiliate/monetization slot
Use Indian formatting:
₹1,00,000
₹12,50,000
₹1,00,00,000
Use Indian number formatting consistently.
Inputs should support:
INR
percentages
years
months
age
salary
investment amounts
Provide sensible default values.
Validate:
NaN
negative values
impossible values
empty inputs
excessively large values
invalid dates/tenures
Never display NaN, Infinity or broken results.
==================================================
7. CALCULATOR REQUIREMENTS
A. SIP CALCULATOR
Inputs:
Monthly Investment
Expected Annual Return
Investment Duration
Outputs:
Total Invested
Estimated Returns
Future Value
Formula:
FV = P × [((1+r)^n - 1) / r] × (1+r)
Clearly explain that this is an estimate and actual mutual-fund returns vary.
Add yearly/monthly growth chart.
Related calculators:
Step-Up SIP
Lumpsum
CAGR
---
B. STEP-UP SIP
Inputs:
Starting Monthly SIP
Annual Step-Up %
Expected Return
Investment Duration
Show:
Total Invested
Estimated Returns
Final Corpus
Also show:
Normal SIP vs Step-Up SIP comparison.
Use chart.
---
C. LUMPSUM MUTUAL FUND
Inputs:
Initial Investment
Expected Return
Investment Duration
Formula:
FV = P × (1+r)^n
Show:
Invested Amount
Estimated Returns
Final Value
---
D. FD CALCULATOR
Inputs:
Principal
Interest Rate
Tenure
Compounding Frequency
Support:
Monthly
Quarterly
Half-Yearly
Yearly
Show:
Principal
Interest Earned
Maturity Amount
Clearly state that actual bank FD rates vary.
Do NOT claim guaranteed results.
---
E. RD CALCULATOR
Inputs:
Monthly Deposit
Interest Rate
Tenure
Compounding convention
Show:
Total Deposited
Interest
Maturity Amount
Use transparent assumptions.
---
F. CAGR CALCULATOR
Inputs:
Initial Value
Final Value
Investment Period
Formula:
CAGR = (Final / Initial)^(1/Years) - 1
Show CAGR percentage.
Also explain where CAGR can and cannot be used.
---
G. PPF CALCULATOR
Use current Indian PPF rules as the basis.
Important:
Minimum contribution:
₹500 per financial year
Maximum:
₹1,50,000 per financial year
Maximum:
12 deposits per year
Standard maturity:
15 financial years
Default illustrative rate:
7.1%
Do NOT hard-code future rates as guaranteed.
Interest mechanics should be transparently described.
PPF interest is based on the lowest balance between the close of the 5th day and month-end and is credited annually.
For calculator purposes, clearly state assumptions about contribution timing.
Do not claim the calculator is an official government calculator.
Show:
Annual contribution
Interest
Estimated maturity value
Total invested
Estimated interest
Add year-wise table/chart.
---
H. NPS CALCULATOR
Inputs:
Current Age
Retirement Age
Monthly Contribution
Expected Return
Expected Annuity Rate
Show:
Total Contribution
Estimated Corpus
Estimated Monthly Pension
Estimated Lump Sum
Clearly label NPS results as estimates.
Do not present tax/pension assumptions as guaranteed.
---
I. EPF CALCULATOR
Inputs:
Basic Salary
DA
Employee Contribution %
Employer Contribution %
Current EPF Balance
Annual Salary Increase
Expected EPF Interest Rate
Years to Retirement
Show:
Employee Contribution
Employer Contribution
Total Contribution
Estimated Interest
Estimated Retirement Corpus
Clearly separate employee/employer contributions.
Use assumptions transparently.
---
J. GRATUITY CALCULATOR
Provide standard gratuity calculation for employees covered by the applicable Payment of Gratuity framework.
Inputs:
Last Drawn Basic Salary
DA
Years of Service
Use:
Gratuity = Last Drawn Salary × 15/26 × Completed Years of Service
Explain eligibility and assumptions.
Do not present this as personalised legal/tax advice.
---
K. OLD VS NEW TAX REGIME
This calculator must be India-specific.
Build a clean comparison interface.
Inputs should include:
Annual Salary
Other Income
Eligible deductions/exemptions
Compare:
Old Tax Regime
New Tax Regime
Show:
Taxable Income
Income Tax
Cess
Total Tax
Effective Tax Rate
Difference
IMPORTANT:
Tax rules change.
Create tax rules in a centralized configuration file.
Do NOT scatter tax slabs throughout UI components.
Display:
"Tax calculations are estimates based on the tax rules configured for the selected assessment year."
Allow the tax engine to be updated without rewriting the calculator UI.
==================================================
L. HRA CALCULATOR
Inputs:
Basic Salary
DA
HRA Received
Rent Paid
Metro/Non-Metro
Calculate eligible HRA exemption using the applicable Indian tax rules.
Explain assumptions.
Do not imply that every taxpayer automatically qualifies.
==================================================
M. CAPITAL GAINS TAX CALCULATOR
Build an India-focused calculator.
Support:
Equity / listed securities
Mutual funds where applicable
Inputs:
Purchase Price
Sale Price
Purchase Date
Sale Date
Expenses
Determine holding period and applicable calculation category based on configurable rules.
IMPORTANT:
Indian capital-gains rules can change.
Create a centralized capital-gains rules/configuration module.
Never hard-code legal assumptions across multiple UI components.
Show:
Capital Gain
Applicable tax rate
Estimated Tax
Net Gain
Add disclaimer:
"This calculator provides an estimate and does not constitute tax advice."
==================================================
N. CRYPTO TAX CALCULATOR
India-specific.
Provide a clearly configurable calculation model.
Inputs:
Purchase Cost
Sale Value
Applicable transaction details
Show:
Gain
Estimated tax
Net amount
Clearly explain assumptions and limitations.
Do NOT falsely imply that every crypto transaction has identical tax treatment.
Keep rules configurable because regulations can change.
==================================================
O. HOME LOAN EMI
Inputs:
Loan Amount
Interest Rate
Tenure
Show:
Monthly EMI
Total Interest
Total Payment
Formula:
EMI = P × r × (1+r)^n / ((1+r)^n - 1)
Add amortization schedule.
Show:
Principal vs Interest chart.
---
P. PERSONAL/CAR LOAN EMI
Same core EMI engine.
Inputs:
Loan Amount
Interest Rate
Tenure
Allow user to select:
Personal Loan
Car Loan
Show EMI, interest, total payment.
---
Q. LOAN PREPAYMENT
Inputs:
Outstanding Loan
Current EMI
Interest Rate
Remaining Tenure
Prepayment Amount
Prepayment Frequency
Show:
Original remaining interest
New interest
Interest saved
Tenure reduced
Add before/after comparison.
---
R. INFLATION / FUTURE GOAL
Inputs:
Current Cost
Inflation Rate
Years
Formula:
Future Cost = Current Cost × (1 + inflation)^years
Also allow reverse calculation:
Future Goal
Inflation
Years
Required Current Value
Show chart.
---
S. RENT VS BUY
Inputs:
Property Price
Down Payment
Home Loan Rate
Loan Tenure
Monthly Rent
Annual Rent Increase
Property Appreciation
Maintenance
Property Tax
Investment Return
Compare:
Renting + investing difference
Buying + property appreciation
Show:
Estimated net worth after 5/10/15/20 years.
Clearly label this as an estimate because assumptions materially affect results.
---
T. RULE OF 72 / 114
Allow user to choose:
Rule of 72
Rule of 114
Inputs:
Interest/Return Rate
Show:
Approximate doubling time
For Rule of 114:
Approximate tripling time
Explain that these are mathematical approximations, not investment guarantees.
==================================================
8. CENTRAL FINANCE ENGINE
Do NOT put complicated calculations directly inside JSX components.
Create:
lib/finance/
or a clean equivalent architecture.
Create reusable calculation functions.
Example:
calculateSIP()
calculateStepUpSIP()
calculateLumpsum()
calculateFD()
calculateRD()
calculateCAGR()
calculatePPF()
calculateNPS()
calculateEPF()
calculateGratuity()
calculateTax()
calculateHRA()
calculateCapitalGains()
calculateCryptoTax()
calculateEMI()
calculateLoanPrepayment()
calculateInflation()
calculateRentVsBuy()
calculateRuleOf72()
Add TypeScript types.
Make functions deterministic.
Keep calculation logic separate from presentation.
==================================================
9. TAX/RULE CONFIGURATION
Create centralized configuration files.
Example:
lib/rules/taxRules.ts
lib/rules/ppfRules.ts
lib/rules/capitalGainsRules.ts
lib/rules/cryptoTaxRules.ts
This makes future updates easier.
Never duplicate tax rates/slabs in multiple components.
Every rule-dependent calculator must display an appropriate "rules may change" disclaimer.
==================================================
10. SEO STRATEGY
SEO is a major requirement.
Every calculator page must have:
Unique title
Unique meta description
Canonical URL
Open Graph metadata
Twitter/X metadata
Relevant headings
Semantic HTML
FAQ section
Internal links
Breadcrumbs
Example title:
"SIP Calculator India – Calculate Mutual Fund SIP Returns | NexzyMoney"
Example:
"Home Loan EMI Calculator India – EMI, Interest & Amortization | NexzyMoney"
Do NOT keyword-stuff.
Write natural content.
Target long-tail search intent.
Examples:
"SIP calculator India"
"step up SIP calculator"
"home loan EMI calculator India"
"PPF calculator"
"FD maturity calculator"
"rent vs buy calculator India"
==================================================
11. STRUCTURED DATA
Implement appropriate JSON-LD.
Use:
WebSite
Organization
BreadcrumbList
WebApplication where appropriate
FAQPage only where the visible page actually contains the FAQs
Do not create fake or hidden structured data.
Ensure JSON-LD is valid.
==================================================
12. INTERNAL LINKING
Every calculator should link to:
2–5 related calculators.
Example:
SIP →
Step-Up SIP
Lumpsum
CAGR
Inflation/Future Goal
Home Loan →
Loan Prepayment
Rent vs Buy
Personal/Car Loan
Tax →
HRA
Capital Gains
Crypto Tax
Gratuity
Create breadcrumbs.
Create a central calculator directory.
==================================================
13. SEO CONTENT
Each calculator page should contain approximately:
800–1500 words of genuinely useful content where appropriate.
Structure:
H1
Short introduction
Calculator
How it works
Formula
Example
How to interpret results
Common mistakes
FAQs
Related calculators
Disclaimer
Do NOT generate meaningless filler just to hit word count.
Content must genuinely help users.
==================================================
14. PROGRAMMATIC SEO
Where technically sensible, create useful parameter-based or intent-based pages WITHOUT generating thousands of thin pages.
Examples:
/calculators/sip-calculator
/calculators/sip-calculator/10-year
/calculators/sip-calculator/15-year
Only create pages that contain genuinely useful unique content.
Avoid doorway pages.
Avoid keyword spam.
==================================================
15. SITE SPEED
Target excellent Core Web Vitals.
Optimize:
LCP
CLS
INP
Use:
Minimal JavaScript
Lazy loading where appropriate
Responsive images
No unnecessary third-party scripts
No huge libraries
No blocking resources
Do not load charts until needed if doing so improves performance.
==================================================
16. DESIGN
Create a premium fintech design.
Visual style:
Clean
Trustworthy
Modern
Minimal
Professional
Use:
White/light backgrounds
Subtle gradients
Cards
Rounded corners
Excellent typography
Clear hierarchy
Professional financial colors
Do NOT make it look like a gambling site.
Do NOT overload the page with advertisements.
Mobile experience is extremely important.
Desktop:
Professional fintech dashboard style.
Mobile:
Calculator first.
Results immediately below.
Content after results.
==================================================
17. HEADER
Header:
NexzyMoney
Navigation:
Calculators
Financial Guides
About
CTA:
"Explore Calculators"
Mobile navigation must work properly.
==================================================
18. AFFILIATE / MONETIZATION
I want to monetize from the beginning.
DO NOT insert random affiliate links.
Create reusable monetization components:
<AffiliateBanner />
<AdPlaceholder />
<AffiliateCard />
They should be visually clean and clearly labelled:
"Sponsored"
or
"Partner Offer"
Create controlled placement locations.
Recommended locations:
Below calculator result
Between educational content sections
Before related calculators
Do NOT put ads:
Above the calculator inputs
Inside form fields
In ways that look like calculator buttons
In deceptive locations
Excessively on mobile
Keep monetization modular so affiliate providers can be changed later.
Do NOT hard-code a specific affiliate company unless explicitly provided.
Use placeholder configuration:
affiliateConfig.ts
Example:
enabled: false
When enabled, affiliate links can be added without changing calculator components.
==================================================
19. ADSENSE READINESS
Make the website structurally ready for future Google AdSense approval.
Create:
Privacy Policy
Terms
Disclaimer
About
Contact
Ensure the website has:
Original content
Clear navigation
Useful calculators
No deceptive ads
No auto-downloads
No fake buttons
Create an AdPlaceholder component but DO NOT add actual AdSense code yet.
==================================================
20. TRUST / E-E-A-T
Add:
About NexzyMoney
Calculator methodology
How calculations are performed
Disclaimer
Last updated date where applicable
For rule-sensitive calculators, clearly distinguish:
mathematical calculation
illustrative assumption
government/bank rule
estimate
Do not claim to be a government website.
Do not claim official certification unless actually provided.
==================================================
21. ACCESSIBILITY
Use:
Semantic HTML
ARIA labels where needed
Keyboard navigation
Visible focus states
Good contrast
Accessible form labels
Accessible charts where possible
Do not rely only on color to communicate information.
==================================================
22. RESPONSIVE DESIGN
Test:
320px
375px
390px
430px
768px
1024px
1280px
1440px
No horizontal scrolling.
Buttons must be touch-friendly.
Inputs must be easy to use on mobile.
==================================================
23. ERROR HANDLING
Every calculator must gracefully handle:
empty input
zero
negative values
NaN
Infinity
very large numbers
invalid combinations
Show useful validation messages.
Never crash the page.
==================================================
24. TESTING
Create tests for the calculation engine where practical.
At minimum manually verify known examples for:
SIP
Step-Up SIP
Lumpsum
FD
RD
CAGR
PPF
NPS
EPF
Gratuity
Tax
HRA
Capital Gains
Crypto Tax
EMI
Loan Prepayment
Inflation
Rent vs Buy
Rule 72/114
Run:
npm run build
Also run lint if available.
Fix all errors.
Do not finish with known build errors.
==================================================
25. SITEMAP
Create/update:
sitemap.xml
Include all important calculator pages.
Do not include unnecessary duplicate URLs.
Create:
robots.txt
Allow search engines to crawl public calculator pages.
Do not accidentally block:
/
/calculators/
==================================================
26. GOOGLE SEARCH CONSOLE READINESS
Make the website ready for Google Search Console.
Ensure:
Canonical URLs
Sitemap
Robots
Correct status codes
No accidental noindex
No duplicate metadata
==================================================
27. ANALYTICS READINESS
Create a clean analytics integration point.
Do not add heavy analytics.
Create configuration so Google Analytics/other analytics can be enabled later without rewriting components.
Track useful events such as:
calculator_open
calculator_calculated
affiliate_click
Do not collect unnecessary personal data.
==================================================
28. FOOTER
Footer:
NexzyMoney
"Simple tools for smarter money decisions."
Links:
Calculators
Financial Guides
About
Contact
Privacy Policy
Terms
Disclaimer
Copyright:
© 2026 NexzyMoney. All rights reserved.
==================================================
29. IMPORTANT FINANCIAL SAFETY
Do not present estimates as guaranteed returns.
Use language such as:
"Estimated"
"Illustrative"
"Based on the assumptions entered"
For tax calculators:
"Tax rules may change. Verify with the latest official guidance or a qualified tax professional."
For investments:
"Past performance does not guarantee future returns."
For loans:
"Actual EMI may vary depending on lender terms, fees and rate changes."
==================================================
30. CODE QUALITY
Use:
Strict TypeScript
Reusable components
Reusable finance functions
Clear naming
No duplicated calculation logic
No unnecessary dependencies
No console errors
No broken imports
Avoid:
any
massive components
duplicated JSX
hard-coded financial rules
magic numbers
==================================================
31. FINAL PROJECT CHECK
Before saying the project is complete, verify:
[ ] All 20 calculators exist
[ ] All calculator routes work
[ ] All calculations return valid numbers
[ ] No NaN
[ ] No Infinity
[ ] Mobile responsive
[ ] Desktop responsive
[ ] SEO metadata
[ ] Canonicals
[ ] Breadcrumbs
[ ] JSON-LD
[ ] FAQ sections
[ ] Internal linking
[ ] Sitemap
[ ] robots.txt
[ ] Privacy Policy
[ ] Terms
[ ] Disclaimer
[ ] About
[ ] Contact
[ ] Affiliate component
[ ] Ad placeholder
[ ] Analytics integration point
[ ] No intrusive ads
[ ] No TypeScript errors
[ ] No build errors
[ ] No broken links
[ ] No console errors
==================================================
32. IMPORTANT: DO NOT JUST PLAN
Do NOT give me only an explanation or architecture.
Actually inspect the repository.
Then implement the website.
Create/modify the files.
Run the build.
Fix errors.
Run the build again.
Keep working until:
npm run build
passes successfully.
==================================================
33. GIT WORKFLOW
Work ONLY on:
feature/finance-calculators-upgrade
Do NOT modify main.
Do NOT merge.
After completing the work:
Show changed files
Show important architecture decisions
Show build result
Show lint result if available
Show calculator list
Show any assumptions
Commit the changes to the feature branch
Commit message:
"Build complete 20-calculator NexzyMoney finance platform"
Do not push to main.
==================================================
34. VERY IMPORTANT: VERIFY YOUR OWN WORK
Do not say:
"Done"
just because files were generated.
After implementation:
Re-open the important files
Verify imports
Verify routes
Verify calculator functions
Verify metadata
Verify sitemap
Verify robots
Verify affiliate components
Verify responsive layout
Run npm run build
Fix every build error
Run npm run build again
Only report completion after actual verification.
==================================================
35. FINAL REPORT FORMAT
At the end report:
PROJECT STATUS
20 CALCULATORS:
...
...
...
...
ARCHITECTURE:
...
SEO:
...
MONETIZATION:
...
PERFORMANCE:
...
TESTING:
npm run build: PASS/FAIL
npm run lint: PASS/FAIL
FILES CHANGED:
...
GIT COMMIT:
...
REMAINING ISSUES:
...
IMPORTANT:
Do not claim Google ranking, Google indexing, AdSense approval, affiliate approval, or revenue unless it has actually happened.
Build the strongest technically correct foundation possible for fast indexing and monetization.
