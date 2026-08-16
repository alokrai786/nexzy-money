import { OneCororeCalculator } from "@/components/OneCororeCalculator";

export const metadata = { title: "₹1 Crore Goal Calculator" };

export default function Page() {
  return (
    <main className="container py-14">
      <div className="max-w-4xl">
        <div className="mb-8">
          <div className="text-blue-700 font-bold text-sm">WEALTH GOALS</div>
          <h1 className="text-4xl md:text-5xl font-black mt-2">₹1 Crore Goal Calculator</h1>
          <p className="text-lg text-slate-600 mt-4">
            Find the SIP needed to reach your target corpus.
          </p>
        </div>
        <OneCororeCalculator />
      </div>
    </main>
  );
}