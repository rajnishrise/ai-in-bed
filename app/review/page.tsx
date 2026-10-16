import type { Metadata } from "next";
import { allQuizzes } from "@/content";
import { Review } from "@/components/Review";

export const metadata: Metadata = {
  title: "Review",
  description: "Spaced review of the quick checks you have answered.",
  robots: { index: false },
};

export default function ReviewPage() {
  return (
    <div className="wrap narrow section">
      <p className="kicker">Review</p>
      <h1>Make it stick</h1>
      <p className="lead">
        Questions you answer in lessons come back here just before you would forget them. A few minutes a night is
        enough.
      </p>
      <Review quizzes={allQuizzes} />
    </div>
  );
}
