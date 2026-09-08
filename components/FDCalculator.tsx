"use client";
import { useMemo, useState } from "react";
import { inr, calculateFD } from "@/lib/finance";

export function FDCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(6.5);
  const [tenure, setTenure] = useState(5);
  const [tenureUnit, setTenureUnit] = useState<'years' | 'months'>('years');
  const [frequency, setFrequency] = useState<'yearly' | 'halfYearly' | 'quarterly' | 'monthly'>('yearly');

  const result = useMemo(() => {
    if (!principal || principal < 0 || !rate || rate < 0) {
      return null;
    }
    return calculateFD(Math.max(0, principal), Math.max(0, rate), Math.max(0, tenure), tenureUnit, frequency);
  }, [principal, rate, tenure, tenureUnit, frequency]);

  return (
    <div className="card p-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div>
            <label className="label">Deposit Amount (₹)</label>
            <input
              className="input"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
              min="0"
              step="10000"
            />
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
          </div>

          <div>
            <label className="label">Tenure</label>
            <div className="grid grid-cols-3 gap-3">
              <input
                className="input col-span-2"
                type="number"
                value={tenure}
                onChange={(e) => setTenure(parseFloat(e.target.value) || 0)}
                min="0"
                step="1"
              />
              <select
                className="input"
                value={tenureUnit}
                onChange={(e) => setTenureUnit(e.target.value as 'years' | 'months')}
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Compounding Frequency</label>
            <select
              className="input"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as any)}
            >
              <option value="yearly">Yearly</option>
              <option value="halfYearly">Half-Yearly</option>
              <option value="quarterly">Quarterly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <button
            onClick={() => {
              setPrincipal(500000);
              setRate(6.5);
              setTenure(5);
              setTenureUnit('years');
              setFrequency('yearly');
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
                <div className="text-xs muted font-bold">INVESTED AMOUNT</div>
                <div className="text-2xl font-black mt-1">{inr(result.principal)}</div>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-700">
                <div className="text-xs muted font-bold">INTEREST EARNED</div>
                <div className="text-2xl font-black mt-1">{inr(result.interestEarned)}</div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-5 rounded-lg border-l-4 border-blue-700">
                <div className="text-xs muted font-bold">MATURITY AMOUNT</div>
                <div className="text-2xl font-black mt-1 text-blue-700">{inr(result.maturityAmount)}</div>
              </div>

              <div className="text-xs text-slate-500 leading-6 bg-slate-50 p-3 rounded">
                <strong>Calculation Basis:</strong> Compound interest formula with {frequency} compounding. Results are estimates and actual FD maturity may vary based on bank terms, compounding conventions, taxation, and premature withdrawal rules.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
