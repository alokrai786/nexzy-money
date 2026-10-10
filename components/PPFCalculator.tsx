"use client";
import { useMemo, useState } from "react";
import { inr, calculatePPF } from "@/lib/finance";

const MAX_PPF_ANNUAL_LIMIT = 150000;
const MIN_PPF_ANNUAL_LIMIT = 500;
const MAX_PPF_MONTHLY_LIMIT = 12500;

export function PPFCalculator() {
  const [frequency, setFrequency] = useState<"yearly" | "monthly">("yearly");
  const [annualInvestment, setAnnualInvestment] = useState(150000);
  const [monthlyInvestment, setMonthlyInvestment] = useState(12500);
  const [period, setPeriod] = useState(15);
  const [rate, setRate] = useState(7.1);

  // Compute annual equivalent for validation
  const annualEquivalent =
    frequency === "yearly" ? annualInvestment : monthlyInvestment * 12;
  const isAboveLimit = annualEquivalent > MAX_PPF_ANNUAL_LIMIT;
  const isBelowMinimum =
    annualEquivalent > 0 && annualEquivalent < MIN_PPF_ANNUAL_LIMIT;

  const result = useMemo(() => {
    // Input validation
    if (!Number.isFinite(rate) || rate < 0) return null;
    if (!Number.isFinite(period) || period <= 0) return null;

    const value =
      frequency === "yearly" ? annualInvestment : monthlyInvestment;
    if (!Number.isFinite(value) || value < 0) return null;

    // Enforce limits: don't return result if input exceeds limit
    if (frequency === "yearly" && value > MAX_PPF_ANNUAL_LIMIT) return null;
    if (frequency === "monthly" && value > MAX_PPF_MONTHLY_LIMIT) return null;

    return calculatePPF(
      Math.max(0, value),
      frequency,
      Math.max(1, Math.round(period)),
      Math.max(0, rate)
    );
  }, [annualInvestment, monthlyInvestment, frequency, period, rate]);

  return (
    <div className="card p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="label">Investment Frequency</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFrequency("yearly")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  frequency === "yearly"
                    ? "bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Yearly
              </button>
              <button
                type="button"
                onClick={() => setFrequency("monthly")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  frequency === "monthly"
                    ? "bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div>
            <label className="label">
              {frequency === "yearly"
                ? "Annual Investment Amount"
                : "Monthly Investment Amount"}
              {" (₹)"}
            </label>
            <input
              className="input"
              type="number"
              value={frequency === "yearly" ? annualInvestment : monthlyInvestment}
              onChange={(e) => {
                const val = Number.parseFloat(e.target.value);
                const safeValue = Number.isFinite(val) ? val : 0;
                if (frequency === "yearly") {
                  setAnnualInvestment(Math.max(0, safeValue));
                } else {
                  setMonthlyInvestment(Math.max(0, safeValue));
                }
              }}
              min="0"
              step={frequency === "yearly" ? "1000" : "100"}
              max={
                frequency === "yearly"
                  ? MAX_PPF_ANNUAL_LIMIT
                  : MAX_PPF_MONTHLY_LIMIT
              }
            />
            <p className="text-xs text-slate-500 mt-2">
              {frequency === "yearly"
                ? `Maximum annual contribution: ₹${inr(MAX_PPF_ANNUAL_LIMIT)}`
                : `Maximum monthly contribution: ₹${inr(MAX_PPF_MONTHLY_LIMIT)} (annual equivalent: ₹${inr(MAX_PPF_MONTHLY_LIMIT * 12)})`}
            </p>
            {(isAboveLimit || isBelowMinimum) && (
              <p className="text-xs text-red-600 mt-2 font-semibold">
                {isAboveLimit
                  ? `⚠️ Annual contribution exceeds PPF limit of ₹${inr(MAX_PPF_ANNUAL_LIMIT)}.`
                  : `⚠️ Minimum annual contribution is ₹${inr(MIN_PPF_ANNUAL_LIMIT)}.`}
              </p>
            )}
          </div>

          <div>
            <label className="label">Investment Period (Years)</label>
            <input
              className="input"
              type="number"
              value={period}
              onChange={(e) => setPeriod(Number.parseFloat(e.target.value) || 1)}
              min="1"
              step="1"
            />
            <p className="text-xs text-slate-500 mt-2">
              PPF has a maturity of 15 years with optional 5-year extensions.
            </p>
            {period < 15 && (
              <p className="text-xs text-amber-600 mt-1 font-semibold">
                ⚠️ PPF maturity is 15 years; withdrawals before that have restrictions.
              </p>
            )}
          </div>

          <div>
            <label className="label">Annual Interest Rate (%) – Assumed</label>
            <input
              className="input"
              type="number"
              value={rate}
              onChange={(e) => setRate(Number.parseFloat(e.target.value) || 0)}
              min="0"
              step="0.1"
            />
            <p className="text-xs text-slate-500 mt-2">
              Illustrative/current assumption. PPF rates change quarterly.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setFrequency("yearly");
              setAnnualInvestment(150000);
              setMonthlyInvestment(12500);
              setPeriod(15);
              setRate(7.1);
            }}
            className="btn btn-secondary w-full"
          >
            Reset
          </button>
        </div>

        <div>
          {result ? (
            <div className="space-y-4">
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-700">
                <div className="text-xs muted font-bold">TOTAL INVESTED</div>
                <div className="text-2xl font-black mt-1">
                  {inr(result.totalInvested)}
                </div>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-700">
                <div className="text-xs muted font-bold">
                  ESTIMATED INTEREST EARNED
                </div>
                <div className="text-2xl font-black mt-1">
                  {inr(result.totalInterestEarned)}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-5 rounded-lg border-l-4 border-blue-700">
                <div className="text-xs muted font-bold">
                  ESTIMATED MATURITY AMOUNT
                </div>
                <div className="text-2xl font-black mt-1 text-blue-700">
                  {inr(result.maturityAmount)}
                </div>
              </div>

              {result.yearlyBreakdown.length > 0 && (
                <div className="mt-6 bg-slate-50 p-4 rounded-lg overflow-x-auto">
                  <div className="text-xs font-bold text-slate-700 mb-3">
                    Year-wise Breakdown
                  </div>
                  <table className="text-xs w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 px-2">Year</th>
                        <th className="text-right py-2 px-2">Corpus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.yearlyBreakdown.slice(-5).map((row) => (
                        <tr key={row.year} className="border-b border-slate-100">
                          <td className="py-2 px-2">{row.year}</td>
                          <td className="text-right py-2 px-2 font-semibold">
                            {inr(row.totalCorpus)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {result.yearlyBreakdown.length > 5 && (
                    <p className="text-xs text-slate-500 mt-2">
                      ... (showing last 5 years)
                    </p>
                  )}
                </div>
              )}

              <div className="text-xs text-slate-600 leading-6 bg-yellow-50 p-3 rounded border border-yellow-200">
                <strong>Important:</strong> Estimate based on your assumed
                contribution timing and rate. Actual PPF growth depends on
                prevailing government rates and account rules.
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 text-center text-slate-600">
              <p className="text-sm">
                {isAboveLimit
                  ? "Annual contribution exceeds the limit. Please reduce the amount."
                  : isBelowMinimum
                  ? "Annual contribution is below the minimum of ₹500."
                  : "Enter valid contribution amounts to see results."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
