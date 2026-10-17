import type { Metadata } from "next";
import { TrackGrid } from "@/components/TrackGrid";

export const metadata: Metadata = {
  title: "AI Learning Paths: Free Tracks for Work, Builders and Engineers",
  description: "Guided paths through the AI in Bed lessons for different goals: AI for everyone, AI at work, builders and ML engineers.",
  alternates: { canonical: "/tracks" },
};

export default function TracksPage() {
  return (
    <div className="wrap section">
      <p className="kicker">Tracks</p>
      <h1>Pick a path for your goal</h1>
      <p className="lead" style={{ maxWidth: "36rem" }}>
        Levels go from easy to hard. Tracks cut across them for a goal: a hand-picked order of lessons for where you
        want to end up.
      </p>
      <TrackGrid />
    </div>
  );
}
