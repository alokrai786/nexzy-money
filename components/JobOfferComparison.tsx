"use client";
import { useMemo, useState } from "react";
import { inr, compareJobOffers, type JobOffer } from "@/lib/finance";

export function JobOfferComparison() {
  const [offerA, setOfferA] = useState<JobOffer>({
    companyName: "Company A",
    ctc: 2000000,
    fixedPay: 1200000,
    variablePay: 400000,
    joiningBonus: 200000,
    annualBonus: 200000,
    employerPf: 270000,
    otherBenefits: 0,
    location: "Bangalore",
    estimatedMonthlyExpenses: 80000,
    workMode: "Hybrid",
  });

  const [offerB, setOfferB] = useState<JobOffer>({
    companyName: "Company B",
    ctc: 2200000,
    fixedPay: 1300000,
    variablePay: 500000,
    joiningBonus: 300000,
    annualBonus: 200000,
    employerPf: 300000,
    otherBenefits: 50000,
    location: "Mumbai",
    estimatedMonthlyExpenses: 100000,
    workMode: "Office",
  });

  const result = useMemo(() => {
    return compareJobOffers(offerA, offerB);
  }, [offerA, offerB]);

  const updateOfferA = (key: keyof JobOffer, value: string | number) => {
    setOfferA({ ...offerA, [key]: Number(value) || value });
  };

  const updateOfferB = (key: keyof JobOffer, value: string | number) => {
    setOfferB({ ...offerB, [key]: Number(value) || value });
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Offer A */}
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4">Offer A</h3>
          <div className="space-y-4">
            <div>
              <label className="label">Company Name</label>
              <input
                className="input"
                type="text"
                value={offerA.companyName}
                onChange={(e) => updateOfferA("companyName", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Annual CTC</label>
              <input
                className="input"
                type="number"
                value={offerA.ctc}
                onChange={(e) => updateOfferA("ctc", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Fixed Pay</label>
              <input
                className="input"
                type="number"
                value={offerA.fixedPay}
                onChange={(e) => updateOfferA("fixedPay", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Variable Pay</label>
              <input
                className="input"
                type="number"
                value={offerA.variablePay}
                onChange={(e) => updateOfferA("variablePay", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Joining Bonus</label>
              <input
                className="input"
                type="number"
                value={offerA.joiningBonus}
                onChange={(e) => updateOfferA("joiningBonus", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Annual Bonus</label>
              <input
                className="input"
                type="number"
                value={offerA.annualBonus}
                onChange={(e) => updateOfferA("annualBonus", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Employer PF</label>
              <input
                className="input"
                type="number"
                value={offerA.employerPf}
                onChange={(e) => updateOfferA("employerPf", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Other Benefits (Annual)</label>
              <input
                className="input"
                type="number"
                value={offerA.otherBenefits}
                onChange={(e) => updateOfferA("otherBenefits", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Location</label>
              <input
                className="input"
                type="text"
                value={offerA.location}
                onChange={(e) => updateOfferA("location", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Estimated Monthly Expenses</label>
              <input
                className="input"
                type="number"
                value={offerA.estimatedMonthlyExpenses}
                onChange={(e) => updateOfferA("estimatedMonthlyExpenses", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Work Mode</label>
              <input
                className="input"
                type="text"
                value={offerA.workMode}
                onChange={(e) => updateOfferA("workMode", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Offer B */}
        <div className="card p-6">
          <h3 className="font-bold text-lg mb-4">Offer B</h3>
          <div className="space-y-4">
            <div>
              <label className="label">Company Name</label>
              <input
                className="input"
                type="text"
                value={offerB.companyName}
                onChange={(e) => updateOfferB("companyName", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Annual CTC</label>
              <input
                className="input"
                type="number"
                value={offerB.ctc}
                onChange={(e) => updateOfferB("ctc", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Fixed Pay</label>
              <input
                className="input"
                type="number"
                value={offerB.fixedPay}
                onChange={(e) => updateOfferB("fixedPay", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Variable Pay</label>
              <input
                className="input"
                type="number"
                value={offerB.variablePay}
                onChange={(e) => updateOfferB("variablePay", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Joining Bonus</label>
              <input
                className="input"
                type="number"
                value={offerB.joiningBonus}
                onChange={(e) => updateOfferB("joiningBonus", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Annual Bonus</label>
              <input
                className="input"
                type="number"
                value={offerB.annualBonus}
                onChange={(e) => updateOfferB("annualBonus", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Employer PF</label>
              <input
                className="input"
                type="number"
                value={offerB.employerPf}
                onChange={(e) => updateOfferB("employerPf", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Other Benefits (Annual)</label>
              <input
                className="input"
                type="number"
                value={offerB.otherBenefits}
                onChange={(e) => updateOfferB("otherBenefits", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Location</label>
              <input
                className="input"
                type="text"
                value={offerB.location}
                onChange={(e) => updateOfferB("location", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Estimated Monthly Expenses</label>
              <input
                className="input"
                type="number"
                value={offerB.estimatedMonthlyExpenses}
                onChange={(e) => updateOfferB("estimatedMonthlyExpenses", e.target.value)}
              />
            </div>
            <div>
              <label className="label">Work Mode</label>
              <input
                className="input"
                type="text"
                value={offerB.workMode}
                onChange={(e) => updateOfferB("workMode", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="card p-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="font-bold text-lg mb-6">Comparison Results</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Offer A Results */}
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-sm muted">Score</div>
              <div className="text-5xl font-extrabold text-blue-600">{result.offerA.score}</div>
              <div className="text-xs text-slate-600 mt-1">/100</div>
            </div>
            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Annual Compensation:</span>
                <b>{inr(result.offerA.totalAnnual)}</b>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fixed Monthly (avg):</span>
                <b>{inr(result.offerA.fixedMonthly)}</b>
              </div>
              <div className="flex justify-between text-sm">
                <span>First Year Total:</span>
                <b>{inr(result.offerA.firstYearTotal)}</b>
              </div>
              <div className="flex justify-between text-sm">
                <span>Annual Living Cost:</span>
                <b>{inr(result.offerA.annualLivingCost)}</b>
              </div>
              <div className="flex justify-between text-sm font-semibold text-green-600">
                <span>Annual Disposable:</span>
                <b>{inr(result.offerA.disposableAnnual)}</b>
              </div>
            </div>
          </div>

          {/* Offer B Results */}
          <div className="space-y-4">
            <div className="text-center mb-4">
              <div className="text-sm muted">Score</div>
              <div className="text-5xl font-extrabold text-purple-600">{result.offerB.score}</div>
              <div className="text-xs text-slate-600 mt-1">/100</div>
            </div>
            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Annual Compensation:</span>
                <b>{inr(result.offerB.totalAnnual)}</b>
              </div>
              <div className="flex justify-between text-sm">
                <span>Fixed Monthly (avg):</span>
                <b>{inr(result.offerB.fixedMonthly)}</b>
              </div>
              <div className="flex justify-between text-sm">
                <span>First Year Total:</span>
                <b>{inr(result.offerB.firstYearTotal)}</b>
              </div>
              <div className="flex justify-between text-sm">
                <span>Annual Living Cost:</span>
                <b>{inr(result.offerB.annualLivingCost)}</b>
              </div>
              <div className="flex justify-between text-sm font-semibold text-green-600">
                <span>Annual Disposable:</span>
                <b>{inr(result.offerB.disposableAnnual)}</b>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="text-center">
            {result.betterOffer === "TIE" ? (
              <p className="text-sm font-semibold text-slate-700">
                Both offers are comparable. Consider other factors like growth, company culture, and location.
              </p>
            ) : (
              <p className="text-sm font-semibold text-slate-700">
                <span className="text-lg">
                  {result.betterOffer === "A" ? offerA.companyName : offerB.companyName}
                </span>{" "}
                may be financially better with a {result.difference.toFixed(0)}-point score difference.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="card p-6 bg-blue-50">
        <h3 className="font-bold mb-3">What This Means</h3>
        <p className="text-sm leading-6 text-slate-700">
          This comparison shows not just the headline CTC, but your actual financial position after accounting for living expenses. The score considers compensation, fixed income stability, and disposable income. Higher doesn't always mean better—consider career growth, company reputation, and work-life balance too.
        </p>
      </div>

      <div className="card p-6 bg-slate-50">
        <h3 className="font-bold mb-3">Key Assumptions</h3>
        <ul className="text-sm space-y-2 text-slate-700">
          <li>• Joining bonus is counted only in the first year</li>
          <li>• Annual bonus is included in total compensation</li>
          <li>• Employer PF is added as annual benefit (not taken home)</li>
          <li>• Living expenses are estimated and may vary by location</li>
          <li>• Tax calculations are not included in this comparison</li>
        </ul>
      </div>

      <div className="card p-6 border border-orange-200 bg-orange-50">
        <p className="text-xs text-orange-800">
          <b>Disclaimer:</b> This is an educational comparison tool and does not constitute career advice. The scoring is based on financial metrics only and ignores career growth, domain expertise, company reputation, and personal fit. Please consult mentors and industry peers before making your decision.
        </p>
      </div>
    </div>
  );
}
