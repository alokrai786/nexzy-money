import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl tracking-tight">
          Nexzy<span className="text-blue-700">Money</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <Link href="/#tools">Calculators</Link>
          <Link href="/job-offer-comparison">Job Offer</Link>
          <Link href="/financial-health">Financial Health</Link>
          <Link href="/blog">Guides</Link>
        </nav>
        <Link href="/#tools" className="btn btn-primary text-sm">Explore Tools</Link>
      </div>
    </header>
  );
}
