import { JobOfferComparison } from "@/components/JobOfferComparison";

export const metadata = { title: "Job Offer Comparison" };

export default function Page() {
  return (
    <main className="container py-14">
      <div className="max-w-6xl">
        <div className="mb-8">
          <div className="text-blue-700 font-bold text-sm">CAREER DECISIONS</div>
          <h1 className="text-4xl md:text-5xl font-black mt-2">Job Offer Comparison</h1>
          <p className="text-lg text-slate-600 mt-4">
            Compare two job offers beyond headline CTC.
          </p>
        </div>
        <JobOfferComparison />
      </div>
    </main>
  );
}