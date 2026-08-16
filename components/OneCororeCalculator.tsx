"use client";
import { useMemo, useState } from "react";
import { inr, calculateRequiredSip } from "@/lib/finance";

export function OneCororeCalculator() {
  const [targetAmount, setTargetAmount] = useState(10000000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(15);

  const result = useMemo(() => {
    if (targetAmount <= 0 || expectedReturn < 0 || investmentPeriod <= 0) return null;
    const requiredSip = calculateRequiredSip(targetAmount, expectedReturn, investmentPeriod);
    const totalInvested = requiredSip * 12 * investmentPeriod;
    const estimatedReturns = targetAmount - totalInvested;
    return { requiredSip, totalInvested, estimatedReturns };
  }, [targetAmount, expectedReturn, investmentPeriod]);

  // Alternative scenario: increase period by 5 years
  const alternativeResult = useMemo(() => {
    if (targetAmount <= 0 || expectedReturn < 0 || investmentPeriod <= 0) return null;
    const altPeriod = investmentPeriod + 5;
    const altSip = calculateRequiredSip(targetAmount, expectedReturn, altPeriod);
    return { period: altPeriod, sip: altSip };
  }, [targetAmount, expectedReturn, investmentPeriod]);

  return (
    <div className="space-y-8">
      <div className="card p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="label">Target Amount</label>
              <input
                className="input"
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Expected Annual Return (%)</label>
              <input
                className="input"
                type="number"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Investment Period (years)</label>
              <input
                className="input"
                type="number"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(Math.max(1, Number(e.target.value)))}
              />
            </div>
          </div>

          {result && (
            <div className="rounded-2xl bg-slate-50 p-6">
              <div className="text-sm muted">Required Monthly SIP</div>
              <div className="text-4xl font-extrabold mt-2">{inr(result.requiredSip)}</div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div>
                  <div className="text-xs muted">Total Invested</div>
                  <b>{inr(result.totalInvested)}</b>
                </div>
                <div>
                  <div className="text-xs muted">Estimated Returns</div>
                  <b className="text-green-600">{inr(result.estimatedReturns)}</b>
                </div>
              </div>
              <div className="mt-6 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Target Amount:</span>
                  <b>{inr(targetAmount)}</b>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {result && alternativeResult && (
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4">Alternative Scenario</h3>
          <p className="text-sm text-slate-600 mb-4">
            If you extend your investment period by 5 years to <b>{alternativeResult.period} years</b>, you can reduce your monthly SIP:
          </p>
          <div className="rounded-xl bg-blue-50 p-4">
            <div className="text-sm font-semibold text-blue-900 mb-3">Extended Period Option</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Investment Period</span>
                <b>{alternativeResult.period} years</b>
              </div>
              <div className="flex justify-between">
                <span>Required Monthly SIP</span>
                <b>{inr(alternativeResult.sip)}</b>
              </div>
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Monthly Savings</span>
                <b>{inr(result.requiredSip - alternativeResult.sip)}</b>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card p-6 bg-blue-50">
        <h3 className="font-bold mb-3">How to Reach Your ₹1 Crore Goal</h3>
        <ol className="text-sm space-y-2 text-slate-700 list-decimal list-inside">
          <li>Set up a monthly SIP of {result ? inr(result.requiredSip) : "calculated amount"} in a diversified mutual fund portfolio</li>
          <li>Increase your SIP by at least 5-10% annually to keep pace with inflation</li>
          <li>Stay invested for the full period; don't withdraw prematurely</li>
          <li>Review your portfolio performance annually and rebalance if needed</li>
          <li>Consult a financial advisor for tax-efficient investment strategies</li>
        </ol>
      </div>

      <div className="card p-6 bg-slate-50">
        <h3 className="font-bold mb-3">Key Assumptions</h3>
        <ul className="text-sm space-y-2 text-slate-700">
          <li>• Monthly SIP is invested at the beginning of each month</li>
          <li>• The expected return rate remains constant</li>
          <li>• No taxes or fees are deducted from the corpus</li>
          <li>• No lump-sum additions or withdrawals are made</li>
        </ul>
      </div>

      <div className="card p-6 border border-orange-200 bg-orange-50">
        <p className="text-xs text-orange-800">
          <b>Disclaimer:</b> This is an educational calculator showing hypothetical returns based on assumed rates. Actual investment returns vary based on market conditions and are not guaranteed. This is not investment advice. Please consult a SEBI-registered financial advisor before investing.
        </p>
      </div>
    </div>
  );
}
