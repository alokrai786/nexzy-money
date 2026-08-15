import { FinancialHealthScore } from "@/components/FinancialHealthScore";

export const metadata = { title: "Financial Health Score" };

export default function Page() {
  return (
    <main className="container py-14">
      <div className="max-w-4xl">
        <div className="mb-8">
          <div className="text-blue-700 font-bold text-sm">FINANCIAL WELLNESS</div>
          <h1 className="text-4xl md:text-5xl font-black mt-2">Financial Health Score</h1>
          <p className="text-lg text-slate-600 mt-4">
            Understand your financial health using transparent metrics.
          </p>
        </div>
        <FinancialHealthScore />
      </div>
    </main>
  );
}