import { RetirementCalculator } from "@/components/RetirementCalculator";

export const metadata = { title: "Retirement Calculator" };

export default function Page() {
  return (
    <main className="container py-14">
      <div className="max-w-4xl">
        <div className="mb-8">
          <div className="text-blue-700 font-bold text-sm">LIFE PLANNING</div>
          <h1 className="text-4xl md:text-5xl font-black mt-2">Retirement Calculator</h1>
          <p className="text-lg text-slate-600 mt-4">
            Estimate your retirement corpus and monthly requirement.
          </p>
        </div>
        <RetirementCalculator />
      </div>
    </main>
  );
}