import { FDCalculator } from "@/components/FDCalculator";

export const metadata = {
  title: "FD Calculator India – Fixed Deposit Maturity & Interest Calculator",
  description: "Calculate FD maturity amount, interest earned with different compounding frequencies. Indian Fixed Deposit calculator for yearly, half-yearly, quarterly and monthly compounding.",
};

export default function Page() {
  return (
    <main className="container py-14">
      <div className="max-w-3xl">
        <div className="text-blue-700 font-bold text-sm">FINANCE TOOLKIT</div>
        <h1 className="text-4xl md:text-5xl font-black mt-2">FD Calculator</h1>
        <p className="text-lg muted mt-4 leading-8">
          Calculate your Fixed Deposit maturity amount and interest earned based on principal, interest rate, tenure, and compounding frequency.
        </p>
      </div>
      <FDCalculator />
      <div className="max-w-3xl mt-12 space-y-6">
        <div>
          <h2 className="text-2xl font-bold">How it works</h2>
          <p className="text-slate-600 mt-3 leading-7">
            This calculator uses the compound interest formula to estimate FD maturity. You can choose different compounding frequencies (yearly, half-yearly, quarterly, or monthly) to see how compounding impacts your returns.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Formula</h3>
          <p className="text-slate-600 mt-2 leading-7 font-mono bg-slate-50 p-3 rounded">
            M = P × (1 + r/n)^(n×t)
          </p>
          <p className="text-sm text-slate-600 mt-2">
            Where: M = Maturity amount, P = Principal, r = Annual interest rate (decimal), n = Compounding periods per year, t = Tenure in years
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-700">
          <p className="text-sm text-slate-700">
            <strong>Disclaimer:</strong> Results are estimates. Actual FD maturity may vary based on bank terms, compounding conventions, taxation, and premature withdrawal rules.
          </p>
        </div>
      </div>
    </main>
  );
}
