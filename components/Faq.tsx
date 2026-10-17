import type { Faq as FaqItem } from "@/content/faq";
import { JsonLd } from "@/components/JsonLd";
import { faqPage } from "@/lib/schema";

/** Visible questions and answers, with matching FAQPage structured data. */
export function Faq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="faq">
      <JsonLd data={{ "@context": "https://schema.org", ...faqPage(faqs) }} />
      {faqs.map((f) => (
        <details key={f.q} className="faq-item">
          <summary>
            <h3>{f.q}</h3>
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
