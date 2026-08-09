export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.max(0, n || 0));

export function emi(principal: number, annualRate: number, years: number) {
  const n = Math.max(1, Math.round(years * 12));
  const r = Math.max(0, annualRate) / 1200;
  if (!r) return principal / n;
  return principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
}

export function sip(monthly: number, annualRate: number, years: number) {
  const n = Math.max(0, Math.round(years * 12));
  const r = Math.max(0, annualRate) / 1200;
  if (!r) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

export function stepUpSIP(start: number, annualStep: number, annualRate: number, years: number) {
  let corpus = 0;
  let invested = 0;
  const r = Math.max(0, annualRate) / 1200;
  for (let y = 0; y < years; y++) {
    const monthly = start * Math.pow(1 + annualStep / 100, y);
    for (let m = 0; m < 12; m++) {
      corpus = corpus * (1 + r) + monthly;
      invested += monthly;
    }
  }
  return { corpus, invested, returns: Math.max(0, corpus - invested) };
}

export function futureValue(pv: number, monthly: number, annualRate: number, years: number) {
  const r = Math.max(0, annualRate) / 1200;
  const n = Math.max(0, Math.round(years * 12));
  const growth = Math.pow(1 + r, n);
  return pv * growth + (r ? monthly * (growth - 1) / r : monthly * n);
}
