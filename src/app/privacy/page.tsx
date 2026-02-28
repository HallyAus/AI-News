import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "AIMarketWire privacy policy. How we handle your data, cookies, and analytics.",
  alternates: {
    canonical: "https://aimarketwire.ai/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-3.5">
          <Link href="/" className="font-mono text-lg font-bold tracking-tight">
            <span className="text-emerald-400">AI</span>
            <span className="text-zinc-100">MarketWire</span>
          </Link>
          <Link
            href="/"
            className="font-mono text-xs text-zinc-500 transition-colors hover:text-zinc-300"
          >
            {"\u2190"} Back to feed
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="mb-2 font-serif text-3xl font-medium text-zinc-50 md:text-4xl">
          Privacy Policy
        </h1>
        <p className="mb-10 font-mono text-sm text-zinc-500">
          Last updated: 28 February 2026
        </p>

        <div className="space-y-8 text-base leading-relaxed text-zinc-300">
          <section>
            <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500">
              Overview
            </h2>
            <p>
              AIMarketWire (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website
              aimarketwire.ai. This Privacy Policy describes how we collect, use, and protect
              information when you visit our website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500">
              Information We Collect
            </h2>
            <p>
              AIMarketWire is a publicly accessible news aggregation site. We do not require
              registration, login, or any personal information to use the site.
            </p>
            <p className="mt-3">
              <strong className="text-zinc-200">Server logs:</strong> Our hosting provider
              (Vercel) automatically collects standard server logs including IP addresses, browser
              type, referring pages, and timestamps. These logs are used for security monitoring
              and performance optimisation.
            </p>
            <p className="mt-3">
              <strong className="text-zinc-200">Analytics:</strong> We may use privacy-respecting
              analytics to understand aggregate traffic patterns. We do not track individual
              users across sessions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500">
              Cookies
            </h2>
            <p>
              AIMarketWire uses only essential cookies required for the website to function
              correctly. We do not use advertising cookies or third-party tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500">
              Third-Party Services
            </h2>
            <p>
              Our website is hosted on Vercel. Our database is hosted on Neon. These services
              have their own privacy policies. We do not sell, trade, or transfer your information
              to any other third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500">
              External Links
            </h2>
            <p>
              AIMarketWire contains links to original news articles on third-party websites.
              These external sites have their own privacy policies. We are not responsible for
              the content or privacy practices of external sites.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500">
              Data Retention
            </h2>
            <p>
              Server logs are retained for a maximum of 30 days. Published article data
              (sourced from publicly available news feeds) is retained indefinitely as part
              of our news archive.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500">
              Your Rights
            </h2>
            <p>
              If you have questions about your data or wish to exercise your rights under
              applicable privacy legislation (including the Australian Privacy Act 1988 and
              GDPR where applicable), please contact us.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-widest text-emerald-500">
              Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on
              this page with an updated date. Continued use of the website constitutes
              acceptance of the updated policy.
            </p>
          </section>
        </div>
      </main>

      <Footer maxWidth="3xl" activePath="/privacy" />
    </div>
  );
}
