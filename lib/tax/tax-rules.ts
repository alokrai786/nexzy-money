/**
 * Nexzy Money - Income Tax Rules
 *
 * Verified against Income Tax Department / CBDT material
 * for AY 2026-27.
 *
 * IMPORTANT:
 * This file contains tax rules only.
 * Calculation logic is kept separately in income-tax.ts.
 */

export type TaxRegime = "old" | "new";

export type AgeCategory =
  | "below60"
  | "60to79"
  | "80plus";

export const TAX_YEAR = "AY 2026-27";

export const TAX_RULES = {
  old: {
    standardDeduction: 50000,

    slabs: {
      below60: [
        { upto: 250000, rate: 0 },
        { upto: 500000, rate: 0.05 },
        { upto: 1000000, rate: 0.20 },
        { upto: Infinity, rate: 0.30 },
      ],

      age60to79: [
        { upto: 300000, rate: 0 },
        { upto: 500000, rate: 0.05 },
        { upto: 1000000, rate: 0.20 },
        { upto: Infinity, rate: 0.30 },
      ],

      age80plus: [
        { upto: 500000, rate: 0 },
        { upto: 1000000, rate: 0.20 },
        { upto: Infinity, rate: 0.30 },
      ],
    },

    rebate87A: {
      incomeLimit: 500000,
      maximum: 12500,
    },

    deductions: {
      section80C: 150000,
      section80CCD1B: 50000,
      section80EE: 50000,
      section80EEA: 150000,
      section80EEB: 150000,

      section80D: {
        selfAndFamily: 25000,
        selfAndFamilySeniorCitizen: 50000,
        parents: 25000,
        parentsSeniorCitizen: 50000,
      },

      section24bSelfOccupied: 200000,
    },
  },

  new: {
    standardDeduction: 75000,

    slabs: {
      below60: [
        { upto: 400000, rate: 0 },
        { upto: 800000, rate: 0.05 },
        { upto: 1200000, rate: 0.10 },
        { upto: 1600000, rate: 0.15 },
        { upto: 2000000, rate: 0.20 },
        { upto: 2400000, rate: 0.25 },
        { upto: Infinity, rate: 0.30 },
      ],

      age60to79: [
        { upto: 400000, rate: 0 },
        { upto: 800000, rate: 0.05 },
        { upto: 1200000, rate: 0.10 },
        { upto: 1600000, rate: 0.15 },
        { upto: 2000000, rate: 0.20 },
        { upto: 2400000, rate: 0.25 },
        { upto: Infinity, rate: 0.30 },
      ],

      age80plus: [
        { upto: 400000, rate: 0 },
        { upto: 800000, rate: 0.05 },
        { upto: 1200000, rate: 0.10 },
        { upto: 1600000, rate: 0.15 },
        { upto: 2000000, rate: 0.20 },
        { upto: 2400000, rate: 0.25 },
        { upto: Infinity, rate: 0.30 },
      ],
    },

    rebate87A: {
      incomeLimit: 1200000,
      maximum: 60000,
    },

    deductions: {
      employerNPSPercentage: 0.14,
      agnipath: true,
    },
  },

  cessRate: 0.04,

  surcharge: [
    {
      above: 5000000,
      rate: 0.10,
    },
    {
      above: 10000000,
      rate: 0.15,
    },
    {
      above: 20000000,
      rate: 0.25,
    },
  ],
} as const;

/**
 * Get age category used for old-regime slab selection.
 */
export function getAgeCategory(age: number): AgeCategory {
  if (age >= 80) return "80plus";
  if (age >= 60) return "60to79";
  return "below60";
}

/**
 * Returns the slab table for a regime and age category.
 */
export function getTaxSlabs(
  regime: TaxRegime,
  age: number
) {
  const category = getAgeCategory(age);

 const slabs = TAX_RULES[regime].slabs as unknown as Record<
  AgeCategory,
  readonly {
    upto: number;
    rate: number;
  }[]
>;

return slabs[category];
