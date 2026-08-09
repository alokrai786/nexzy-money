import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
      <div className="container py-12 grid md:grid-cols-4 gap-8">
        <div><div className="text-white text-xl font-extrabold">Nexzy<span className="text-blue-400">Money</span></div><p className="text-sm mt-3 leading-6">Indian personal finance tools designed to help you understand your money.</p></div>
        <div><h3 className="text-white font-bold mb-3">Tools</h3><div className="space-y-2 text-sm"><Link href="/salary-calculator">Salary</Link><br/><Link href="/income-tax-calculator">Tax</Link><br/><Link href="/home-loan-emi-calculator">Loans</Link><br/><Link href="/sip-calculator">Investments</Link></div></div>
        <div><h3 className="text-white font-bold mb-3">Company</h3><div className="space-y-2 text-sm"><Link href="/about">About</Link><br/><Link href="/contact">Contact</Link><br/><Link href="/blog">Blog</Link></div></div>
        <div><h3 className="text-white font-bold mb-3">Legal</h3><div className="space-y-2 text-sm"><Link href="/privacy">Privacy</Link><br/><Link href="/terms">Terms</Link><br/><Link href="/disclaimer">Disclaimer</Link></div></div>
      </div>
      <div className="container border-t border-slate-800 py-5 text-xs">© {new Date().getFullYear()} Nexzy Money. Educational estimates only.</div>
    </footer>
  );
}
