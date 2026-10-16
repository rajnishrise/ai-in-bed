import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import Link from "next/link";
import { Header } from "@/components/Header";
import { LogoMark, Wordmark } from "@/components/Logo";
import { TabBar } from "@/components/NavLinks";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
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
    description: SITE_TAGLINE,
    type: "website",
    locale: "en",
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: { title: SITE_NAME, statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
  ],
};

// Applies the saved theme before first paint so there is no flash.
const themeScript = `try{var t=localStorage.getItem('aib-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="night" className={`${body.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
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
            </div>
            <nav className="footer-links" aria-label="Footer">
              <Link href="/level/beginner">Beginner</Link>
              <Link href="/level/intermediate">Intermediate</Link>
              <Link href="/level/advanced">Advanced</Link>
              <Link href="/review">Review</Link>
              <Link href="/resources">Library</Link>
              <Link href="/glossary">Glossary</Link>
            </nav>
            <p className="footer-note muted">
              Lessons are original summaries that credit and link to the open and free material they draw on. See the{" "}
              <Link href="/resources">Library</Link> for every source and its licence.
            </p>
          </div>
        </footer>
        <TabBar />
        <Analytics />
      </body>
    </html>
  );
}
