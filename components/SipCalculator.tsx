 "use client";
import { useMemo, useState } from "react";
import { inr, sip } from "@/lib/finance";

export function SipCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);
  const result = useMemo(() => {
    const invested = monthly * years * 12;
    const corpus = sip(monthly, rate, years);
    return { invested, corpus, returns: Math.max(0, corpus - invested) };
  }, [monthly, rate, years]);
  return <div className="card p-6">
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-5">
        <div><label className="label">Monthly SIP</label><input className="input" type="number" value={monthly} onChange={e=>setMonthly(Number(e.target.value))}/></div>
        <div><label className="label">Expected annual return (%)</label><input className="input" type="number" step="0.1" value={rate} onChange={e=>setRate(Number(e.target.value))}/></div>
        <div><label className="label">Investment period (years)</label><input className="input" type="number" value={years} onChange={e=>setYears(Number(e.target.value))}/></div>
      </div>
      <div className="rounded-2xl bg-slate-50 p-6">
        <div className="text-sm muted">Estimated corpus</div><div className="text-4xl font-extrabold mt-2">{inr(result.corpus)}</div>
        <div className="grid grid-cols-2 gap-3 mt-6"><div><div className="text-xs muted">Invested</div><b>{inr(result.invested)}</b></div><div><div className="text-xs muted">Estimated returns</div><b>{inr(result.returns)}</b></div></div>
        <div className="mt-6 text-sm text-slate-600">Returns are hypothetical and not guaranteed.</div>
      </div>
    </div>
  </div>
}
