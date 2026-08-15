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

// Salary Hike Calculator
export function calculateSalaryHike(currentCtc: number, hikePercentage: number) {
  const hikeAmount = currentCtc * (hikePercentage / 100);
  const newCtc = currentCtc + hikeAmount;
  const currentMonthly = currentCtc / 12;
  const newMonthly = newCtc / 12;
  const monthlyIncrease = newMonthly - currentMonthly;
  
  return {
    currentCtc,
    hikeAmount,
    newCtc,
    hikePercentage,
    currentMonthly,
    newMonthly,
    monthlyIncrease,
  };
}

// Loan Prepayment Calculator
export function calculateLoanPrepayment(
  outstandingLoan: number,
  interestRate: number,
  remainingMonths: number,
  prepaymentAmount: number,
  reduceEmi: boolean = false
) {
  const currentEmi = emi(outstandingLoan, interestRate, remainingMonths / 12);
  
  // Calculate current interest payable
  const totalPayableNow = currentEmi * remainingMonths;
  const interestPayableNow = totalPayableNow - outstandingLoan;
  
  const newPrincipal = outstandingLoan - prepaymentAmount;
  
  let newEmi = currentEmi;
  let newTenureMonths = remainingMonths;
  
  if (newPrincipal > 0) {
    if (reduceEmi) {
      // Keep EMI same, reduce tenure
      const r = interestRate / 1200;
      if (r > 0) {
        // n = -log(1 - (P * r) / EMI) / log(1 + r)
        newTenureMonths = Math.max(0, Math.round(-Math.log(1 - (newPrincipal * r) / currentEmi) / Math.log(1 + r)));
      } else {
        newTenureMonths = Math.max(0, Math.round(newPrincipal / currentEmi));
      }
      const newTotalPayable = currentEmi * newTenureMonths;
      const newInterestPayable = Math.max(0, newTotalPayable - newPrincipal);
      
      return {
        currentEmi,
        newEmi: currentEmi,
        outstandingLoan,
        prepaymentAmount,
        newPrincipal,
        remainingMonths,
        newTenureMonths,
        interestPayableNow,
        interestPayableAfter: newInterestPayable,
        interestSaved: Math.max(0, interestPayableNow - newInterestPayable),
        monthsSaved: Math.max(0, remainingMonths - newTenureMonths),
      };
    } else {
      // Reduce EMI, keep tenure same
      newEmi = emi(newPrincipal, interestRate, remainingMonths / 12);
      const newTotalPayable = newEmi * remainingMonths;
      const newInterestPayable = Math.max(0, newTotalPayable - newPrincipal);
      
      return {
        currentEmi,
        newEmi,
        outstandingLoan,
        prepaymentAmount,
        newPrincipal,
        remainingMonths,
        newTenureMonths: remainingMonths,
        interestPayableNow,
        interestPayableAfter: newInterestPayable,
        interestSaved: Math.max(0, interestPayableNow - newInterestPayable),
        monthsSaved: 0,
      };
    }
  }
  
  return {
    currentEmi,
    newEmi: 0,
    outstandingLoan,
    prepaymentAmount,
    newPrincipal: 0,
    remainingMonths,
    newTenureMonths: 0,
    interestPayableNow,
    interestPayableAfter: 0,
    interestSaved: interestPayableNow,
    monthsSaved: remainingMonths,
  };
}

// Step-Up SIP Year-wise breakdown
export function stepUpSIPYearwise(start: number, annualStep: number, annualRate: number, years: number) {
  const yearData: Array<{
    year: number;
    monthlySip: number;
    yearlyInvested: number;
    yearlyCorpus: number;
    yearlyReturns: number;
  }> = [];
  
  let corpus = 0;
  let totalInvested = 0;
  const r = Math.max(0, annualRate) / 1200;
  
  for (let y = 1; y <= years; y++) {
    const monthly = start * Math.pow(1 + annualStep / 100, y - 1);
    let yearStart = corpus;
    
    for (let m = 0; m < 12; m++) {
      corpus = corpus * (1 + r) + monthly;
      totalInvested += monthly;
    }
    
    const yearlyInvested = monthly * 12;
    const yearlyReturns = corpus - yearStart - yearlyInvested;
    
    yearData.push({
      year: y,
      monthlySip: monthly,
      yearlyInvested,
      yearlyCorpus: corpus,
      yearlyReturns,
    });
  }
  
  return yearData;
}

// ₹1 Crore Calculator - find required SIP
export function calculateRequiredSip(targetAmount: number, annualRate: number, years: number) {
  const n = Math.max(1, Math.round(years * 12));
  const r = Math.max(0, annualRate) / 1200;
  
  let required = 0;
  if (r > 0) {
    const factor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    required = targetAmount / factor;
  } else {
    required = targetAmount / n;
  }
  
  return Math.max(0, required);
}

// Retirement Calculator
export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  monthlyExpense: number,
  inflationRate: number,
  preReturnRate: number,
  postReturnRate: number,
  lifeExpectancy: number
) {
  const yearsToRetirement = Math.max(0, retirementAge - currentAge);
  const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge);
  
  // Inflate current expense to retirement year
  const monthlyExpenseAtRetirement = monthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetirement);
  const annualExpenseAtRetirement = monthlyExpenseAtRetirement * 12;
  
  // Calculate PV of all retirement expenses using post-retirement return rate
  const postR = Math.max(0, postReturnRate) / 1200;
  const postN = Math.max(1, yearsInRetirement * 12);
  
  let requiredCorpus = 0;
  if (postR > 0) {
    // PV of annuity formula
    requiredCorpus = monthlyExpenseAtRetirement * ((1 - Math.pow(1 + postR, -postN)) / postR);
  } else {
    requiredCorpus = monthlyExpenseAtRetirement * postN;
  }
  
  // Calculate required monthly savings
  const preR = Math.max(0, preReturnRate) / 1200;
  const preN = Math.max(1, yearsToRetirement * 12);
  
  let requiredMonthlySavings = 0;
  if (preR > 0) {
    const sipFactor = ((Math.pow(1 + preR, preN) - 1) / preR) * (1 + preR);
    requiredMonthlySavings = requiredCorpus / sipFactor;
  } else if (preN > 0) {
    requiredMonthlySavings = requiredCorpus / preN;
  }
  
  return {
    currentAge,
    retirementAge,
    yearsToRetirement,
    yearsInRetirement,
    monthlyExpense,
    monthlyExpenseAtRetirement,
    annualExpenseAtRetirement,
    inflationRate,
    preReturnRate,
    postReturnRate,
    requiredCorpus: Math.max(0, requiredCorpus),
    requiredMonthlySavings: Math.max(0, requiredMonthlySavings),
  };
}

// Job Offer Comparison
export function compareJobOffers(offerA: JobOffer, offerB: JobOffer) {
  const calculateMetrics = (offer: JobOffer) => {
    const totalAnnual = offer.ctc + offer.joiningBonus + offer.annualBonus;
    const fixedMonthly = (offer.fixedPay + offer.employerPf) / 12;
    const variableAnnual = offer.variablePay + offer.annualBonus;
    const firstYearTotal = totalAnnual + offer.joiningBonus;
    const annualLivingCost = offer.estimatedMonthlyExpenses * 12;
    const disposableAnnual = offer.ctc - annualLivingCost;
    
    return {
      totalAnnual,
      fixedMonthly,
      variableAnnual,
      firstYearTotal,
      annualLivingCost,
      disposableAnnual,
      disposableMonthly: disposableAnnual / 12,
    };
  };
  
  const metricsA = calculateMetrics(offerA);
  const metricsB = calculateMetrics(offerB);
  
  // Simple scoring system (0-100)
  const calculateScore = (offer: JobOffer, metrics: ReturnType<typeof calculateMetrics>) => {
    let score = 50; // Base score
    
    // CTC component (max +20)
    score += Math.min(20, (offer.ctc / 2000000) * 20);
    
    // Fixed pay component (max +15)
    score += Math.min(15, (offer.fixedPay / 1500000) * 15);
    
    // Disposable income (max +15)
    score += Math.min(15, (Math.max(0, metrics.disposableAnnual) / 1000000) * 15);
    
    return Math.min(100, Math.max(0, score));
  };
  
  const scoreA = calculateScore(offerA, metricsA);
  const scoreB = calculateScore(offerB, metricsB);
  
  return {
    offerA: { ...metricsA, score: scoreA },
    offerB: { ...metricsB, score: scoreB },
    betterOffer: scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : 'TIE',
    difference: Math.abs(scoreA - scoreB),
  };
}

export interface JobOffer {
  companyName: string;
  ctc: number;
  fixedPay: number;
  variablePay: number;
  joiningBonus: number;
  annualBonus: number;
  employerPf: number;
  otherBenefits: number;
  location: string;
  estimatedMonthlyExpenses: number;
  workMode: string;
}

// Financial Health Score
export function calculateFinancialHealth(
  monthlyIncome: number,
  monthlyEssentialExpenses: number,
  monthlyEmiDebt: number,
  monthlyInvestments: number,
  emergencyFund: number,
  outstandingDebt: number,
  age: number,
  dependents: number
) {
  const monthlySurplus = monthlyIncome - monthlyEssentialExpenses - monthlyEmiDebt;
  const savingsRatio = monthlyIncome > 0 ? (monthlySurplus / monthlyIncome) * 100 : 0;
  const debtToIncomeRatio = monthlyIncome > 0 ? (monthlyEmiDebt / monthlyIncome) * 100 : 0;
  const emergencyFundMonths = monthlyEssentialExpenses > 0 ? emergencyFund / monthlyEssentialExpenses : 0;
  const investmentRatio = monthlyIncome > 0 ? (monthlyInvestments / monthlyIncome) * 100 : 0;
  
  // Score breakdown
  let score = 0;
  const breakdown: { [key: string]: number } = {};
  
  // Savings ratio (max 25 points) - ideal is 20-50%
  if (savingsRatio >= 20 && savingsRatio <= 50) {
    breakdown['Savings Ratio'] = 25;
  } else if (savingsRatio > 50) {
    breakdown['Savings Ratio'] = 20;
  } else if (savingsRatio >= 10) {
    breakdown['Savings Ratio'] = 15;
  } else if (savingsRatio > 0) {
    breakdown['Savings Ratio'] = 10;
  } else {
    breakdown['Savings Ratio'] = 0;
  }
  
  // Debt-to-income ratio (max 25 points) - ideal is < 20%
  if (debtToIncomeRatio <= 10) {
    breakdown['Debt Management'] = 25;
  } else if (debtToIncomeRatio <= 20) {
    breakdown['Debt Management'] = 20;
  } else if (debtToIncomeRatio <= 30) {
    breakdown['Debt Management'] = 10;
  } else {
    breakdown['Debt Management'] = 0;
  }
  
  // Emergency fund coverage (max 20 points) - ideal is 6 months
  if (emergencyFundMonths >= 6) {
    breakdown['Emergency Fund'] = 20;
  } else if (emergencyFundMonths >= 3) {
    breakdown['Emergency Fund'] = 15;
  } else if (emergencyFundMonths >= 1) {
    breakdown['Emergency Fund'] = 10;
  } else {
    breakdown['Emergency Fund'] = 5;
  }
  
  // Investment ratio (max 20 points) - ideal is 10-30%
  if (investmentRatio >= 10 && investmentRatio <= 30) {
    breakdown['Investment Activity'] = 20;
  } else if (investmentRatio > 30) {
    breakdown['Investment Activity'] = 15;
  } else if (investmentRatio >= 5) {
    breakdown['Investment Activity'] = 10;
  } else {
    breakdown['Investment Activity'] = 0;
  }
  
  // Age-based adjustment (max 10 points)
  if (age >= 25 && age <= 35) {
    breakdown['Age & Stage'] = 10;
  } else if (age >= 35 && age <= 55) {
    breakdown['Age & Stage'] = 8;
  } else if (age > 55) {
    breakdown['Age & Stage'] = 6;
  } else {
    breakdown['Age & Stage'] = 4;
  }
  
  score = Object.values(breakdown).reduce((a, b) => a + b, 0);
  
  // Identify strong areas
  const strengths: string[] = [];
  if (savingsRatio > 20) strengths.push('Good savings rate');
  if (debtToIncomeRatio < 20) strengths.push('Healthy debt levels');
  if (emergencyFundMonths >= 3) strengths.push('Adequate emergency fund');
  if (investmentRatio >= 10) strengths.push('Regular investing');
  
  // Identify improvement areas
  const improvements: string[] = [];
  if (savingsRatio < 10) improvements.push('Increase monthly savings');
  if (debtToIncomeRatio > 30) improvements.push('Focus on debt reduction');
  if (emergencyFundMonths < 3) improvements.push('Build emergency fund to 3-6 months');
  if (investmentRatio < 5) improvements.push('Start regular investments');
  
  const nextActions = [];
  if (emergencyFundMonths < 3) {
    nextActions.push('Build emergency fund to 3-6 months of essential expenses');
  }
  if (debtToIncomeRatio > 20) {
    nextActions.push('Create a debt reduction plan; target debt-to-income ratio below 20%');
  }
  if (investmentRatio < 10) {
    nextActions.push(`Allocate ₹${Math.round((monthlyIncome * 0.1 - monthlyInvestments))} more monthly to investments`);
  }
  
  return {
    score: Math.round(score),
    savingsRatio: Math.round(savingsRatio * 10) / 10,
    debtToIncomeRatio: Math.round(debtToIncomeRatio * 10) / 10,
    emergencyFundMonths: Math.round(emergencyFundMonths * 10) / 10,
    investmentRatio: Math.round(investmentRatio * 10) / 10,
    breakdown,
    strengths: strengths.length > 0 ? strengths : ['Stable financial foundation'],
    improvements: improvements.length > 0 ? improvements : ['You\'re in good shape'],
    nextActions: nextActions.length > 0 ? nextActions : ['Continue current financial practices'],
  };
}
