"use client";
import { useMemo, useState } from "react";
import { inr, calculatePPF } from "@/lib/finance";

export function PPFCalculator() {
  const [annualInvestment, setAnnualInvestment] = useState(150000);
  const [frequency, setFrequency] = useState<'yearly' | 'monthly'>('yearly');
  const [period, setPeriod] = useState(15);
  const [rate, setRate] = useState(7.1);

  const result = useMemo(() => {
    if (!annualInvestment || annualInvestment < 0 || !rate || rate < 0 || !period || period < 0) {
      return null;
    }
    return calculatePPF(Math.max(0, annualInvestment), frequency, Math.max(1, period), Math.max(0, rate));
  }, [annualInvestment, frequency, period, rate]);

  const maxAnnualLimit = 500000;
  const isAboveLimit = annualInvestment > maxAnnualLimit;

  return (
    <div className="card p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="label">Annual Investment Amount (₹)</label>
            <input
              className="input"
              type="number"
              value={annualInvestment}
              onChange={(e) => setAnnualInvestment(parseFloat(e.target.value) || 0)}
              min="0"
              step="10000"
            />
            {isAboveLimit && (
              <p className="text-xs text-red-600 mt-2">
                ⚠️ Exceeds current PPF annual limit of ₹{inr(maxAnnualLimit)}
              </p>
            )}
          </div>

          <div>
            <label className="label">Investment Frequency</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setFrequency('yearly')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  frequency === 'yearly'
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Yearly
              </button>
              <button
                onClick={() => setFrequency('monthly')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  frequency === 'monthly'
                    ? 'bg-blue-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div>
            <label className="label">Investment Period (Years)</label>
            <input
              className="input"
              type="number"
              value={period}
              onChange={(e) => setPeriod(parseFloat(e.target.value) || 0)}
              min="1"
              step="1"
            />
            <p className="text-xs text-slate-500 mt-2">
              Recommended: 15 years for full maturity benefits
            </p>
          </div>

          <div>
            <label className="label">Annual Interest Rate (%)</label>
            <input
              className="input"
              type="number"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              min="0"
              step="0.1"
            />
            <p className="text-xs text-slate-500 mt-2">
              Current illustrative rate. PPF rates are set by Government of India and reviewed quarterly.
            </p>
          </div>

          <button
            onClick={() => {
              setAnnualInvestment(150000);
              setFrequency('yearly');
              setPeriod(15);
              setRate(7.1);
            }}
            className="btn btn-secondary w-full"
          >
            Reset
          </button>
        </div>

        <div>
          {result && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-700">
                <div className="text-xs muted font-bold">TOTAL INVESTED</div>
                <div className="text-2xl font-black mt-1">{inr(result.totalInvested)}</div>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-700">
                <div className="text-xs muted font-bold">INTEREST EARNED</div>
                <div className="text-2xl font-black mt-1">{inr(result.totalInterestEarned)}</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-5 rounded-lg border-l-4 border-blue-700">
                <div className="text-xs muted font-bold">ESTIMATED MATURITY AMOUNT</div>
                <div className="text-2xl font-black mt-1 text-blue-700">{inr(result.maturityAmount)}</div>
              </div>

              {result.yearlyBreakdown.length > 0 && (
                <div className="mt-6 bg-slate-50 p-4 rounded-lg overflow-x-auto">
                  <div className="text-xs font-bold text-slate-700 mb-3">Year-wise Breakdown</div>
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
                          <td className="text-right py-2 px-2 font-semibold">{inr(row.totalCorpus)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {result.yearlyBreakdown.length > 5 && (
                    <p className="text-xs text-slate-500 mt-2">... (showing last 5 years)</p>
                  )}
                </div>
              )}

              <div className="text-xs text-slate-600 leading-6 bg-yellow-50 p-3 rounded border border-yellow-200">
                <strong>Important:</strong> PPF calculations are estimates based on selected assumptions. Interest rates and government rules may change. This is not an official PPF calculation. Verify with your bank for exact maturity values. Partial withdrawal and premature closure rules apply.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
