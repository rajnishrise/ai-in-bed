import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { REPO_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contribute",
  description: "Help make AI in Bed better: report a mistake, suggest a topic or write a lesson.",
  alternates: { canonical: "/contribute" },
};

const issue = (title: string, body: string, label: string) =>
  `${REPO_URL}/issues/new?${new URLSearchParams({ title, body, labels: label })}`;

export default function ContributePage() {
  return (
    <div className="wrap narrow section">
      <p className="kicker">Open to everyone</p>
      <h1>Help make AI in Bed better</h1>
      <p className="lead">
        Every lesson here is free, and the source is open. If you spot a mistake, wish a topic existed or want to write
        one yourself, you can help in a few minutes.
      </p>
      <div className="contribute-grid">
        <div className="contribute-card">
          <h2>Report a mistake</h2>
          <p className="muted">Wrong fact, broken link or a confusing sentence. Every lesson has a &quot;Suggest an edit&quot; link at the end too.</p>
          <a className="btn btn-ghost btn-sm" href={issue("Mistake: ", "Page:\n\nWhat's wrong:\n\nWhat it should say:\n", "content")} target="_blank" rel="noopener noreferrer">
            Report it <Icon name="external" size={14} />
          </a>
        </div>
        <div className="contribute-card">
          <h2>Suggest a topic</h2>
          <p className="muted">Tell us what you wish you understood. Popular requests become next month&apos;s lessons.</p>
          <a className="btn btn-ghost btn-sm" href={issue("Topic idea: ", "What I'd like to learn:\n\nWhich level (beginner, intermediate, advanced):\n", "topic")} target="_blank" rel="noopener noreferrer">
            Suggest one <Icon name="external" size={14} />
          </a>
        </div>
        <div className="contribute-card">
          <h2>Write a lesson</h2>
          <p className="muted">Lessons are short TypeScript files with cards, quizzes and sources. The guide has a template you can copy.</p>
          <a className="btn btn-ghost btn-sm" href={`${REPO_URL}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer">
            Read the guide <Icon name="external" size={14} />
          </a>
        </div>
        <div className="contribute-card">
          <h2>Improve the site</h2>
          <p className="muted">Fix a bug, polish an explainer or make something more accessible. Pull requests are welcome.</p>
          <a className="btn btn-ghost btn-sm" href={REPO_URL} target="_blank" rel="noopener noreferrer">
            See the code <Icon name="external" size={14} />
          </a>
        </div>
      </div>
      <h2>What makes a good lesson here</h2>
      <ul>
        <li>One idea per card, readable in one thumb-scroll.</li>
        <li>Plain English first. Explain every term the first time it appears.</li>
        <li>Two quick checks that test understanding, not memory.</li>
        <li>Credit free, open sources and link to them.</li>
        <li>Accurate and calm: no hype, no doom.</li>
      </ul>
    </div>
  );
}
