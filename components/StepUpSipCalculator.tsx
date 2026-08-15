"use client";
import { useMemo, useState } from "react";
import { inr, stepUpSIPYearwise } from "@/lib/finance";

export function StepUpSipCalculator() {
  const [startingSip, setStartingSip] = useState(10000);
  const [annualStepUp, setAnnualStepUp] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);

  const result = useMemo(() => {
    if (startingSip <= 0 || annualStepUp < 0 || expectedReturn < 0 || investmentPeriod <= 0) return null;
    return stepUpSIPYearwise(startingSip, annualStepUp, expectedReturn, investmentPeriod);
  }, [startingSip, annualStepUp, expectedReturn, investmentPeriod]);

  const summary = useMemo(() => {
    if (!result) return null;
    const totalInvested = result.reduce((sum, y) => sum + y.yearlyInvested, 0);
    const finalCorpus = result[result.length - 1]?.yearlyCorpus || 0;
    const totalReturns = finalCorpus - totalInvested;
    return { totalInvested, finalCorpus, totalReturns };
  }, [result]);

  return (
    <div className="space-y-8">
      <div className="card p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="label">Starting Monthly SIP</label>
              <input
                className="input"
                type="number"
                value={startingSip}
                onChange={(e) => setStartingSip(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Annual Step-Up (%)</label>
              <input
                className="input"
                type="number"
                step="0.5"
                value={annualStepUp}
                onChange={(e) => setAnnualStepUp(Math.max(0, Number(e.target.value)))}
              />
              <p className="text-xs text-slate-500 mt-1">Your SIP increases by this % every year</p>
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

          {summary && (
            <div className="rounded-2xl bg-slate-50 p-6">
              <div className="text-sm muted">Final Corpus</div>
              <div className="text-4xl font-extrabold mt-2">{inr(summary.finalCorpus)}</div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div>
                  <div className="text-xs muted">Total Invested</div>
                  <b>{inr(summary.totalInvested)}</b>
                </div>
                <div>
                  <div className="text-xs muted">Estimated Returns</div>
                  <b className="text-green-600">{inr(summary.totalReturns)}</b>
                </div>
              </div>
              <div className="mt-6 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Year 1 Monthly SIP:</span>
                  <b>{inr(startingSip)}</b>
                </div>
                <div className="flex justify-between">
                  <span>Final Year Monthly SIP:</span>
                  <b>{inr(startingSip * Math.pow(1 + annualStepUp / 100, investmentPeriod - 1))}</b>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {result && result.length > 0 && (
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4">Year-Wise Investment Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-2">Year</th>
                  <th className="text-right py-2 px-2">Monthly SIP</th>
                  <th className="text-right py-2 px-2">Annual Invested</th>
                  <th className="text-right py-2 px-2">Corpus</th>
                  <th className="text-right py-2 px-2">Annual Returns</th>
                </tr>
              </thead>
              <tbody>
                {result.map((row) => (
                  <tr key={row.year} className="border-b border-slate-100">
                    <td className="py-2 px-2">{row.year}</td>
                    <td className="text-right py-2 px-2">{inr(row.monthlySip)}</td>
                    <td className="text-right py-2 px-2">{inr(row.yearlyInvested)}</td>
                    <td className="text-right py-2 px-2 font-semibold">{inr(row.yearlyCorpus)}</td>
                    <td className="text-right py-2 px-2 text-green-600">{inr(row.yearlyReturns)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="card p-6 bg-blue-50">
        <h3 className="font-bold mb-3">What This Means</h3>
        <p className="text-sm leading-6 text-slate-700">
          Step-up SIP is ideal if you expect your income to grow. You start with a small SIP and increase it every year by a fixed percentage. This helps you invest more as your earning capacity increases, while compounding works on your earlier investments.
        </p>
      </div>

      <div className="card p-6 bg-slate-50">
        <h3 className="font-bold mb-3">Key Assumptions</h3>
        <ul className="text-sm space-y-2 text-slate-700">
          <li>• Annual step-up is applied at the beginning of each year</li>
          <li>• Returns are calculated monthly and compounded</li>
          <li>• The expected return rate is assumed to be constant</li>
          <li>• No taxes or fees are deducted</li>
        </ul>
      </div>

      <div className="card p-6 border border-orange-200 bg-orange-50">
        <p className="text-xs text-orange-800">
          <b>Disclaimer:</b> These are hypothetical returns based on assumed rates. Actual market returns vary and are not guaranteed. This calculator is for educational purposes only. Consult a financial advisor before making investment decisions.
        </p>
      </div>
    </div>
  );
}
