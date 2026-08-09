import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["","salary-calculator","salary-hike-calculator","income-tax-calculator","old-vs-new-tax-regime","home-loan-emi-calculator","loan-prepayment-calculator","sip-calculator","step-up-sip-calculator","1-crore-calculator","retirement-calculator","job-offer-comparison","financial-health","about","contact","privacy","terms","disclaimer","blog"];
  return paths.map(p=>({url:`https://nexzy.online/${p}`, lastModified:new Date(), changeFrequency:"monthly", priority:p===""?1:.7}));
}