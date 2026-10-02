import { PPFCalculator } from "@/components/PPFCalculator";

export const metadata = {
  title: "PPF Calculator India – PPF Maturity, Interest & Investment Calculator",
  description: "Calculate Public Provident Fund (PPF) maturity amount and interest earned using an illustrative rate. Year-wise PPF growth projection for long-term investment planning.",
};

export default function Page() {
  return (
    <main className="container py-14">
      <div className="max-w-3xl">
        <div className="text-blue-700 font-bold text-sm">FINANCE TOOLKIT</div>
        <h1 className="text-4xl md:text-5xl font-black mt-2">PPF Calculator</h1>
        <p className="text-lg muted mt-4 leading-8">
          Estimate your Public Provident Fund maturity amount and interest earned. Plan your long-term investments with illustrative PPF projections based on your assumed rate.
        </p>
      </div>
      <PPFCalculator />
      <div className="max-w-3xl mt-12 space-y-6">
        <div>
          <h2 className="text-2xl font-bold">About PPF</h2>
          <p className="text-slate-600 mt-3 leading-7">
            Public Provident Fund (PPF) is a long-term savings and investment scheme designed for individual investors in India. This calculator provides estimates based on your chosen contribution frequency and an assumed interest rate.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Key Features (for reference)</h3>
          <ul className="text-slate-600 mt-2 leading-7 space-y-2 ml-4">
            <li>✓ Long-term savings option for Indian investors</li>
            <li>✓ Maximum contribution: ₹1,50,000 per financial year</li>
            <li>✓ Minimum contribution: typically ₹500 per financial year</li>
            <li>✓ Maturity period: 15 years with optional 5-year extensions</li>
            <li>✓ Interest is credited annually on the lowest balance rule</li>
            <li>✓ Flexible withdrawal and loan options available</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">About the Interest Rate Shown</h3>
          <p className="text-slate-600 mt-2 leading-7">
            The 7.1% rate shown in the calculator is an <strong>assumed/illustrative rate for projection purposes only</strong>. 
            PPF interest rates are set by the Government of India and reviewed quarterly. Actual rates may differ. 
            Update the rate field in the calculator to reflect your assumption or the latest official rate before interpreting results.
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-700">
          <p className="text-sm text-slate-700">
            <strong>Important Disclaimer:</strong> This is an educational PPF calculator based on your assumed contribution frequency and assumed interest rate. 
            Actual PPF maturity depends on:
          </p>
          <ul className="text-sm text-slate-700 mt-2 ml-4 space-y-1">
            <li>• Interest rates set and updated quarterly by the Government of India</li>
            <li>• PPF's actual interest compounding rules (annually, on lowest balance)</li>
            <li>• Any partial withdrawals or loans taken against the PPF account</li>
            <li>• Maturity and extension terms, which may change</li>
            <li>• Individual eligibility and contribution limits</li>
          </ul>
          <p className="text-sm text-slate-700 mt-2">
            Always verify with official PPF documentation or your bank before making investment decisions.
          </p>
        </div>
      </div>
    </main>
  );
}
