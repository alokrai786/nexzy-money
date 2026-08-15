"use client";
import { useMemo, useState } from "react";
import { inr, calculateLoanPrepayment } from "@/lib/finance";

export function LoanPrepaymentCalculator() {
  const [outstandingLoan, setOutstandingLoan] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [remainingMonths, setRemainingMonths] = useState(240);
  const [prepaymentAmount, setPrepaymentAmount] = useState(500000);
  const [reduceEmi, setReduceEmi] = useState(true);

  const result = useMemo(() => {
    if (outstandingLoan <= 0 || interestRate < 0 || remainingMonths <= 0 || prepaymentAmount < 0) return null;
    if (prepaymentAmount > outstandingLoan) return null;
    return calculateLoanPrepayment(outstandingLoan, interestRate, remainingMonths, prepaymentAmount, reduceEmi);
  }, [outstandingLoan, interestRate, remainingMonths, prepaymentAmount, reduceEmi]);

  return (
    <div className="space-y-8">
      <div className="card p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="label">Outstanding Loan Amount</label>
              <input
                className="input"
                type="number"
                value={outstandingLoan}
                onChange={(e) => setOutstandingLoan(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Interest Rate (%)</label>
              <input
                className="input"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Remaining Tenure (months)</label>
              <input
                className="input"
                type="number"
                value={remainingMonths}
                onChange={(e) => setRemainingMonths(Math.max(1, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Prepayment Amount</label>
              <input
                className="input"
                type="number"
                value={prepaymentAmount}
                onChange={(e) => setPrepaymentAmount(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className="label">Choose Prepayment Strategy</label>
              <div className="space-y-2 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={reduceEmi}
                    onChange={() => setReduceEmi(true)}
                  />
                  <span className="text-sm">Reduce Tenure (Keep EMI same)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!reduceEmi}
                    onChange={() => setReduceEmi(false)}
                  />
                  <span className="text-sm">Reduce EMI (Keep Tenure same)</span>
                </label>
              </div>
            </div>
          </div>

          {result && (
            <div className="rounded-2xl bg-slate-50 p-6">
              <div className="text-sm muted">Interest Saved</div>
              <div className="text-4xl font-extrabold mt-2 text-green-600">{inr(result.interestSaved)}</div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div>
                  <div className="text-xs muted">Current EMI</div>
                  <b>{inr(result.currentEmi)}</b>
                </div>
                <div>
                  <div className="text-xs muted">New EMI</div>
                  <b>{inr(result.newEmi)}</b>
                </div>
              </div>
              <div className="mt-6 space-y-2 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Tenure Reduced By:</span>
                  <b>{Math.round(result.monthsSaved)} months ({Math.round(result.monthsSaved / 12)} years)</b>
                </div>
                <div className="flex justify-between">
                  <span>New Tenure:</span>
                  <b>{result.newTenureMonths} months</b>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4">Interest Comparison</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl bg-red-50 p-4">
              <div className="text-sm font-semibold text-red-900 mb-3">Without Prepayment</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Interest Payable</span>
                  <b>{inr(result.interestPayableNow)}</b>
                </div>
                <div className="flex justify-between">
                  <span>Tenure</span>
                  <b>{result.remainingMonths} months</b>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-green-50 p-4">
              <div className="text-sm font-semibold text-green-900 mb-3">After Prepayment</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Interest Payable</span>
                  <b>{inr(result.interestPayableAfter)}</b>
                </div>
                <div className="flex justify-between">
                  <span>Tenure</span>
                  <b>{result.newTenureMonths} months</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card p-6 bg-blue-50">
        <h3 className="font-bold mb-3">What This Means</h3>
        <p className="text-sm leading-6 text-slate-700">
          Prepayment allows you to reduce your loan burden faster. You can either reduce your monthly EMI (keeping the tenure the same) or reduce your tenure (keeping the EMI the same). The calculator shows the interest savings in both scenarios.
        </p>
      </div>

      <div className="card p-6 bg-slate-50">
        <h3 className="font-bold mb-3">Key Assumptions</h3>
        <ul className="text-sm space-y-2 text-slate-700">
          <li>• EMI is calculated using standard amortization formula</li>
          <li>• Interest rate is assumed to be fixed</li>
          <li>• No processing fees or penalties are included</li>
          <li>• Interest savings are calculated based on new tenure</li>
        </ul>
      </div>

      <div className="card p-6 border border-orange-200 bg-orange-50">
        <p className="text-xs text-orange-800">
          <b>Disclaimer:</b> This is an educational estimate only. Actual prepayment terms, penalties, and interest calculations may vary by lender. Always check with your lender for exact figures before making prepayment decisions.
        </p>
      </div>
    </div>
  );
}
