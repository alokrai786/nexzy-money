import { PPFCalculator } from "@/components/PPFCalculator";

export const metadata = {
  title: "PPF Calculator India – PPF Maturity, Interest & Investment Calculator",
  description: "Calculate Public Provident Fund (PPF) maturity amount and interest earned. Year-wise PPF growth projection for India's most trusted long-term investment scheme.",
};

export default function Page() {
  return (
    <main className="container py-14">
      <div className="max-w-3xl">
        <div className="text-blue-700 font-bold text-sm">FINANCE TOOLKIT</div>
        <h1 className="text-4xl md:text-5xl font-black mt-2">PPF Calculator</h1>
        <p className="text-lg muted mt-4 leading-8">
          Estimate your Public Provident Fund maturity amount and interest earned. Plan your long-term investments with accurate PPF projections.
        </p>
      </div>
      <PPFCalculator />
      <div className="max-w-3xl mt-12 space-y-6">
        <div>
          <h2 className="text-2xl font-bold">About PPF</h2>
          <p className="text-slate-600 mt-3 leading-7">
            Public Provident Fund (PPF) is a long-term investment scheme backed by the Government of India. It offers attractive interest rates, tax benefits under Section 80C, and complete capital protection. The scheme has a maturity period of 15 years with optional extension.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Key Features</h3>
          <ul className="text-slate-600 mt-2 leading-7 space-y-2 ml-4">
            <li>✓ Government-backed scheme with guaranteed returns</li>
            <li>✓ Annual investment limit: ₹500,000</li>
            <li>✓ Minimum investment: ₹500 per financial year</li>
            <li>✓ Tax deduction under Section 80C</li>
            <li>✓ Tax-free interest and maturity amount</li>
            <li>✓ Flexible withdrawal after 7 years</li>
            <li>✓ Extendable for 5-year periods after maturity</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Interest Rates</h3>
          <p className="text-slate-600 mt-2 leading-7">
            PPF interest rates are set by the Government of India and reviewed quarterly. The current rate shown is illustrative. Please verify the latest rate from official sources before investing.
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-700">
          <p className="text-sm text-slate-700">
            <strong>Important:</strong> PPF calculations are estimates based on selected assumptions. Interest rates and government rules may change. This is not an official PPF calculation. Verify with your bank for exact maturity values and current rates.
          </p>
        </div>
      </div>
    </main>
  );
}
