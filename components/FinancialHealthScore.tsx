"use client";
import { useMemo, useState } from "react";
import { inr, calculateFinancialHealth } from "@/lib/finance";

export function FinancialHealthScore() {
  const [monthlyIncome, setMonthlyIncome] = useState(150000);
  const [essentialExpenses, setEssentialExpenses] = useState(80000);
  const [emiDebt, setEmiDebt] = useState(20000);
  const [monthlyInvestments, setMonthlyInvestments] = useState(15000);
  const [emergencyFund, setEmergencyFund] = useState(600000);
  const [outstandingDebt, setOutstandingDebt] = useState(1000000);
  const [age, setAge] = useState(35);
  const [dependents, setDependents] = useState(2);

  const result = useMemo(() => {
    if (monthlyIncome <= 0) return null;
    return calculateFinancialHealth(
      monthlyIncome,
      essentialExpenses,
      emiDebt,
      monthlyInvestments,
      emergencyFund,
      outstandingDebt,
      age,
      dependents
    );
  }, [monthlyIncome, essentialExpenses, emiDebt, monthlyInvestments, emergencyFund, outstandingDebt, age, dependents]);

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 50) return "text-blue-600";
    if (score >= 30) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreGrade = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-8">
      <div className="card p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="label">Monthly Take-Home Income</label>
              <input
                className="input"
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Monthly Essential Expenses</label>
              <input
                className="input"
                type="number"
                value={essentialExpenses}
                onChange={(e) => setEssentialExpenses(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Monthly EMI/Debt Payments</label>
              <input
                className="input"
                type="number"
                value={emiDebt}
                onChange={(e) => setEmiDebt(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Monthly Investments</label>
              <input
                className="input"
                type="number"
                value={monthlyInvestments}
                onChange={(e) => setMonthlyInvestments(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Emergency Fund</label>
              <input
                className="input"
                type="number"
                value={emergencyFund}
                onChange={(e) => setEmergencyFund(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Outstanding Debt</label>
              <input
                className="input"
                type="number"
                value={outstandingDebt}
                onChange={(e) => setOutstandingDebt(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Your Age</label>
              <input
                className="input"
                type="number"
                value={age}
                onChange={(e) => setAge(Math.max(18, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Number of Dependents</label>
              <input
                className="input"
                type="number"
                value={dependents}
                onChange={(e) => setDependents(Math.max(0, Number(e.target.value)))}
              />
            </div>
          </div>

          {result && (
            <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-6">
              <div className="text-center mb-6">
                <div className="text-sm muted">Financial Health Score</div>
                <div className={`text-6xl font-extrabold mt-2 ${getScoreColor(result.score)}`}>
                  {result.score}
                </div>
                <div className="text-xs text-slate-600 mt-1">/100</div>
                <div className={`text-sm font-semibold mt-2 ${getScoreColor(result.score)}`}>
                  {getScoreGrade(result.score)}
                </div>
              </div>

              <div className="space-y-3 border-t border-slate-200 pt-4">
                <div>
                  <div className="text-xs muted">Savings Ratio</div>
                  <b className="text-sm">{result.savingsRatio.toFixed(1)}%</b>
                </div>
                <div>
                  <div className="text-xs muted">Debt-to-Income</div>
                  <b className="text-sm">{result.debtToIncomeRatio.toFixed(1)}%</b>
                </div>
                <div>
                  <div className="text-xs muted">Emergency Fund Coverage</div>
                  <b className="text-sm">{result.emergencyFundMonths.toFixed(1)} months</b>
                </div>
                <div>
                  <div className="text-xs muted">Investment Ratio</div>
                  <b className="text-sm">{result.investmentRatio.toFixed(1)}%</b>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {result && (
        <>
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4">Score Breakdown</h3>
            <div className="space-y-2">
              {Object.entries(result.breakdown).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-sm">{key}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(value / 25) * 100}%` }}></div>
                    </div>
                    <span className="text-sm font-semibold">{value}/25</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 bg-green-50">
            <h3 className="font-bold text-lg mb-3 text-green-900">💪 Your Strengths</h3>
            <ul className="space-y-2">
              {result.strengths.map((strength, i) => (
                <li key={i} className="text-sm text-green-800 flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 bg-orange-50">
            <h3 className="font-bold text-lg mb-3 text-orange-900">🎯 Areas to Improve</h3>
            <ul className="space-y-2">
              {result.improvements.map((improvement, i) => (
                <li key={i} className="text-sm text-orange-800 flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">→</span>
                  {improvement}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 bg-blue-50">
            <h3 className="font-bold text-lg mb-3 text-blue-900">🚀 Your Next Steps</h3>
            <ol className="space-y-2">
              {result.nextActions.map((action, i) => (
                <li key={i} className="text-sm text-blue-800 flex items-start gap-2">
                  <span className="font-semibold text-blue-600">{i + 1}.</span>
                  {action}
                </li>
              ))}
            </ol>
          </div>
        </>
      )}

      <div className="card p-6 bg-blue-50">
        <h3 className="font-bold mb-3">What This Means</h3>
        <p className="text-sm leading-6 text-slate-700">
          Your Financial Health Score is a transparent 0–100 metric that evaluates your money management across four key areas: savings capacity, debt management, emergency preparedness, and investment activity. A higher score indicates better financial stability and preparedness for emergencies and future goals.
        </p>
      </div>

      <div className="card p-6 bg-slate-50">
        <h3 className="font-bold mb-3">How the Score is Calculated</h3>
        <ul className="text-sm space-y-2 text-slate-700">
          <li><b>Savings Ratio (25 points):</b> Ideal is 20–50% of income after expenses and debt</li>
          <li><b>Debt-to-Income (25 points):</b> Lower is better; ideal is under 20%</li>
          <li><b>Emergency Fund (20 points):</b> Target is 6 months of essential expenses</li>
          <li><b>Investment Activity (20 points):</b> Target is 10–30% of income</li>
          <li><b>Age & Life Stage (10 points):</b> Adjusted based on your age</li>
        </ul>
      </div>

      <div className="card p-6 border border-orange-200 bg-orange-50">
        <p className="text-xs text-orange-800">
          <b>Disclaimer:</b> This is an educational financial wellness tool, not investment advice. It does not account for taxes, inflation, market risks, or personal circumstances. Consult a SEBI-registered financial advisor for personalized recommendations. A higher score does not guarantee financial success or investment returns.
        </p>
      </div>
    </div>
  );
}
