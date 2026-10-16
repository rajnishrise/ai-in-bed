import Link from "next/link";
import { trackLessons, tracks } from "@/content/tracks";
import { Icon } from "./Icon";
import { TrackMeter } from "./TrackPath";

/** Cards linking to each learning track. */
export function TrackGrid() {
  return (
    <div className="track-grid">
      {tracks.map((t) => {
        const steps = trackLessons(t);
        return (
          <Link key={t.id} href={`/tracks/${t.id}`} className="track-card">
            <span className="track-for">{t.forWho}</span>
            <span className="track-name">{t.name}</span>
            <span className="track-tag">{t.tagline}</span>
            <span className="track-foot">
              <Icon name="route" size={16} /> {steps.length} lessons · about {steps.reduce((n, s) => n + s.lesson.minutes, 0)} min
            </span>
            <TrackMeter steps={t.steps} />
          </Link>
        );
      })}
    </div>
  );
}
