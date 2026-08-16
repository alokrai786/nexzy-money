"use client";

import { useMemo, useState } from "react";

import {
  calculateIncomeTax,
  compareTaxRegimes,
  type TaxInput,
} from "../../lib/tax/income-tax";

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, value));

const numberValue = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
};

function NumberInput({
  label,
  value,
  onChange,
  hint,
  disabled = false,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-slate-800">
        {label}
      </span>

      <input
        type="number"
        min="0"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(numberValue(e.target.value))}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
      />

      {hint && (
        <span className="mt-1 block text-xs text-slate-500">
          {hint}
        </span>
      )}
    </label>
  );
}

function ResultCard({
  title,
  result,
  recommended,
}: {
  title: string;
  result: ReturnType<typeof calculateIncomeTax>;
  recommended: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        recommended
          ? "border-blue-300 bg-blue-50/60"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h3 className="mt-1 text-2xl font-black text-slate-950">
            {money(result.totalTax)}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Estimated annual tax
          </p>
        </div>

        {recommended && (
          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
            Lower estimated tax
          </span>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-500">Gross income</p>
          <p className="mt-1 font-bold">{money(result.grossIncome)}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Taxable income</p>
          <p className="mt-1 font-bold">{money(result.taxableIncome)}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Standard deduction</p>
          <p className="mt-1 font-bold">{money(result.standardDeduction)}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Total deductions</p>
          <p className="mt-1 font-bold">{money(result.totalDeductions)}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">87A rebate</p>
          <p className="mt-1 font-bold">{money(result.rebate87A)}</p>
        </div>

        <div>
          <p className="text-xs text-slate-500">Cess</p>
          <p className="mt-1 font-bold">{money(result.cess)}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">
            Monthly tax equivalent
          </span>

          <strong>{money(result.monthlyTaxEquivalent)}</strong>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-slate-600">
            Effective tax rate
          </span>

          <strong>
            {result.effectiveTaxRate.toFixed(2)}%
          </strong>
        </div>
      </div>
    </div>
  );
}

export const metadata = undefined;

export default function IncomeTaxCalculatorPage() {
  const [age, setAge] = useState(35);
  const [salaryIncome, setSalaryIncome] = useState(1200000);
  const [otherIncome, setOtherIncome] = useState(0);

  const [hraExemption, setHraExemption] = useState(0);
  const [otherExemptions, setOtherExemptions] = useState(0);
  const [section80C, setSection80C] = useState(0);
  const [section80D, setSection80D] = useState(0);
  const [section80CCD1B, setSection80CCD1B] = useState(0);
  const [employerNPS, setEmployerNPS] = useState(0);
  const [homeLoanInterest, setHomeLoanInterest] = useState(0);
  const [section80E, setSection80E] = useState(0);
  const [section80G, setSection80G] = useState(0);
  const [section80EE, setSection80EE] = useState(0);
  const [section80EEA, setSection80EEA] = useState(0);
  const [section80EEB, setSection80EEB] = useState(0);

  const [residentIndividual, setResidentIndividual] =
    useState(true);

  const input = useMemo<TaxInput>(
    () => ({
      age,
      salaryIncome,
      otherIncome,
      hraExemption,
      otherExemptions,
      section80C,
      section80D,
      section80CCD1B,
      employerNPS,
      homeLoanInterest,
      section80E,
      section80G,
      section80EE,
      section80EEA,
      section80EEB,
      residentIndividual,
    }),
    [
      age,
      salaryIncome,
      otherIncome,
      hraExemption,
      otherExemptions,
      section80C,
      section80D,
      section80CCD1B,
      employerNPS,
      homeLoanInterest,
      section80E,
      section80G,
      section80EE,
      section80EEA,
      section80EEB,
      residentIndividual,
    ]
  );

  const comparison = useMemo(
    () => compareTaxRegimes(input),
    [input]
  );

  const oldTax = comparison.old.totalTax;
  const newTax = comparison.new.totalTax;

  const taxDifference = Math.abs(oldTax - newTax);

  const oldIsBetter = oldTax < newTax;
  const newIsBetter = newTax < oldTax;
  const sameTax = Math.round(oldTax) === Math.round(newTax);

  const recommendation = sameTax
    ? "Both regimes produce approximately the same estimated tax."
    : oldIsBetter
      ? "Based on the information entered, the Old Tax Regime currently gives the lower estimated tax."
      : "Based on the information entered, the New Tax Regime currently gives the lower estimated tax.";

  const resetCalculator = () => {
    setAge(35);
    setSalaryIncome(1200000);
    setOtherIncome(0);
    setHraExemption(0);
    setOtherExemptions(0);
    setSection80C(0);
    setSection80D(0);
    setSection80CCD1B(0);
    setEmployerNPS(0);
    setHomeLoanInterest(0);
    setSection80E(0);
    setSection80G(0);
    setSection80EE(0);
    setSection80EEA(0);
    setSection80EEB(0);
    setResidentIndividual(true);
  };

  return (
    <main className="container py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="max-w-4xl">
          <div className="text-sm font-bold tracking-wide text-blue-700">
            NEXZY MONEY • AY 2026–27
          </div>

          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            Income Tax Calculator
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Estimate your income tax and compare the Old and New Tax
            Regimes using the information you provide.
          </p>

          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
            <strong>Educational estimate:</strong> Results depend on
            the financial year, taxpayer profile, income type,
            deductions, exemptions and eligibility conditions.
            Always verify your final tax position before filing.
          </div>
        </div>

        {/* Inputs */}
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-black text-slate-950">
                Your income details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter annual figures in Indian rupees.
              </p>
            </div>

            <button
              type="button"
              onClick={resetCalculator}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Reset
            </button>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <NumberInput
              label="Age"
              value={age}
              onChange={setAge}
              hint="Used for applicable slab calculations."
            />

            <NumberInput
              label="Annual salary income"
              value={salaryIncome}
              onChange={setSalaryIncome}
              hint="Gross annual salary before standard deduction."
            />

            <NumberInput
              label="Other income"
              value={otherIncome}
              onChange={setOtherIncome}
              hint="Interest, rent and other taxable income."
            />

            <NumberInput
              label="HRA exemption"
              value={hraExemption}
              onChange={setHraExemption}
              hint="Eligible amount only. Old regime."
            />

            <NumberInput
              label="Other salary exemptions"
              value={otherExemptions}
              onChange={setOtherExemptions}
              hint="Enter only eligible amounts."
            />

            <NumberInput
              label="Section 80C"
              value={section80C}
              onChange={setSection80C}
              hint="Eligible investments/payments under 80C."
            />

            <NumberInput
              label="Section 80D"
              value={section80D}
              onChange={setSection80D}
              hint="Eligible health-insurance/medical deduction."
            />

            <NumberInput
              label="Section 80CCD(1B)"
              value={section80CCD1B}
              onChange={setSection80CCD1B}
              hint="Additional eligible NPS contribution."
            />

            <NumberInput
              label="Employer NPS contribution"
              value={employerNPS}
              onChange={setEmployerNPS}
              hint="Eligible employer contribution under 80CCD(2)."
            />

            <NumberInput
              label="Home-loan interest"
              value={homeLoanInterest}
              onChange={setHomeLoanInterest}
              hint="Eligible deduction under the applicable rules."
            />

            <NumberInput
              label="Section 80E"
              value={section80E}
              onChange={setSection80E}
              hint="Eligible education-loan interest."
            />

            <NumberInput
              label="Section 80G"
              value={section80G}
              onChange={setSection80G}
              hint="Enter the eligible deduction amount."
            />

            <NumberInput
              label="Section 80EE"
              value={section80EE}
              onChange={setSection80EE}
              hint="Only if you meet the applicable eligibility rules."
            />

            <NumberInput
              label="Section 80EEA"
              value={section80EEA}
              onChange={setSection80EEA}
              hint="Only if applicable to your loan/property."
            />

            <NumberInput
              label="Section 80EEB"
              value={section80EEB}
              onChange={setSection80EEB}
              hint="Only if you meet the applicable conditions."
            />
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-slate-50 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-bold text-slate-900">
                Resident individual
              </p>

              <p className="text-sm text-slate-500">
                Used for the applicable 87A rebate calculation.
              </p>
            </div>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={residentIndividual}
                onChange={(e) =>
                  setResidentIndividual(e.target.checked)
                }
                className="h-5 w-5 rounded border-slate-300"
              />

              <span className="text-sm font-semibold text-slate-700">
                Yes, I am a resident individual
              </span>
            </label>
          </div>
        </section>

        {/* Recommendation */}
        <section className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 md:p-8">
          <div className="text-sm font-bold uppercase tracking-wide text-blue-700">
            Nexzy Money recommendation
          </div>

          <h2 className="mt-2 text-2xl font-black text-slate-950 md:text-3xl">
            {recommendation}
          </h2>

          {!sameTax && (
            <p className="mt-3 text-slate-700">
              Estimated difference between the two regimes:{" "}
              <strong>{money(taxDifference)}</strong> per year.
            </p>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-5">
              <p className="text-sm text-slate-500">
                Old Regime
              </p>

              <p className="mt-1 text-2xl font-black text-slate-950">
                {money(oldTax)}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Estimated annual tax
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <p className="text-sm text-slate-500">
                New Regime
              </p>

              <p className="mt-1 text-2xl font-black text-slate-950">
                {money(newTax)}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Estimated annual tax
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <p className="text-sm text-slate-500">
                Suggested option
              </p>

              <p className="mt-1 text-xl font-black text-blue-700">
                {sameTax
                  ? "Review both"
                  : comparison.recommendedRegime === "old"
                    ? "Old Regime"
                    : "New Regime"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Based on estimated tax only
              </p>
            </div>
          </div>
        </section>

        {/* Detailed comparison */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <ResultCard
            title="Old Tax Regime"
            result={comparison.old}
            recommended={oldIsBetter}
          />

          <ResultCard
            title="New Tax Regime"
            result={comparison.new}
            recommended={newIsBetter}
          />
        </section>

        {/* Why the recommendation matters */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <div className="max-w-4xl">
            <div className="text-sm font-bold uppercase tracking-wide text-blue-700">
              Why compare both regimes?
            </div>

            <h2 className="mt-2 text-2xl font-black text-slate-950">
              The lowest-tax option is not always obvious
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              The comparison helps you understand whether the tax
              savings available through eligible deductions and
              exemptions under the Old Regime outweigh the simpler
              structure and generally broader deduction restrictions
              of the New Regime.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-black text-slate-950">
                  Old Regime may be attractive when
                </h3>

                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  <li>• You have substantial eligible deductions.</li>
                  <li>• You use eligible HRA benefits.</li>
                  <li>• You have qualifying home-loan interest.</li>
                  <li>• You make eligible 80C investments/payments.</li>
                  <li>• You have eligible 80D, 80E, 80G or NPS deductions.</li>
                </ul>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <h3 className="font-black text-slate-950">
                  New Regime may be attractive when
                </h3>

                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  <li>• You have relatively few deductions.</li>
                  <li>• You prefer a simpler tax structure.</li>
                  <li>• You do not rely heavily on Old-Regime exemptions.</li>
                  <li>• Your calculated tax is lower under the New Regime.</li>
                  <li>• You want to compare tax savings against investment lock-ins.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tax planning ideas */}
        <section className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50/60 p-6 md:p-8">
          <div className="text-sm font-bold uppercase tracking-wide text-emerald-700">
            Tax planning checklist
          </div>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Don't look only at the popular 80C deduction
          </h2>

          <p className="mt-3 max-w-4xl leading-7 text-slate-600">
            Depending on your circumstances, tax planning can involve
            several different provisions. Nexzy Money should present
            these as planning areas rather than promising a deduction,
            because eligibility and limits depend on the taxpayer and
            the applicable rules.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [
                "Employer NPS",
                "Check eligible employer NPS contribution under 80CCD(2).",
              ],
              [
                "Additional NPS",
                "Review the additional NPS deduction available under the applicable rules.",
              ],
              [
                "Health insurance",
                "Check eligible 80D health-insurance and medical expenses.",
              ],
              [
                "Home-loan interest",
                "Review whether your property and loan qualify for the relevant deduction.",
              ],
              [
                "Education loan",
                "Check eligible interest deduction under Section 80E.",
              ],
              [
                "Donations",
                "Check qualifying donations and the applicable 80G conditions.",
              ],
              [
                "HRA planning",
                "If eligible, compare HRA exemption with the alternative regime.",
              ],
              [
                "Home-loan special deductions",
                "Check whether any 80EE/80EEA/80EEB provision actually applies to your loan and circumstances.",
              ],
              [
                "Investment planning",
                "Do not invest only for tax saving; compare the tax benefit with liquidity, risk and return.",
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-emerald-100 bg-white p-5"
              >
                <h3 className="font-bold text-slate-950">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            <strong>Important:</strong> A tax-saving product is not
            automatically a good investment. Consider eligibility,
            lock-in, liquidity, risk, returns and your overall financial
            plan before making a decision.
          </div>
        </section>

        {/* Recommendation logic */}
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-black text-slate-950">
            How Nexzy Money chooses the suggested regime
          </h2>

          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <p>
              <strong className="text-slate-900">1. Calculate both:</strong>{" "}
              The calculator estimates tax under both the Old and New
              Tax Regimes using the information entered.
            </p>

            <p>
              <strong className="text-slate-900">2. Compare:</strong>{" "}
              The estimated total tax under each regime is compared.
            </p>

            <p>
              <strong className="text-slate-900">3. Suggest:</strong>{" "}
              The regime with the lower estimated tax is displayed as
              the suggested option.
            </p>

            <p>
              <strong className="text-slate-900">4. Review:</strong>{" "}
              The user should also consider investment choices,
              deductions, liquidity, financial goals and personal
              circumstances before selecting a regime.
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-white">
            <strong>Important:</strong> Nexzy Money provides educational
            estimates and does not provide professional tax advice.
            Please consult your tax adviser or qualified tax
            professional before making a final decision or filing your
            income-tax return.
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-8 pb-8 text-center text-xs leading-5 text-slate-500">
          Tax calculations are estimates for educational and planning
          purposes. Rules, limits, eligibility conditions and tax rates
          can change. Verify the applicable rules for your financial
          year before making financial or tax decisions.
        </div>
      </div>
    </main>
  );
}
