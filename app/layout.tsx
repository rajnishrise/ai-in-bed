import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const body = Nunito({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "AI in Bed · Learn AI one cozy scroll at a time",
    template: "%s · AI in Bed",
  },
  description:
    "Free, bite-sized AI lessons for beginners, intermediate and advanced learners, with infographics and quick quizzes. Built on the best open-source learning material.",
  openGraph: {
    title: "AI in Bed",
    description: "Learn AI one cozy scroll at a time.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1024" },
    { media: "(prefers-color-scheme: light)", color: "#fbf6ee" },
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
        <Header />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            <p>
              🛏️ <strong>AI in Bed</strong> · free lessons, no sign-up. Progress is saved only in your browser.
            </p>
            <p className="muted">
              Lessons are original summaries that link to and credit the open-source and free material they draw on.
              See the <a href="/resources">Library</a> for every source and its licence.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
