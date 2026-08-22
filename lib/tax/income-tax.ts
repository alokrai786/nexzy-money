import {
  TAX_RULES,
  TaxRegime,
  getTaxSlabs,
} from "./tax-rules";

export interface TaxInput {
  age: number;

  salaryIncome: number;

  otherIncome?: number;

  /**
   * Eligible HRA exemption already calculated
   * under the applicable rules.
   * Old regime only.
   */
  hraExemption?: number;

  /**
   * Other eligible salary exemptions.
   * Old regime only.
   */
  otherExemptions?: number;

  /**
   * Section 80C eligible amount.
   * Old regime only.
   */
  section80C?: number;

  /**
   * Section 80D eligible amount.
   * Old regime only.
   */
  section80D?: number;

  /**
   * Additional NPS contribution under 80CCD(1B).
   * Old regime only.
   */
  section80CCD1B?: number;

  /**
   * Employer NPS contribution under 80CCD(2).
   * Allowed in applicable regimes subject to rules.
   */
  employerNPS?: number;

  /**
   * Home-loan interest deduction.
   * For this MVP we treat this as an eligible
   * self-occupied property deduction under old regime.
   */
  homeLoanInterest?: number;

  /**
   * Section 80E eligible education-loan interest.
   * Old regime only.
   */
  section80E?: number;

  /**
   * Eligible deduction amount under 80G,
   * after applying the appropriate percentage
   * and qualifying conditions.
   */
  section80G?: number;

  /**
   * Section 80EE deduction.
   */
  section80EE?: number;

  /**
   * Section 80EEA deduction.
   */
  section80EEA?: number;

  /**
   * Section 80EEB deduction.
   */
  section80EEB?: number;

  /**
   * Whether the taxpayer is a resident individual.
   * Required for 87A rebate.
   */
  residentIndividual?: boolean;
}

export interface TaxResult {
  regime: TaxRegime;

  grossIncome: number;

  standardDeduction: number;

  totalDeductions: number;

  taxableIncome: number;

  taxBeforeRebate: number;

  rebate87A: number;

  taxAfterRebate: number;

  surcharge: number;

  cess: number;

  totalTax: number;

  effectiveTaxRate: number;

  monthlyTaxEquivalent: number;
}

/**
 * Safe number helper.
 */
function n(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, value);
}

/**
 * Calculates tax from normal slab rates.
 */
export function calculateSlabTax(
  taxableIncome: number,
  regime: TaxRegime,
  age: number
): number {
  let remaining = Math.max(0, taxableIncome);
  let previousLimit = 0;
  let tax = 0;

  const slabs = getTaxSlabs(regime, age);

  for (const slab of slabs) {
    if (remaining <= 0) break;

    const slabWidth =
      slab.upto === Infinity
        ? remaining
        : Math.max(0, slab.upto - previousLimit);

    const taxableInSlab = Math.min(remaining, slabWidth);

    tax += taxableInSlab * slab.rate;

    remaining -= taxableInSlab;

    if (slab.upto !== Infinity) {
      previousLimit = slab.upto;
    }
  }

  return Math.max(0, tax);
}

/**
 * Calculate surcharge before cess.
 *
 * This MVP handles standard surcharge thresholds.
 * Very high-income marginal-relief cases should be
 * treated as an advanced calculation module.
 */
export function calculateSurcharge(
  taxableIncome: number,
  taxBeforeSurcharge: number,
  regime: TaxRegime
): number {
  if (taxableIncome <= 5000000) {
    return 0;
  }

  let rate = 0;

  if (taxableIncome > 5000000) rate = 0.10;
  if (taxableIncome > 10000000) rate = 0.15;

  /**
   * For the new regime, the enhanced surcharge is capped
   * at 25% under the current rules.
   *
   * For the old regime, income above ₹5 crore can attract
   * 37% surcharge. The exact marginal-relief computation
   * will be added in the advanced tax engine.
   */
  if (taxableIncome > 20000000) rate = 0.25;

  if (
    regime === "old" &&
    taxableIncome > 50000000
  ) {
    rate = 0.37;
  }

  return taxBeforeSurcharge * rate;
}

/**
 * Calculates the 87A rebate.
 */
export function calculateRebate87A(
  taxableIncome: number,
  taxBeforeRebate: number,
  regime: TaxRegime,
  residentIndividual: boolean
): number {
  if (!residentIndividual) return 0;

  const rule = TAX_RULES[regime].rebate87A;

  if (taxableIncome <= rule.incomeLimit) {
    return Math.min(
      Math.max(0, taxBeforeRebate),
      rule.maximum
    );
  }

  return 0;
}

/**
 * Calculates eligible deductions for the selected regime.
 */
export function calculateDeductions(
  input: TaxInput,
  regime: TaxRegime
): number {
  const salary = n(input.salaryIncome);

  if (regime === "new") {
    /**
     * New regime:
     * Standard deduction is handled separately.
     *
     * Employer NPS contribution under 80CCD(2)
     * is allowed subject to the applicable salary
     * percentage limit.
     */
    const employerNPSLimit =
      salary * TAX_RULES.new.deductions.employerNPSPercentage;

    const employerNPS = Math.min(
      n(input.employerNPS),
      employerNPSLimit
    );

    return employerNPS;
  }

  /**
   * Old regime deductions.
   */
  const section80C = Math.min(
    n(input.section80C),
    TAX_RULES.old.deductions.section80C
  );

  const section80CCD1B = Math.min(
    n(input.section80CCD1B),
    TAX_RULES.old.deductions.section80CCD1B
  );

  const section80D = n(input.section80D);

  const homeLoanInterest = Math.min(
    n(input.homeLoanInterest),
    TAX_RULES.old.deductions.section24bSelfOccupied
  );

  const section80EE = Math.min(
    n(input.section80EE),
    TAX_RULES.old.deductions.section80EE
  );

  const section80EEA = Math.min(
    n(input.section80EEA),
    TAX_RULES.old.deductions.section80EEA
  );

  const section80EEB = Math.min(
    n(input.section80EEB),
    TAX_RULES.old.deductions.section80EEB
  );

  return (
    n(input.hraExemption) +
    n(input.otherExemptions) +
    section80C +
    section80CCD1B +
    section80D +
    homeLoanInterest +
    n(input.section80E) +
    n(input.section80G) +
    section80EE +
    section80EEA +
    section80EEB
  );
}

/**
 * Main tax calculation.
 */
export function calculateIncomeTax(
  input: TaxInput,
  regime: TaxRegime
): TaxResult {
  const salary = n(input.salaryIncome);
  const otherIncome = n(input.otherIncome);

  const grossIncome = salary + otherIncome;

  const standardDeduction = Math.min(
    salary,
    TAX_RULES[regime].standardDeduction
  );

  const deductions = calculateDeductions(
    input,
    regime
  );

  const taxableIncome = Math.max(
    0,
    grossIncome -
      standardDeduction -
      deductions
  );

  const taxBeforeRebate = calculateSlabTax(
    taxableIncome,
    regime,
    input.age
  );

  const rebate87A = calculateRebate87A(
    taxableIncome,
    taxBeforeRebate,
    regime,
    input.residentIndividual !== false
  );

  const taxAfterRebate = Math.max(
    0,
    taxBeforeRebate - rebate87A
  );

  const surcharge = calculateSurcharge(
    taxableIncome,
    taxAfterRebate,
    regime
  );

  const cess = (
    taxAfterRebate +
    surcharge
  ) * TAX_RULES.cessRate;

  const totalTax = Math.max(
    0,
    taxAfterRebate +
      surcharge +
      cess
  );

  const effectiveTaxRate =
    grossIncome > 0
      ? (totalTax / grossIncome) * 100
      : 0;

  return {
    regime,

    grossIncome,

    standardDeduction,

    totalDeductions:
      standardDeduction + deductions,

    taxableIncome,

    taxBeforeRebate,

    rebate87A,

    taxAfterRebate,

    surcharge,

    cess,

    totalTax,

    effectiveTaxRate,

    monthlyTaxEquivalent:
      totalTax / 12,
  };
}

/**
 * Compare old and new regimes.
 */
export function compareTaxRegimes(
  input: TaxInput
) {
  const oldResult = calculateIncomeTax(
    input,
    "old"
  );

  const newResult = calculateIncomeTax(
    input,
    "new"
  );

  const taxSaving = Math.abs(
    oldResult.totalTax -
      newResult.totalTax
  );

  let recommendedRegime: TaxRegime;

  if (
    oldResult.totalTax <
    newResult.totalTax
  ) {
    recommendedRegime = "old";
  } else {
    recommendedRegime = "new";
  }

  return {
    old: oldResult,

    new: newResult,

    recommendedRegime,

    taxSaving,

    recommendationText:
      recommendedRegime === "old"
        ? `Old Tax Regime is estimated to save ${Math.round(
            taxSaving
          )} compared with the New Tax Regime.`
        : `New Tax Regime is estimated to save ${Math.round(
            taxSaving
          )} compared with the Old Tax Regime.`,
  };
}
