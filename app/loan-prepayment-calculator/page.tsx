import { LoanPrepaymentCalculator } from "@/components/LoanPrepaymentCalculator";

export const metadata = { title: "Loan Prepayment Calculator" };

export default function Page() {
  return (
    <main className="container py-14">
      <div className="max-w-4xl">
        <div className="mb-8">
          <div className="text-blue-700 font-bold text-sm">LOAN TOOLS</div>
          <h1 className="text-4xl md:text-5xl font-black mt-2">Loan Prepayment Calculator</h1>
          <p className="text-lg text-slate-600 mt-4">
            See how prepayment can reduce your loan tenure and interest.
          </p>
        </div>
        <LoanPrepaymentCalculator />
      </div>
    </main>
  );
}