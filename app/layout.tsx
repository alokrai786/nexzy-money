import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexzy.online"),
  title: { default: "Nexzy Money | Indian Personal Finance Tools", template: "%s | Nexzy Money" },
  description: "Smart Indian finance calculators for salary, tax, loans, SIP, retirement and financial goals.",
  alternates: { canonical: "https://nexzy.online" },
  openGraph: {
    title: "Nexzy Money — Make smarter money decisions",
    description: "Salary, tax, loan, investment and wealth calculators built for India.",
    url: "https://nexzy.online",
    siteName: "Nexzy Money",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
