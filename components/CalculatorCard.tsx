import Link from "next/link";
export function CalculatorCard({href, title, description, icon}: {href:string; title:string; description:string; icon:string}) {
  return <Link href={href} className="card p-5 block hover:-translate-y-1 transition">
    <div className="text-2xl mb-3">{icon}</div><h3 className="font-bold text-lg">{title}</h3><p className="text-sm text-slate-500 mt-2 leading-6">{description}</p><span className="inline-block mt-4 text-blue-700 text-sm font-bold">Open calculator →</span>
  </Link>
}
