 "use client";
import { useMemo, useState } from "react";
import { emi, inr } from "@/lib/finance";

export function EmiCalculator() {
  const [loan, setLoan] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const result = useMemo(() => {
    const monthly = emi(loan, rate, years);
    const total = monthly * years * 12;
    return { monthly, interest: total - loan, total };
  }, [loan, rate, years]);
  return <div className="card p-6">
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        <div><label className="label">Loan amount</label><input className="input" type="number" value={loan} onChange={e=>setLoan(Number(e.target.value))}/></div>
        <div><label className="label">Interest rate (%)</label><input className="input" type="number" step="0.1" value={rate} onChange={e=>setRate(Number(e.target.value))}/></div>
        <div><label className="label">Tenure (years)</label><input className="input" type="number" value={years} onChange={e=>setYears(Number(e.target.value))}/></div>
      </div>
      <div className="rounded-2xl bg-slate-50 p-6">
        <div className="text-sm muted">Estimated monthly EMI</div><div className="text-4xl font-extrabold mt-2">{inr(result.monthly)}</div>
        <div className="grid grid-cols-2 gap-3 mt-6"><div><div className="text-xs muted">Principal</div><b>{inr(loan)}</b></div><div><div className="text-xs muted">Interest</div><b>{inr(result.interest)}</b></div></div>
        <div className="mt-6 text-sm text-slate-600">Estimate only. Actual EMI may vary by lender, rate type, fees and rounding.</div>
      </div>
    </div>
  </div>
}
