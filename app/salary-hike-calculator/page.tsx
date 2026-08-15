import { SalaryHikeCalculator } from "@/components/SalaryHikeCalculator";

export const metadata = { title: "Salary Hike Calculator" };

export default function Page() {
  return (
    <main className="container py-14">
      <div className="max-w-4xl">
        <div className="mb-8">
          <div className="text-blue-700 font-bold text-sm">SALARY TOOLS</div>
          <h1 className="text-4xl md:text-5xl font-black mt-2">Salary Hike Calculator</h1>
          <p className="text-lg text-slate-600 mt-4">
            See how a salary hike changes your CTC and monthly income.
          </p>
        </div>
        <SalaryHikeCalculator />
      </div>
    </main>
  );
}