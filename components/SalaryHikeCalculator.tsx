"use client";
import { useMemo, useState } from "react";
import { inr, calculateSalaryHike } from "@/lib/finance";

export function SalaryHikeCalculator() {
  const [currentCtc, setCurrentCtc] = useState(1200000);
  const [hikePercentage, setHikePercentage] = useState(10);

  const result = useMemo(() => {
    if (currentCtc <= 0 || hikePercentage < 0) return null;
    return calculateSalaryHike(currentCtc, hikePercentage);
  }, [currentCtc, hikePercentage]);

  return (
    <div className="space-y-8">
      <div className="card p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="label">Current Annual CTC</label>
              <input
                className="input"
                type="number"
                value={currentCtc}
                onChange={(e) => setCurrentCtc(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Hike Percentage (%)</label>
              <input
                className="input"
                type="number"
                step="0.5"
                value={hikePercentage}
                onChange={(e) => setHikePercentage(Math.max(0, Number(e.target.value)))}
              />
            </div>
          </div>

          {result && (
            <div className="rounded-2xl bg-slate-50 p-6">
              <div className="text-sm muted">New Annual CTC</div>
              <div className="text-4xl font-extrabold mt-2">{inr(result.newCtc)}</div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div>
                  <div className="text-xs muted">Hike Amount</div>
                  <b>{inr(result.hikeAmount)}</b>
                </div>
                <div>
                  <div className="text-xs muted">Percentage Increase</div>
                  <b>{result.hikePercentage.toFixed(1)}%</b>
                </div>
              </div>
              <div className="mt-6 text-sm text-slate-600">
                <div className="flex justify-between mb-2">
                  <span>Current Monthly:</span>
                  <b>{inr(result.currentMonthly)}</b>
                </div>
                <div className="flex justify-between">
                  <span>New Monthly:</span>
                  <b>{inr(result.newMonthly)}</b>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4">Before → After Comparison</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-blue-50 p-4">
              <div className="text-sm font-semibold text-blue-900 mb-3">Current</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Annual CTC</span>
                  <b>{inr(result.currentCtc)}</b>
                </div>
                <div className="flex justify-between">
                  <span>Monthly CTC</span>
                  <b>{inr(result.currentMonthly)}</b>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <div className="text-sm font-semibold text-green-900 mb-3">After Hike</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Annual CTC</span>
                  <b>{inr(result.newCtc)}</b>
                </div>
                <div className="flex justify-between">
                  <span>Monthly CTC</span>
                  <b>{inr(result.newMonthly)}</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card p-6 bg-blue-50">
        <h3 className="font-bold mb-3">What This Means</h3>
        <p className="text-sm leading-6 text-slate-700">
          This calculator shows the impact of a salary hike on your CTC and monthly income. The amount shown is your gross salary before taxes and deductions. Your actual in-hand salary depends on factors like tax slab, PF contributions, and other deductions.
        </p>
      </div>

      <div className="card p-6 bg-slate-50">
        <h3 className="font-bold mb-3">Key Assumptions</h3>
        <ul className="text-sm space-y-2 text-slate-700">
          <li>• CTC is calculated on a monthly basis (divided by 12)</li>
          <li>• This does not account for taxes or deductions</li>
          <li>• Actual in-hand salary may vary based on your tax bracket</li>
        </ul>
      </div>

      <div className="card p-6 border border-orange-200 bg-orange-50">
        <p className="text-xs text-orange-800">
          <b>Disclaimer:</b> This is an educational estimate only. Actual tax liability depends on your income, deductions, and applicable tax laws. Consult a tax professional for personalized advice.
        </p>
      </div>
    </div>
  );
}
