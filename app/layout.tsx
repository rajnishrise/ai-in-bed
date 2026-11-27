import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces, Newsreader } from "next/font/google";
import Link from "next/link";
import { Header } from "@/components/Header";
import { LogoMark, Wordmark } from "@/components/Logo";
import { TabBar } from "@/components/NavLinks";
import { JsonLd } from "@/components/JsonLd";
import { InstallButton, ServiceWorker } from "@/components/Offline";
import { WarmthToggle } from "@/components/WarmthToggle";
import { organization, website } from "@/lib/schema";
import { INSTAGRAM_URL, SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

// Night headings use Fraunces (soft, warm curves); morning headings and lesson text use Newsreader, a book serif.
const body = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });
const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
  display: "swap",
});
const book = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en",
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: { title: SITE_NAME, statusBarStyle: "black-translucent" },
  // Search Console and Bing Webmaster ownership tags, set as env vars on Vercel.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#140d0b" },
    { media: "(prefers-color-scheme: light)", color: "#efe9df" },
  ],
};

// Applies the saved theme and reading mode before first paint so there is no flash.
// Also turns on bedtime warmth between 9pm and 5am unless the reader switched it off.
// AdSense publisher ID; public by design (it also appears in /ads.txt).
const ADSENSE_CLIENT = "ca-pub-7026554161534274";

const themeScript = `try{var d=document.documentElement,t=localStorage.getItem('aib-theme');if(t)d.dataset.theme=t;if(localStorage.getItem('aib-reader')==='scroll')d.dataset.reader='scroll';var h=new Date().getHours();if((h>=21||h<5)&&localStorage.getItem('aib-warm')!=='off')d.dataset.warm='on'}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="night" className={`${body.variable} ${display.variable} ${book.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Google AdSense site verification. No ad units or Auto ads are turned on yet. */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <JsonLd data={{ "@context": "https://schema.org", "@graph": [organization, website] }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <footer className="site-footer">
          <div className="wrap footer-inner">
            <div className="footer-brand">
              <Link href="/" className="brand" aria-label="AI in Bed home">
                <LogoMark size={24} />
                <Wordmark />
              </Link>
              <p className="muted">{SITE_TAGLINE} Free, no sign-up. Your progress stays in your browser.</p>
              <InstallButton />
              <WarmthToggle />
            </div>
            <nav className="footer-links" aria-label="Footer">
              <Link href="/learn">Learn</Link>
              <Link href="/level/beginner">Beginner</Link>
              <Link href="/level/intermediate">Intermediate</Link>
              <Link href="/level/advanced">Advanced</Link>
              <Link href="/tracks">Tracks</Link>
              <Link href="/learn-ai-in-30-days">30-day plan</Link>
              <Link href="/free-ai-courses">Free AI courses</Link>
              <Link href="/free-ai-courses-with-certificates">Free certificates</Link>
              <Link href="/review">Review</Link>
              <Link href="/resources">Library</Link>
              <Link href="/glossary">Glossary</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/everyday-ai">Everyday AI</Link>
              <Link href="/new">What&apos;s new</Link>
              <Link href="/about">About</Link>
              <Link href="/contribute">Contribute</Link>
              <a href={INSTAGRAM_URL} rel="me noopener" target="_blank">
                Instagram
              </a>
            </nav>
            <p className="footer-note muted">
              Lessons are original summaries that credit and link to the open and free material they draw on. See the{" "}
              <Link href="/resources">Library</Link> for every source and its licence.
            </p>
          </div>
        </footer>
        <TabBar />
        <ServiceWorker />
        <Analytics />
      </body>
    </html>
  );
}
