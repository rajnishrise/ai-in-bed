import type { Metadata } from "next";
import Link from "next/link";
import { totalLessons } from "@/content";
import { planFaqs } from "@/content/faq";
import { PLAN_DAYS, plan, planMinutes } from "@/content/plan";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PlanCalendar, PlanPath } from "@/components/PlanPath";
import { courseDetails } from "@/lib/schema";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const perNight = Math.round(planMinutes / PLAN_DAYS);
const title = `Learn AI in 30 Days: A Free Plan, ${perNight} Minutes a Night`;
const description = `A free 30-day AI learning plan for beginners: ${totalLessons} short lessons from what AI is to how ChatGPT-style models, RAG and agents work, about ${perNight} minutes a night, with weekly review and calendar reminders.`;

export const metadata: Metadata = {
  title: { absolute: `${title} · ${SITE_NAME}` },
  description,
  alternates: { canonical: "/learn-ai-in-30-days" },
  openGraph: { siteName: SITE_NAME, type: "article", locale: "en", title, description, url: "/learn-ai-in-30-days" },
};

export default function PlanPage() {
  const url = absoluteUrl("/learn-ai-in-30-days");
  const lessonDays = plan.flatMap((d) => (d.kind === "lessons" ? d.lessons : []));
  return (
    <div className="wrap narrow section">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Course",
              name: "Learn AI in 30 days",
              description,
              url,
              educationalLevel: "Beginner to advanced",
              ...courseDetails(planMinutes, { nights: PLAN_DAYS, minutesPerNight: perNight }),
              hasPart: lessonDays.map((l) => ({ "@type": "LearningResource", name: l.title, url: absoluteUrl(l.href) })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "Learn AI in 30 days", item: url },
              ],
            },
          ],
        }}
      />
      <p className="kicker">Free plan · {PLAN_DAYS} nights</p>
      <h1>Learn AI in 30 days, a few minutes a night</h1>
      <p className="lead">
        Yes, you can understand how AI works in a month. This free plan takes you through all {totalLessons} AI in Bed
        lessons in order, about {perNight} minutes a night: the basics first, then how machine learning works, then
        large language models, RAG, agents and AI safety. Every seventh night is a short review.
      </p>
      <PlanCalendar days={plan} />
      <PlanPath days={plan} />
      <p className="muted" style={{ marginTop: 24 }}>
        Prefer a shorter path for one goal? Try a <Link href="/tracks">learning track</Link>. Want a certificate at the
        end? See <Link href="/free-ai-courses-with-certificates">free AI courses with certificates</Link>.
      </p>
      <h2 className="section-title" style={{ marginTop: 48 }}>
        Questions about learning AI in 30 days
      </h2>
      <Faq faqs={planFaqs} />
    </div>
  );
}
