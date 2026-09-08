import { GSTCalculator } from "@/components/GSTCalculator";

export const metadata = {
  title: "GST Calculator India – Calculate GST, CGST, SGST & IGST",
  description: "GST calculator for India. Add or remove GST, calculate CGST, SGST, and IGST. Support for all GST rates and both inter-state and intra-state transactions.",
};

export default function Page() {
  return (
    <main className="container py-14">
      <div className="max-w-3xl">
        <div className="text-blue-700 font-bold text-sm">FINANCE TOOLKIT</div>
        <h1 className="text-4xl md:text-5xl font-black mt-2">GST Calculator</h1>
        <p className="text-lg muted mt-4 leading-8">
          Calculate GST, CGST, SGST, and IGST for any amount. Add or remove GST to find base and total amounts for your transactions.
        </p>
      </div>
      <GSTCalculator />
      <div className="max-w-3xl mt-12 space-y-6">
        <div>
          <h2 className="text-2xl font-bold">About GST in India</h2>
          <p className="text-slate-600 mt-3 leading-7">
            Goods and Services Tax (GST) is a unified indirect tax applied across India. This calculator helps you understand GST calculations for both intra-state transactions (CGST + SGST) and inter-state transactions (IGST).
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold">GST Rates</h3>
          <p className="text-slate-600 mt-2 leading-7">
            Common GST rates in India are 5%, 12%, 18%, and 28%, but the applicable rate depends on the classification of goods/services. Always verify the correct rate for your specific transaction.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold">CGST vs SGST vs IGST</h3>
          <ul className="text-slate-600 mt-2 leading-7 space-y-2 ml-4">
            <li><strong>CGST:</strong> Central GST (collected by Central Government)</li>
            <li><strong>SGST:</strong> State GST (collected by State Government)</li>
            <li><strong>IGST:</strong> Integrated GST (for inter-state transactions)</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-700">
          <p className="text-sm text-slate-700">
            <strong>Disclaimer:</strong> GST applicability and rates should be verified against current official rules. This calculator is for educational purposes only.
          </p>
        </div>
      </div>
    </main>
  );
}
