import { StepUpSipCalculator } from "@/components/StepUpSipCalculator";

export const metadata = { title: "Step-Up SIP Calculator" };

export default function Page() {
  return (
    <main className="container py-14">
      <div className="max-w-4xl">
        <div className="mb-8">
          <div className="text-blue-700 font-bold text-sm">INVESTMENT TOOLS</div>
          <h1 className="text-4xl md:text-5xl font-black mt-2">Step-Up SIP Calculator</h1>
          <p className="text-lg text-slate-600 mt-4">
            Calculate the impact of increasing your SIP every year.
          </p>
        </div>
        <StepUpSipCalculator />
      </div>
    </main>
  );
}