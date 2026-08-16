"use client";
import { useMemo, useState } from "react";
import { inr, calculateRetirement } from "@/lib/finance";

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(35);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(100000);
  const [inflationRate, setInflationRate] = useState(5);
  const [preReturnRate, setPreReturnRate] = useState(10);
  const [postReturnRate, setPostReturnRate] = useState(7);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);

  const result = useMemo(() => {
    if (
      currentAge <= 0 ||
      retirementAge <= currentAge ||
      monthlyExpense <= 0 ||
      inflationRate < 0 ||
      preReturnRate < 0 ||
      postReturnRate < 0 ||
      lifeExpectancy <= retirementAge
    )
      return null;

    return calculateRetirement(
      currentAge,
      retirementAge,
      monthlyExpense,
      inflationRate,
      preReturnRate,
      postReturnRate,
      lifeExpectancy
    );
  }, [currentAge, retirementAge, monthlyExpense, inflationRate, preReturnRate, postReturnRate, lifeExpectancy]);

  return (
    <div className="space-y-8">
      <div className="card p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="label">Current Age</label>
              <input
                className="input"
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Math.max(18, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Retirement Age</label>
              <input
                className="input"
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Math.max(currentAge + 1, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Life Expectancy</label>
              <input
                className="input"
                type="number"
                value={lifeExpectancy}
                onChange={(e) => setLifeExpectancy(Math.max(retirementAge + 1, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Current Monthly Household Expense</label>
              <input
                className="input"
                type="number"
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Expected Inflation Rate (%)</label>
              <input
                className="input"
                type="number"
                step="0.5"
                value={inflationRate}
                onChange={(e) => setInflationRate(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Expected Return Before Retirement (%)</label>
              <input
                className="input"
                type="number"
                step="0.1"
                value={preReturnRate}
                onChange={(e) => setPreReturnRate(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Expected Return After Retirement (%)</label>
              <input
                className="input"
                type="number"
                step="0.1"
                value={postReturnRate}
                onChange={(e) => setPostReturnRate(Math.max(0, Number(e.target.value)))}
              />
            </div>
          </div>

          {result && (
            <div className="rounded-2xl bg-slate-50 p-6 space-y-4">
              <div>
                <div className="text-sm muted">Required Retirement Corpus</div>
                <div className="text-3xl font-extrabold mt-1">{inr(result.requiredCorpus)}</div>
              </div>

              <div>
                <div className="text-sm muted">Required Monthly Savings</div>
                <div className="text-3xl font-extrabold mt-1 text-blue-600">{inr(result.requiredMonthlySavings)}</div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Years to Retirement:</span>
                  <b>{result.yearsToRetirement}</b>
                </div>
                <div className="flex justify-between">
                  <span>Monthly Expense at Retirement:</span>
                  <b>{inr(result.monthlyExpenseAtRetirement)}</b>
                </div>
                <div className="flex justify-between">
                  <span>Annual Expense at Retirement:</span>
                  <b>{inr(result.annualExpenseAtRetirement)}</b>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4">Retirement Summary</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-blue-50 p-4">
              <div className="text-sm font-semibold text-blue-900 mb-3">Pre-Retirement Phase</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <b>{result.yearsToRetirement} years</b>
                </div>
                <div className="flex justify-between">
                  <span>Expected Return</span>
                  <b>{preReturnRate}% p.a.</b>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <div className="text-sm font-semibold text-green-900 mb-3">Retirement Phase</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Duration</span>
                  <b>{result.yearsInRetirement} years</b>
                </div>
                <div className="flex justify-between">
                  <span>Expected Return</span>
                  <b>{postReturnRate}% p.a.</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card p-6 bg-blue-50">
        <h3 className="font-bold mb-3">What This Means</h3>
        <p className="text-sm leading-6 text-slate-700">
          This calculator estimates the corpus you'll need for your retirement based on your expected expenses, inflation, and investment returns. It then calculates the monthly savings required to accumulate this corpus before retirement. The corpus is designed to provide for your monthly expenses through inflation-adjusted withdrawals.
        </p>
      </div>

      <div className="card p-6 bg-slate-50">
        <h3 className="font-bold mb-3">Key Assumptions</h3>
        <ul className="text-sm space-y-2 text-slate-700">
          <li>• Inflation remains constant throughout</li>
          <li>• Pre- and post-retirement return rates remain constant</li>
          <li>• Monthly expenses are adjusted annually for inflation</li>
          <li>• Corpus is fully depleted by life expectancy</li>
          <li>• No pension or social security benefits are considered</li>
          <li>• No inheritance or lump-sum additions are assumed</li>
        </ul>
      </div>

      <div className="card p-6 border border-orange-200 bg-orange-50">
        <p className="text-xs text-orange-800">
          <b>Disclaimer:</b> This is an educational calculator based on assumed rates. Actual returns and inflation vary. This is not financial advice. Please consult a qualified financial advisor for a personalized retirement plan.
        </p>
      </div>
    </div>
  );
}
