import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";

const tools = [
  ["/salary-calculator","CTC → In-Hand Salary","Understand gross, tax, PF and estimated take-home pay.","💰"],
  ["/salary-hike-calculator","Salary Hike Calculator","Calculate how a salary hike changes your CTC.","📈"],
  ["/income-tax-calculator","Income Tax Calculator","Estimate tax liability with a financial-year aware structure.","🧾"],
  ["/old-vs-new-tax-regime","Old vs New Tax Regime","Compare estimated tax under both regimes.","⚖️"],
  ["/home-loan-emi-calculator","Home Loan EMI","Estimate EMI, interest and total repayment.","🏠"],
  ["/loan-prepayment-calculator","Loan Prepayment","See how prepayment can reduce loan interest.","💳"],
  ["/sip-calculator","SIP Calculator","Estimate corpus from a monthly SIP.","📊"],
  ["/step-up-sip-calculator","Step-Up SIP","Calculate the impact of increasing your SIP every year.","🚀"],
  ["/1-crore-calculator","₹1 Crore Goal","Find the SIP needed to reach your target corpus.","💎"],
  ["/retirement-calculator","Retirement Calculator","Estimate your retirement corpus and monthly requirement.","🌅"],
  ["/job-offer-comparison","Job Offer Comparison","Compare two job offers beyond headline CTC.","⭐"],
  ["/financial-health","Financial Health Score","Understand your financial health using transparent metrics.","❤️"]
] as const;

export default function Home() {
  return <main>
    <section className="bg-white">
      <div className="container py-16 md:py-24 grid lg:grid-cols-[1.2fr_.8fr] gap-12 items-center">
        <div>
          <div className="inline-flex rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-xs font-bold">Built for India 🇮🇳</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mt-5 leading-[1.02]">Understand Your <span className="gradient-text">Money</span> in Seconds.</h1>
          <p className="text-lg text-slate-600 mt-6 max-w-2xl leading-8">Calculate salary, tax, EMIs, investments and financial goals with simple tools designed around Indian money decisions.</p>
          <div className="flex flex-wrap gap-3 mt-8"><a href="#tools" className="btn btn-primary">Calculate My Money</a><Link href="/job-offer-comparison" className="btn btn-secondary">Compare Job Offers</Link></div>
          <div className="grid grid-cols-3 gap-3 mt-10 max-w-xl">
            <div className="card p-4"><b>₹</b><div className="text-xs muted mt-1">Indian format</div></div>
            <div className="card p-4"><b>12+</b><div className="text-xs muted mt-1">Full tools</div></div>
            <div className="card p-4"><b>100%</b><div className="text-xs muted mt-1">No forced signup</div></div>
          </div>
        </div>
        <div className="card p-7 bg-slate-950 text-white">
          <div className="text-sm text-slate-400">MoneyMeter Snapshot</div>
          <h2 className="text-2xl font-bold mt-2">What should you calculate?</h2>
          <div className="mt-6 space-y-3">
            {["My in-hand salary","Income tax","Home loan EMI","SIP for ₹1 crore","Retirement corpus"].map((x)=><Link key={x} href="#tools" className="block rounded-xl bg-white/10 hover:bg-white/20 transition px-3 py-2 text-sm">{x}</Link>)}
          </div>
          <p className="text-xs text-slate-400 mt-6">Estimates are educational and should be verified before financial decisions.</p>
        </div>
      </div>
    </section>
    <section id="tools" className="container py-16">
      <div className="max-w-2xl"><div className="text-blue-700 font-bold text-sm">FINANCE TOOLKIT</div><h2 className="text-3xl md:text-4xl font-black mt-2">Tools that explain the number.</h2><p className="text-lg text-slate-600 mt-3">A suite of calculators designed for Indian financial planning. All calculations are done in your browser—no data is stored.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">{tools.map(([href,title,desc,icon])=><CalculatorCard key={href} href={href} title={title} description={desc} icon={icon}/>)}</div>
    </section>
    <section className="container pb-16"><div className="card p-8 md:p-10 bg-gradient-to-br from-blue-50 to-teal-50"><div className="max-w-3xl"><div className="text-sm font-bold text-teal-700">WHY NEXZY MONEY</div><h2 className="text-3xl font-black mt-2">Simple. Transparent. Indian.</h2><p className="text-slate-700 mt-3">All calculations are done instantly in your browser. No signup required. No ads. Built by people who care about Indian financial literacy.</p></div></div></section>
  </main>
}
