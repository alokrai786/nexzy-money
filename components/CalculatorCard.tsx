'use client';

import { useId, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export type CalculatorId =
  | 'sip'
  | 'step-up-sip'
  | 'lumpsum'
  | 'swp'
  | 'cagr'
  | 'ppf'
  | 'fd'
  | 'rd'
  | 'epf'
  | 'nps'
  | 'emi'
  | 'home-loan'
  | 'simple-interest'
  | 'compound-interest'
  | 'inflation'
  | 'retirement'
  | 'income-tax'
  | 'gst'
  | 'gratuity'
  | 'hra';

export type CalculatorCategory = 'Invest' | 'Save' | 'Borrow' | 'Plan' | 'Tax & pay';

type Values = Record<string, number>;
type Format = 'currency' | 'percent' | 'years' | 'number';

interface SliderField {
  kind: 'slider';
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  initial: number;
  format: Format;
}

interface SelectField {
  kind: 'select';
  id: string;
  label: string;
  options: ReadonlyArray<{ label: string; value: number }>;
  initial: number;
}

type Field = SliderField | SelectField;

interface Stat {
  label: string;
  value: string;
  tone?: 'positive' | 'negative' | 'accent';
}

interface SplitPart {
  label: string;
  value: number;
  className: string;
}

interface SeriesPoint {
  x: string;
  base: number;
  value: number;
}

interface Result {
  headline: { label: string; display: string; raw?: number };
  stats: Stat[];
  split?: SplitPart[];
  chart?: { baseLabel: string; valueLabel: string; points: SeriesPoint[] };
  note?: string;
}

export interface CalculatorDef {
  id: CalculatorId;
  name: string;
  category: CalculatorCategory;
  description: string;
  fields: Field[];
  compute: (v: Values) => Result;
}

/* -------------------------------------------------------------------------- */
/*                                  Formatters                                */
/* -------------------------------------------------------------------------- */

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const safe = (n: number): number => (Number.isFinite(n) ? n : 0);
const inr = (n: number): string => inrFormatter.format(Math.round(safe(n)));

const compactInr = (n: number): string => {
  const a = Math.abs(safe(n));
  const s = n < 0 ? '-' : '';
  if (a >= 1e7) return `${s}₹${(a / 1e7).toFixed(2)} Cr`;
  if (a >= 1e5) return `${s}₹${(a / 1e5).toFixed(2)} L`;
  return inr(n);
};

const axisInr = (n: number): string => {
  const a = Math.abs(n);
  if (a >= 1e7) return `${(n / 1e7).toFixed(1)}Cr`;
  if (a >= 1e5) return `${(n / 1e5).toFixed(1)}L`;
  if (a >= 1e3) return `${(n / 1e3).toFixed(0)}k`;
  return String(Math.round(n));
};

const pct = (n: number, digits = 2): string => `${Number(safe(n).toFixed(digits))}%`;

const formatValue = (n: number, format: Format): string => {
  switch (format) {
    case 'currency':
      return inr(n);
    case 'percent':
      return pct(n);
    case 'years':
      return `${Number(n.toFixed(2))} ${n === 1 ? 'yr' : 'yrs'}`;
    default:
      return String(Number(n.toFixed(2)));
  }
};

const monthsToText = (months: number): string => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m} mo`;
  if (m === 0) return `${y} yrs`;
  return `${y} yrs ${m} mo`;
};

/* -------------------------------------------------------------------------- */
/*                               Field shortcuts                              */
/* -------------------------------------------------------------------------- */

const slider = (
  id: string,
  label: string,
  min: number,
  max: number,
  step: number,
  initial: number,
  format: Format,
): SliderField => ({ kind: 'slider', id, label, min, max, step, initial, format });

const select = (
  id: string,
  label: string,
  options: ReadonlyArray<{ label: string; value: number }>,
  initial: number,
): SelectField => ({ kind: 'select', id, label, options, initial });

const stat = (label: string, value: string, tone?: Stat['tone']): Stat => ({ label, value, tone });

/* -------------------------------------------------------------------------- */
/*                               Finance engines                              */
/* -------------------------------------------------------------------------- */

/** Monthly investing with optional yearly step-up. Instalments are made at the start of each month. */
const growth = (monthly: number, annualRate: number, years: number, stepUp = 0) => {
  const i = annualRate / 1200;
  let balance = 0;
  let invested = 0;
  let current = monthly;
  const points: SeriesPoint[] = [];
  for (let y = 1; y <= years; y += 1) {
    for (let m = 0; m < 12; m += 1) {
      balance = (balance + current) * (1 + i);
      invested += current;
    }
    points.push({ x: `Y${y}`, base: Math.round(invested), value: Math.round(balance) });
    current *= 1 + stepUp / 100;
  }
  return { balance, invested, points };
};

const compoundPoints = (principal: number, rate: number, years: number, perYear: number): SeriesPoint[] => {
  const points: SeriesPoint[] = [];
  for (let y = 1; y <= years; y += 1) {
    points.push({
      x: `Y${y}`,
      base: Math.round(principal),
      value: Math.round(principal * Math.pow(1 + rate / (100 * perYear), perYear * y)),
    });
  }
  return points;
};

/** Recurring deposit: each instalment compounds quarterly for its remaining months. */
const rdValue = (deposit: number, rate: number, months: number): number => {
  let total = 0;
  for (let k = 1; k <= months; k += 1) {
    total += deposit * Math.pow(1 + rate / 400, (months - k + 1) / 3);
  }
  return total;
};

const amortize = (principal: number, annualRate: number, years: number, extra = 0) => {
  const i = annualRate / 1200;
  const n = Math.round(years * 12);
  const emi =
    i === 0 ? principal / n : (principal * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  let balance = principal;
  let interest = 0;
  let months = 0;
  const points: SeriesPoint[] = [];
  while (balance > 0.5 && months < n + 1) {
    const monthlyInterest = balance * i;
    let principalPaid = emi - monthlyInterest + extra;
    if (principalPaid > balance) principalPaid = balance;
    balance -= principalPaid;
    interest += monthlyInterest;
    months += 1;
    if (months % 12 === 0 || balance <= 0.5) {
      points.push({
        x: `Y${Math.ceil(months / 12)}`,
        base: Math.round(principal - balance),
        value: Math.round(Math.max(balance, 0)),
      });
    }
  }
  return { emi, interest, months, n, points };
};

/** New tax regime slabs (FY 2025-26). Surcharge is not included. */
const NEW_REGIME_SLABS: ReadonlyArray<readonly [number, number]> = [
  [400000, 0],
  [800000, 0.05],
  [1200000, 0.1],
  [1600000, 0.15],
  [2000000, 0.2],
  [2400000, 0.25],
  [Number.POSITIVE_INFINITY, 0.3],
];

const newRegimeTax = (taxable: number): number => {
  let tax = 0;
  let previous = 0;
  for (const [limit, rate] of NEW_REGIME_SLABS) {
    if (taxable > previous) tax += (Math.min(taxable, limit) - previous) * rate;
    previous = limit;
  }
  if (taxable <= 1200000) return 0; // Section 87A rebate
  return Math.min(tax, taxable - 1200000); // marginal relief just above ₹12 lakh
};

/* -------------------------------------------------------------------------- */
/*                              Calculator catalogue                          */
/* -------------------------------------------------------------------------- */

const COMPOUNDING = [
  { label: 'Yearly', value: 1 },
  { label: 'Half-yearly', value: 2 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
] as const;

export const CALCULATORS: CalculatorDef[] = [
  {
    id: 'sip',
    name: 'SIP Calculator',
    category: 'Invest',
    description: 'See what a monthly mutual fund SIP can grow into.',
    fields: [
      slider('monthly', 'Monthly investment', 500, 200000, 500, 10000, 'currency'),
      slider('rate', 'Expected return (p.a.)', 1, 30, 0.5, 12, 'percent'),
      slider('years', 'Time period', 1, 40, 1, 10, 'years'),
    ],
    compute: (v) => {
      const g = growth(v.monthly, v.rate, v.years);
      const gains = g.balance - g.invested;
      return {
        headline: { label: 'Expected value', display: inr(g.balance), raw: g.balance },
        stats: [
          stat('Amount invested', inr(g.invested)),
          stat('Estimated returns', inr(gains), 'positive'),
          stat('Wealth multiple', `${(g.balance / g.invested).toFixed(2)}x`, 'accent'),
        ],
        split: [
          { label: 'Invested', value: g.invested, className: 'bg-slate-400' },
          { label: 'Returns', value: gains, className: 'bg-neon-400' },
        ],
        chart: { baseLabel: 'Invested', valueLabel: 'Value', points: g.points },
      };
    },
  },
  {
    id: 'step-up-sip',
    name: 'Step-up SIP Calculator',
    category: 'Invest',
    description: 'SIP that grows each year as your income does.',
    fields: [
      slider('monthly', 'Starting monthly investment', 500, 200000, 500, 10000, 'currency'),
      slider('stepUp', 'Yearly step-up', 0, 30, 1, 10, 'percent'),
      slider('rate', 'Expected return (p.a.)', 1, 30, 0.5, 12, 'percent'),
      slider('years', 'Time period', 1, 40, 1, 15, 'years'),
    ],
    compute: (v) => {
      const g = growth(v.monthly, v.rate, v.years, v.stepUp);
      const flat = growth(v.monthly, v.rate, v.years);
      const gains = g.balance - g.invested;
      return {
        headline: { label: 'Expected value', display: inr(g.balance), raw: g.balance },
        stats: [
          stat('Amount invested', inr(g.invested)),
          stat('Estimated returns', inr(gains), 'positive'),
          stat('Extra vs flat SIP', inr(g.balance - flat.balance), 'accent'),
        ],
        split: [
          { label: 'Invested', value: g.invested, className: 'bg-slate-400' },
          { label: 'Returns', value: gains, className: 'bg-neon-400' },
        ],
        chart: { baseLabel: 'Invested', valueLabel: 'Value', points: g.points },
      };
    },
  },
  {
    id: 'lumpsum',
    name: 'Lumpsum Calculator',
    category: 'Invest',
    description: 'Growth of a one-time investment.',
    fields: [
      slider('principal', 'Investment amount', 5000, 50000000, 5000, 500000, 'currency'),
      slider('rate', 'Expected return (p.a.)', 1, 30, 0.5, 12, 'percent'),
      slider('years', 'Time period', 1, 40, 1, 10, 'years'),
    ],
    compute: (v) => {
      const points = compoundPoints(v.principal, v.rate, v.years, 1);
      const value = points[points.length - 1]?.value ?? v.principal;
      return {
        headline: { label: 'Expected value', display: inr(value), raw: value },
        stats: [
          stat('Amount invested', inr(v.principal)),
          stat('Estimated returns', inr(value - v.principal), 'positive'),
          stat('Wealth multiple', `${(value / v.principal).toFixed(2)}x`, 'accent'),
        ],
        split: [
          { label: 'Invested', value: v.principal, className: 'bg-slate-400' },
          { label: 'Returns', value: value - v.principal, className: 'bg-neon-400' },
        ],
        chart: { baseLabel: 'Invested', valueLabel: 'Value', points },
      };
    },
  },
  {
    id: 'swp',
    name: 'SWP Calculator',
    category: 'Invest',
    description: 'Check how long a corpus lasts with monthly withdrawals.',
    fields: [
      slider('corpus', 'Starting corpus', 100000, 100000000, 50000, 5000000, 'currency'),
      slider('withdrawal', 'Monthly withdrawal', 1000, 500000, 1000, 30000, 'currency'),
      slider('rate', 'Expected return (p.a.)', 1, 20, 0.5, 8, 'percent'),
      slider('years', 'Withdrawal period', 1, 40, 1, 15, 'years'),
    ],
    compute: (v) => {
      const i = v.rate / 1200;
      let balance = v.corpus;
      let withdrawn = 0;
      let lasted = 0;
      const points: SeriesPoint[] = [];
      for (let m = 1; m <= v.years * 12; m += 1) {
        if (balance <= 0) break;
        const take = Math.min(v.withdrawal, balance);
        balance -= take;
        withdrawn += take;
        balance *= 1 + i;
        lasted = m;
        if (m % 12 === 0) {
          points.push({ x: `Y${m / 12}`, base: Math.round(withdrawn), value: Math.round(balance) });
        }
      }
      const depleted = balance <= 0.5;
      return {
        headline: {
          label: depleted ? 'Corpus runs out in' : 'Balance after withdrawals',
          display: depleted ? monthsToText(lasted) : inr(balance),
          raw: depleted ? undefined : balance,
        },
        stats: [
          stat('Total withdrawn', inr(withdrawn), 'accent'),
          stat('Starting corpus', inr(v.corpus)),
          stat('Status', depleted ? 'Corpus depleted' : 'Corpus lasts', depleted ? 'negative' : 'positive'),
        ],
        chart: { baseLabel: 'Total withdrawn', valueLabel: 'Balance', points },
        note: depleted ? 'Lower the withdrawal or raise the corpus to make it last the full period.' : undefined,
      };
    },
  },
  {
    id: 'cagr',
    name: 'CAGR Calculator',
    category: 'Invest',
    description: 'Yearly growth rate between two values.',
    fields: [
      slider('initial', 'Initial value', 1000, 100000000, 1000, 100000, 'currency'),
      slider('final', 'Final value', 1000, 500000000, 1000, 250000, 'currency'),
      slider('years', 'Time period', 1, 40, 1, 5, 'years'),
    ],
    compute: (v) => {
      const cagr = (Math.pow(v.final / v.initial, 1 / v.years) - 1) * 100;
      const points: SeriesPoint[] = [];
      for (let y = 1; y <= v.years; y += 1) {
        points.push({
          x: `Y${y}`,
          base: Math.round(v.initial),
          value: Math.round(v.initial * Math.pow(1 + cagr / 100, y)),
        });
      }
      return {
        headline: { label: 'CAGR', display: pct(cagr) },
        stats: [
          stat('Absolute return', pct(((v.final - v.initial) / v.initial) * 100), cagr >= 0 ? 'positive' : 'negative'),
          stat('Gain or loss', inr(v.final - v.initial), v.final >= v.initial ? 'positive' : 'negative'),
          stat('Growth multiple', `${(v.final / v.initial).toFixed(2)}x`, 'accent'),
        ],
        chart: { baseLabel: 'Initial value', valueLabel: 'Value at CAGR', points },
      };
    },
  },
  {
    id: 'ppf',
    name: 'PPF Calculator',
    category: 'Save',
    description: 'Public Provident Fund maturity, tax-free.',
    fields: [
      slider('deposit', 'Yearly deposit', 500, 150000, 500, 150000, 'currency'),
      slider('rate', 'Interest rate (p.a.)', 6, 9, 0.1, 7.1, 'percent'),
      slider('years', 'Tenure (15 years + 5-year blocks)', 15, 50, 5, 15, 'years'),
    ],
    compute: (v) => {
      let balance = 0;
      const points: SeriesPoint[] = [];
      for (let y = 1; y <= v.years; y += 1) {
        balance = (balance + v.deposit) * (1 + v.rate / 100);
        points.push({ x: `Y${y}`, base: Math.round(v.deposit * y), value: Math.round(balance) });
      }
      const invested = v.deposit * v.years;
      return {
        headline: { label: 'Maturity value', display: inr(balance), raw: balance },
        stats: [
          stat('Total deposited', inr(invested)),
          stat('Interest earned', inr(balance - invested), 'positive'),
          stat('Tax on maturity', '₹0 (EEE)', 'accent'),
        ],
        split: [
          { label: 'Deposited', value: invested, className: 'bg-slate-400' },
          { label: 'Interest', value: balance - invested, className: 'bg-neon-400' },
        ],
        chart: { baseLabel: 'Deposited', valueLabel: 'Balance', points },
        note: 'Assumes the full yearly deposit is made before the 5th of April each year. The PPF rate is revised quarterly by the government.',
      };
    },
  },
  {
    id: 'fd',
    name: 'FD Calculator',
    category: 'Save',
    description: 'Fixed deposit maturity with your compounding.',
    fields: [
      slider('principal', 'Deposit amount', 10000, 50000000, 5000, 500000, 'currency'),
      slider('rate', 'Interest rate (p.a.)', 3, 10, 0.1, 7, 'percent'),
      slider('years', 'Tenure', 1, 30, 1, 5, 'years'),
      select('freq', 'Compounding', COMPOUNDING, 4),
    ],
    compute: (v) => {
      const points = compoundPoints(v.principal, v.rate, v.years, v.freq);
      const value = points[points.length - 1]?.value ?? v.principal;
      return {
        headline: { label: 'Maturity value', display: inr(value), raw: value },
        stats: [
          stat('Deposit', inr(v.principal)),
          stat('Interest earned', inr(value - v.principal), 'positive'),
          stat('Effective yearly yield', pct((Math.pow(1 + v.rate / (100 * v.freq), v.freq) - 1) * 100), 'accent'),
        ],
        split: [
          { label: 'Deposit', value: v.principal, className: 'bg-slate-400' },
          { label: 'Interest', value: value - v.principal, className: 'bg-neon-400' },
        ],
        chart: { baseLabel: 'Deposit', valueLabel: 'Value', points },
        note: 'Interest is taxable at your slab rate.',
      };
    },
  },
  {
    id: 'rd',
    name: 'RD Calculator',
    category: 'Save',
    description: 'Recurring deposit maturity with quarterly compounding.',
    fields: [
      slider('deposit', 'Monthly deposit', 500, 200000, 500, 10000, 'currency'),
      slider('rate', 'Interest rate (p.a.)', 3, 10, 0.1, 6.8, 'percent'),
      slider('years', 'Tenure', 1, 10, 1, 5, 'years'),
    ],
    compute: (v) => {
      const points: SeriesPoint[] = [];
      for (let y = 1; y <= v.years; y += 1) {
        points.push({
          x: `Y${y}`,
          base: Math.round(v.deposit * y * 12),
          value: Math.round(rdValue(v.deposit, v.rate, y * 12)),
        });
      }
      const value = rdValue(v.deposit, v.rate, v.years * 12);
      const invested = v.deposit * v.years * 12;
      return {
        headline: { label: 'Maturity value', display: inr(value), raw: value },
        stats: [
          stat('Total deposited', inr(invested)),
          stat('Interest earned', inr(value - invested), 'positive'),
          stat('Tenure', `${v.years * 12} months`, 'accent'),
        ],
        split: [
          { label: 'Deposited', value: invested, className: 'bg-slate-400' },
          { label: 'Interest', value: value - invested, className: 'bg-neon-400' },
        ],
        chart: { baseLabel: 'Deposited', valueLabel: 'Value', points },
      };
    },
  },
  {
    id: 'epf',
    name: 'EPF Calculator',
    category: 'Save',
    description: 'Provident fund corpus at retirement.',
    fields: [
      slider('basic', 'Monthly basic + DA', 5000, 500000, 1000, 40000, 'currency'),
      slider('age', 'Current age', 20, 57, 1, 28, 'number'),
      slider('raise', 'Yearly salary increase', 0, 15, 0.5, 6, 'percent'),
      slider('rate', 'EPF interest rate (p.a.)', 7, 10, 0.05, 8.25, 'percent'),
    ],
    compute: (v) => {
      const years = Math.max(1, 58 - v.age);
      let balance = 0;
      let invested = 0;
      const points: SeriesPoint[] = [];
      for (let y = 1; y <= years; y += 1) {
        const basic = v.basic * Math.pow(1 + v.raise / 100, y - 1);
        const employee = 0.12 * basic;
        const employer = Math.max(0, 0.12 * basic - Math.min(0.0833 * basic, 1250));
        const monthly = employee + employer;
        let accrued = 0;
        for (let m = 0; m < 12; m += 1) {
          balance += monthly;
          invested += monthly;
          accrued += (balance * v.rate) / 1200;
        }
        balance += accrued;
        points.push({ x: `Y${y}`, base: Math.round(invested), value: Math.round(balance) });
      }
      return {
        headline: { label: `EPF corpus at age 58`, display: inr(balance), raw: balance },
        stats: [
          stat('Total contributions', inr(invested)),
          stat('Interest earned', inr(balance - invested), 'positive'),
          stat('Years to retirement', `${years} yrs`, 'accent'),
        ],
        split: [
          { label: 'Contributions', value: invested, className: 'bg-slate-400' },
          { label: 'Interest', value: balance - invested, className: 'bg-neon-400' },
        ],
        chart: { baseLabel: 'Contributions', valueLabel: 'Balance', points },
        note: 'Employee 12% of basic; employer 12% minus the EPS share (8.33%, capped at ₹1,250 a month). Interest accrues monthly and is credited yearly.',
      };
    },
  },
  {
    id: 'nps',
    name: 'NPS Calculator',
    category: 'Save',
    description: 'National Pension System corpus and monthly pension at 60.',
    fields: [
      slider('monthly', 'Monthly contribution', 500, 200000, 500, 10000, 'currency'),
      slider('age', 'Current age', 18, 59, 1, 30, 'number'),
      slider('rate', 'Expected return (p.a.)', 6, 14, 0.5, 10, 'percent'),
      slider('annuityPct', 'Corpus used to buy annuity', 40, 100, 5, 40, 'percent'),
      slider('annuityRate', 'Annuity rate (p.a.)', 4, 9, 0.5, 6, 'percent'),
    ],
    compute: (v) => {
      const years = Math.max(1, 60 - v.age);
      const g = growth(v.monthly, v.rate, years);
      const annuityCorpus = (g.balance * v.annuityPct) / 100;
      const lumpsum = g.balance - annuityCorpus;
      const pension = (annuityCorpus * v.annuityRate) / 100 / 12;
      return {
        headline: { label: 'Corpus at age 60', display: inr(g.balance), raw: g.balance },
        stats: [
          stat('Lumpsum you can withdraw', inr(lumpsum), 'positive'),
          stat('Estimated monthly pension', inr(pension), 'accent'),
          stat('Amount invested', inr(g.invested)),
        ],
        split: [
          { label: 'Invested', value: g.invested, className: 'bg-slate-400' },
          { label: 'Returns', value: g.balance - g.invested, className: 'bg-neon-400' },
        ],
        chart: { baseLabel: 'Invested', valueLabel: 'Corpus', points: g.points },
        note: 'At least 40% of the corpus must be used to buy an annuity.',
      };
    },
  },
  {
    id: 'emi',
    name: 'EMI Calculator',
    category: 'Borrow',
    description: 'Monthly instalment for personal, car or any loan.',
    fields: [
      slider('principal', 'Loan amount', 10000, 20000000, 10000, 500000, 'currency'),
      slider('rate', 'Interest rate (p.a.)', 5, 30, 0.1, 11, 'percent'),
      slider('years', 'Loan tenure', 1, 10, 1, 3, 'years'),
    ],
    compute: (v) => {
      const a = amortize(v.principal, v.rate, v.years);
      const total = v.principal + a.interest;
      return {
        headline: { label: 'Monthly EMI', display: inr(a.emi), raw: a.emi },
        stats: [
          stat('Principal', inr(v.principal)),
          stat('Total interest', inr(a.interest), 'negative'),
          stat('Total payable', inr(total), 'accent'),
        ],
        split: [
          { label: 'Principal', value: v.principal, className: 'bg-neon-400' },
          { label: 'Interest', value: a.interest, className: 'bg-rose-400' },
        ],
        chart: { baseLabel: 'Principal repaid', valueLabel: 'Outstanding balance', points: a.points },
      };
    },
  },
  {
    id: 'home-loan',
    name: 'Home Loan Calculator',
    category: 'Borrow',
    description: 'EMI plus how much a monthly prepayment saves.',
    fields: [
      slider('principal', 'Loan amount', 100000, 100000000, 50000, 5000000, 'currency'),
      slider('rate', 'Interest rate (p.a.)', 6, 14, 0.05, 8.5, 'percent'),
      slider('years', 'Loan tenure', 5, 30, 1, 20, 'years'),
      slider('extra', 'Extra monthly prepayment', 0, 200000, 1000, 0, 'currency'),
    ],
    compute: (v) => {
      const base = amortize(v.principal, v.rate, v.years);
      const a = amortize(v.principal, v.rate, v.years, v.extra);
      const saved = base.interest - a.interest;
      return {
        headline: { label: 'Monthly EMI', display: inr(a.emi), raw: a.emi },
        stats: [
          stat('Total interest', inr(a.interest), 'negative'),
          stat('Total payable', inr(v.principal + a.interest), 'accent'),
          stat('Loan closes in', monthsToText(a.months)),
          ...(v.extra > 0
            ? [
                stat('Interest saved', inr(saved), 'positive'),
                stat('Time saved', monthsToText(Math.max(0, base.months - a.months)), 'positive'),
              ]
            : []),
        ],
        split: [
          { label: 'Principal', value: v.principal, className: 'bg-neon-400' },
          { label: 'Interest', value: a.interest, className: 'bg-rose-400' },
        ],
        chart: { baseLabel: 'Principal repaid', valueLabel: 'Outstanding balance', points: a.points },
        note: 'Home loan interest and principal can qualify for deductions under the old tax regime.',
      };
    },
  },
  {
    id: 'simple-interest',
    name: 'Simple Interest Calculator',
    category: 'Plan',
    description: 'Interest that never compounds.',
    fields: [
      slider('principal', 'Principal', 1000, 50000000, 1000, 100000, 'currency'),
      slider('rate', 'Interest rate (p.a.)', 1, 30, 0.1, 8, 'percent'),
      slider('years', 'Time period', 1, 30, 1, 5, 'years'),
    ],
    compute: (v) => {
      const interest = (v.principal * v.rate * v.years) / 100;
      const points: SeriesPoint[] = [];
      for (let y = 1; y <= v.years; y += 1) {
        points.push({
          x: `Y${y}`,
          base: Math.round(v.principal),
          value: Math.round(v.principal + (v.principal * v.rate * y) / 100),
        });
      }
      return {
        headline: { label: 'Total amount', display: inr(v.principal + interest), raw: v.principal + interest },
        stats: [
          stat('Principal', inr(v.principal)),
          stat('Interest', inr(interest), 'positive'),
          stat('Interest per year', inr(interest / v.years), 'accent'),
        ],
        split: [
          { label: 'Principal', value: v.principal, className: 'bg-slate-400' },
          { label: 'Interest', value: interest, className: 'bg-neon-400' },
        ],
        chart: { baseLabel: 'Principal', valueLabel: 'Total', points },
      };
    },
  },
  {
    id: 'compound-interest',
    name: 'Compound Interest Calculator',
    category: 'Plan',
    description: 'Interest on interest, at the frequency you pick.',
    fields: [
      slider('principal', 'Principal', 1000, 50000000, 1000, 100000, 'currency'),
      slider('rate', 'Interest rate (p.a.)', 1, 30, 0.1, 8, 'percent'),
      slider('years', 'Time period', 1, 40, 1, 10, 'years'),
      select('freq', 'Compounding', COMPOUNDING, 1),
    ],
    compute: (v) => {
      const points = compoundPoints(v.principal, v.rate, v.years, v.freq);
      const value = points[points.length - 1]?.value ?? v.principal;
      const simple = v.principal + (v.principal * v.rate * v.years) / 100;
      return {
        headline: { label: 'Total amount', display: inr(value), raw: value },
        stats: [
          stat('Principal', inr(v.principal)),
          stat('Compound interest', inr(value - v.principal), 'positive'),
          stat('Extra over simple interest', inr(value - simple), 'accent'),
        ],
        split: [
          { label: 'Principal', value: v.principal, className: 'bg-slate-400' },
          { label: 'Interest', value: value - v.principal, className: 'bg-neon-400' },
        ],
        chart: { baseLabel: 'Principal', valueLabel: 'Total', points },
      };
    },
  },
  {
    id: 'inflation',
    name: 'Inflation Calculator',
    category: 'Plan',
    description: 'What today’s costs look like in the future.',
    fields: [
      slider('amount', 'Cost today', 1000, 100000000, 1000, 100000, 'currency'),
      slider('rate', 'Inflation (p.a.)', 1, 15, 0.1, 6, 'percent'),
      slider('years', 'Years ahead', 1, 40, 1, 15, 'years'),
    ],
    compute: (v) => {
      const future = v.amount * Math.pow(1 + v.rate / 100, v.years);
      const power = v.amount / Math.pow(1 + v.rate / 100, v.years);
      const points: SeriesPoint[] = [];
      for (let y = 1; y <= v.years; y += 1) {
        points.push({
          x: `Y${y}`,
          base: Math.round(v.amount),
          value: Math.round(v.amount * Math.pow(1 + v.rate / 100, y)),
        });
      }
      return {
        headline: { label: `Same spending in ${v.years} years`, display: inr(future), raw: future },
        stats: [
          stat('Cost today', inr(v.amount)),
          stat('Extra needed', inr(future - v.amount), 'negative'),
          stat(`What ${inr(v.amount)} will buy`, inr(power), 'accent'),
        ],
        chart: { baseLabel: 'Cost today', valueLabel: 'Future cost', points },
      };
    },
  },
  {
    id: 'retirement',
    name: 'Retirement Planner',
    category: 'Plan',
    description: 'Corpus you need and the SIP that gets you there.',
    fields: [
      slider('age', 'Current age', 20, 60, 1, 30, 'number'),
      slider('retireAge', 'Retirement age', 40, 70, 1, 60, 'number'),
      slider('lifeExp', 'Plan until age', 75, 100, 1, 85, 'number'),
      slider('expense', 'Monthly expenses today', 10000, 500000, 1000, 50000, 'currency'),
      slider('inflation', 'Inflation (p.a.)', 3, 10, 0.5, 6, 'percent'),
      slider('preReturn', 'Return before retirement', 6, 15, 0.5, 12, 'percent'),
      slider('postReturn', 'Return after retirement', 4, 10, 0.5, 8, 'percent'),
    ],
    compute: (v) => {
      const toRetire = Math.max(1, v.retireAge - v.age);
      const inRetirement = Math.max(1, v.lifeExp - v.retireAge);
      const annualAtRetirement = v.expense * 12 * Math.pow(1 + v.inflation / 100, toRetire);
      const ratio = (1 + v.inflation / 100) / (1 + v.postReturn / 100);
      let corpus = 0;
      for (let t = 0; t < inRetirement; t += 1) corpus += annualAtRetirement * Math.pow(ratio, t);
      const sip = corpus / growth(1, v.preReturn, toRetire).balance;
      return {
        headline: { label: 'Corpus needed at retirement', display: inr(corpus), raw: corpus },
        stats: [
          stat('Monthly SIP needed', inr(sip), 'accent'),
          stat('Monthly expense at retirement', inr(annualAtRetirement / 12)),
          stat('Years to retire', `${toRetire} yrs`),
        ],
        note: 'Withdrawals are assumed at the start of each year and rise with inflation.',
      };
    },
  },
  {
    id: 'income-tax',
    name: 'Income Tax Calculator',
    category: 'Tax & pay',
    description: 'Tax under the new regime, with rebate and cess.',
    fields: [
      slider('income', 'Annual income', 300000, 50000000, 10000, 1500000, 'currency'),
      select(
        'deduction',
        'Standard deduction',
        [
          { label: 'Salaried (₹75,000)', value: 75000 },
          { label: 'Not salaried (none)', value: 0 },
        ],
        75000,
      ),
    ],
    compute: (v) => {
      const taxable = Math.max(0, v.income - v.deduction);
      const base = newRegimeTax(taxable);
      const tax = base * 1.04;
      return {
        headline: { label: 'Total tax payable', display: inr(tax), raw: tax },
        stats: [
          stat('Taxable income', inr(taxable)),
          stat('Effective tax rate', pct((tax / v.income) * 100), 'accent'),
          stat('Monthly take-home', inr((v.income - tax) / 12), 'positive'),
        ],
        split: [
          { label: 'Take-home', value: v.income - tax, className: 'bg-neon-400' },
          { label: 'Tax', value: tax, className: 'bg-rose-400' },
        ],
        note: 'New regime slabs for FY 2025-26, 4% cess, rebate up to ₹12 lakh taxable income. Surcharge is not included, so check the latest Finance Act for exact figures.',
      };
    },
  },
  {
    id: 'gst',
    name: 'GST Calculator',
    category: 'Tax & pay',
    description: 'Add GST to a price or take it out.',
    fields: [
      slider('amount', 'Amount', 100, 10000000, 100, 10000, 'currency'),
      select(
        'rate',
        'GST rate',
        [
          { label: '0.25%', value: 0.25 },
          { label: '3%', value: 3 },
          { label: '5%', value: 5 },
          { label: '12%', value: 12 },
          { label: '18%', value: 18 },
          { label: '28%', value: 28 },
        ],
        18,
      ),
      select(
        'mode',
        'Calculation',
        [
          { label: 'Add GST', value: 0 },
          { label: 'Remove GST', value: 1 },
        ],
        0,
      ),
    ],
    compute: (v) => {
      const adding = v.mode === 0;
      const net = adding ? v.amount : v.amount / (1 + v.rate / 100);
      const gst = adding ? (v.amount * v.rate) / 100 : v.amount - net;
      const total = net + gst;
      return {
        headline: { label: adding ? 'Price with GST' : 'Price before GST', display: inr(adding ? total : net), raw: adding ? total : net },
        stats: [
          stat('GST amount', inr(gst), 'accent'),
          stat('CGST', inr(gst / 2)),
          stat('SGST / UTGST', inr(gst / 2)),
        ],
        split: [
          { label: 'Net price', value: net, className: 'bg-slate-400' },
          { label: 'GST', value: gst, className: 'bg-neon-400' },
        ],
        note: 'For inter-state supplies the full amount is charged as IGST.',
      };
    },
  },
  {
    id: 'gratuity',
    name: 'Gratuity Calculator',
    category: 'Tax & pay',
    description: 'Gratuity payable on leaving a job.',
    fields: [
      slider('salary', 'Last monthly basic + DA', 10000, 500000, 1000, 60000, 'currency'),
      slider('years', 'Years of service', 5, 45, 1, 10, 'years'),
    ],
    compute: (v) => {
      const raw = (15 / 26) * v.salary * v.years;
      const capped = Math.min(raw, 2000000);
      return {
        headline: { label: 'Gratuity amount', display: inr(capped), raw: capped },
        stats: [
          stat('Formula amount', inr(raw)),
          stat('Tax-free limit', inr(2000000)),
          stat('Taxable part', inr(Math.max(0, raw - 2000000)), raw > 2000000 ? 'negative' : 'positive'),
        ],
        note: 'Formula: 15/26 × last monthly salary × years of service. Count a service year as complete when more than 6 months are worked.',
      };
    },
  },
  {
    id: 'hra',
    name: 'HRA Exemption Calculator',
    category: 'Tax & pay',
    description: 'How much of your HRA is tax-exempt.',
    fields: [
      slider('basic', 'Monthly basic + DA', 10000, 1000000, 1000, 50000, 'currency'),
      slider('hra', 'Monthly HRA received', 0, 500000, 500, 20000, 'currency'),
      slider('rent', 'Monthly rent paid', 0, 500000, 500, 18000, 'currency'),
      select(
        'metro',
        'City',
        [
          { label: 'Delhi, Mumbai, Kolkata, Chennai', value: 1 },
          { label: 'Other cities', value: 0 },
        ],
        1,
      ),
    ],
    compute: (v) => {
      const limits = [v.hra, Math.max(0, v.rent - 0.1 * v.basic), (v.metro === 1 ? 0.5 : 0.4) * v.basic];
      const exempt = Math.min(...limits);
      return {
        headline: { label: 'Exempt HRA per month', display: inr(exempt), raw: exempt },
        stats: [
          stat('Exempt per year', inr(exempt * 12), 'positive'),
          stat('Taxable HRA per year', inr(Math.max(0, v.hra - exempt) * 12), 'negative'),
          stat('Lowest limit applied', exempt === limits[0] ? 'HRA received' : exempt === limits[1] ? 'Rent − 10% of basic' : '40% / 50% of basic', 'accent'),
        ],
        note: 'Applies to the old tax regime. The exemption is the lowest of actual HRA, rent minus 10% of basic, and 50% (metro) or 40% of basic.',
      };
    },
  },
];

export const CALCULATORS_BY_ID = Object.fromEntries(
  CALCULATORS.map((c) => [c.id, c]),
) as Record<CalculatorId, CalculatorDef>;

export const CALCULATOR_CATEGORIES: CalculatorCategory[] = ['Invest', 'Save', 'Borrow', 'Plan', 'Tax & pay'];

/* -------------------------------------------------------------------------- */
/*                                  UI pieces                                 */
/* -------------------------------------------------------------------------- */

const clamp = (n: number, min: number, max: number): number => Math.min(max, Math.max(min, n));

const snapToStep = (n: number, field: SliderField): number => {
  const stepped = Math.round((n - field.min) / field.step) * field.step + field.min;
  return Number(clamp(stepped, field.min, field.max).toFixed(4));
};

const RANGE_THUMB =
  '[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-ink-950 [&::-webkit-slider-thumb]:bg-neon-400 [&::-webkit-slider-thumb]:shadow-glow ' +
  '[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-ink-950 [&::-moz-range-thumb]:bg-neon-400';

interface SliderControlProps {
  field: SliderField;
  value: number;
  onChange: (value: number) => void;
}

function SliderControl({ field, value, onChange }: SliderControlProps) {
  const inputId = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const fill = ((value - field.min) / (field.max - field.min)) * 100;

  const commit = () => {
    if (draft === null) return;
    const parsed = Number(draft.replace(/,/g, ''));
    if (draft.trim() !== '' && Number.isFinite(parsed)) onChange(snapToStep(parsed, field));
    setDraft(null);
  };

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <label htmlFor={inputId} className="text-sm text-slate-300">
          {field.label}
        </label>
        <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-ink-950/60 px-2.5 py-1 focus-within:border-neon-400/70">
          {field.format === 'currency' && <span className="text-sm text-slate-400">₹</span>}
          <input
            inputMode="decimal"
            aria-label={`${field.label} value`}
            value={draft ?? String(value)}
            onFocus={(e) => e.currentTarget.select()}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
              if (e.key === 'Escape') setDraft(null);
            }}
            className="w-24 bg-transparent text-right text-sm font-medium text-white outline-none"
          />
          {field.format === 'percent' && <span className="text-sm text-slate-400">%</span>}
          {field.format === 'years' && <span className="text-sm text-slate-400">yrs</span>}
        </div>
      </div>
      <input
        id={inputId}
        type="range"
        min={field.min}
        max={field.max}
        step={field.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, #34D399 ${fill}%, rgba(255,255,255,0.12) ${fill}%)`,
        }}
        className={`h-1.5 w-full cursor-pointer appearance-none rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-400 ${RANGE_THUMB}`}
      />
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{formatValue(field.min, field.format)}</span>
        <span>{formatValue(field.max, field.format)}</span>
      </div>
    </div>
  );
}

interface SelectControlProps {
  field: SelectField;
  value: number;
  onChange: (value: number) => void;
}

function SelectControl({ field, value, onChange }: SelectControlProps) {
  return (
    <div>
      <p className="mb-3 text-sm text-slate-300" id={`${field.id}-label`}>
        {field.label}
      </p>
      <div role="radiogroup" aria-labelledby={`${field.id}-label`} className="flex flex-wrap gap-2">
        {field.options.map((option) => {
          const active = option.value === value;
          return (
            <button
              key={option.label}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              className={`rounded-lg border px-3 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400 ${
                active
                  ? 'border-neon-400/70 bg-neon-500/20 text-neon-200 shadow-glow'
                  : 'border-white/10 bg-ink-950/50 text-slate-300 hover:border-white/25'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const TONE_CLASS: Record<NonNullable<Stat['tone']> | 'default', string> = {
  default: 'text-white',
  positive: 'text-neon-300',
  negative: 'text-rose-300',
  accent: 'text-sky-300',
};

function GrowthChart({ chart }: { chart: NonNullable<Result['chart']> }) {
  const uid = useId().replace(/:/g, '');
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chart.points} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`${uid}-value`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34D399" stopOpacity={0.55} />
              <stop offset="100%" stopColor="#34D399" stopOpacity={0} />
            </linearGradient>
            <linearGradient id={`${uid}-base`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#94A3B8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="x" tick={{ fill: '#94A3B8', fontSize: 11 }} tickLine={false} axisLine={false} minTickGap={16} />
          <YAxis
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={48}
            tickFormatter={(n: number) => axisInr(n)}
          />
          <Tooltip
            formatter={(value) => inr(Number(value))}
            contentStyle={{
              background: 'rgba(11,15,25,0.92)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12,
              color: '#fff',
            }}
            labelStyle={{ color: '#94A3B8' }}
          />
          <Area
            type="monotone"
            dataKey="base"
            name={chart.baseLabel}
            stroke="#94A3B8"
            strokeWidth={1.5}
            fill={`url(#${uid}-base)`}
          />
          <Area
            type="monotone"
            dataKey="value"
            name={chart.valueLabel}
            stroke="#34D399"
            strokeWidth={2.5}
            fill={`url(#${uid}-value)`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function SplitBar({ parts }: { parts: SplitPart[] }) {
  const total = parts.reduce((sum, p) => sum + Math.max(0, p.value), 0);
  if (total <= 0) return null;
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-white/10">
        {parts.map((p) => (
          <div
            key={p.label}
            className={`${p.className} transition-[width] duration-300`}
            style={{ width: `${(Math.max(0, p.value) / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-400">
        {parts.map((p) => (
          <span key={p.label} className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${p.className}`} />
            {p.label} · {pct((Math.max(0, p.value) / total) * 100, 1)}
          </span>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Main component                              */
/* -------------------------------------------------------------------------- */

function CalculatorBody({ def }: { def: CalculatorDef }) {
  const initialValues = useMemo<Values>(
    () => Object.fromEntries(def.fields.map((f) => [f.id, f.initial])),
    [def],
  );
  const [values, setValues] = useState<Values>(initialValues);
  const result = useMemo(() => def.compute(values), [def, values]);

  const setField = (id: string, value: number) => setValues((prev) => ({ ...prev, [id]: value }));

  return (
    <section aria-labelledby="calculator-title" className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm text-neon-300">{def.category}</p>
          <h2 id="calculator-title" className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {def.name}
          </h2>
          <p className="mt-1 max-w-xl text-sm text-slate-400">{def.description}</p>
        </div>
        <button
          type="button"
          onClick={() => setValues(initialValues)}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-white/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-400"
        >
          Reset inputs
        </button>
      </header>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="glass-card space-y-7 p-6 lg:col-span-2">
          {def.fields.map((field) =>
            field.kind === 'slider' ? (
              <SliderControl
                key={field.id}
                field={field}
                value={values[field.id]}
                onChange={(v) => setField(field.id, v)}
              />
            ) : (
              <SelectControl
                key={field.id}
                field={field}
                value={values[field.id]}
                onChange={(v) => setField(field.id, v)}
              />
            ),
          )}
        </div>

        <div className="space-y-6 lg:col-span-3">
          <div className="glass-card relative overflow-hidden p-6 shadow-glow-lg" aria-live="polite">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-neon-500/25 blur-3xl" />
            <p className="text-sm text-slate-300">{result.headline.label}</p>
            <p className="mt-2 break-words text-4xl font-semibold tracking-tight text-neon-gradient sm:text-5xl">
              {result.headline.display}
            </p>
            {result.headline.raw !== undefined && Math.abs(result.headline.raw) >= 1e5 && (
              <p className="mt-1 text-sm text-slate-400">about {compactInr(result.headline.raw)}</p>
            )}

            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              {result.stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/5 bg-ink-950/40 p-3">
                  <dt className="text-xs text-slate-400">{s.label}</dt>
                  <dd className={`mt-1 break-words text-base font-semibold ${TONE_CLASS[s.tone ?? 'default']}`}>
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>

            {result.split && (
              <div className="mt-6">
                <SplitBar parts={result.split} />
              </div>
            )}
          </div>

          {result.chart && result.chart.points.length > 0 && (
            <div className="glass-card p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-medium text-white">Year-by-year growth</h3>
                <div className="flex gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400" />
                    {result.chart.baseLabel}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-neon-400" />
                    {result.chart.valueLabel}
                  </span>
                </div>
              </div>
              <GrowthChart chart={result.chart} />
            </div>
          )}

          <p className="px-1 text-xs leading-relaxed text-slate-500">
            {result.note ? `${result.note} ` : ''}
            Results are estimates for planning, not financial advice.
          </p>
        </div>
      </div>
    </section>
  );
}

interface CalculatorWrapperProps {
  activeId: CalculatorId;
}

export default function CalculatorWrapper({ activeId }: CalculatorWrapperProps) {
  const def = CALCULATORS_BY_ID[activeId];
  // Keyed so each calculator starts from its own defaults when switched.
  return <CalculatorBody key={def.id} def={def} />;
}
