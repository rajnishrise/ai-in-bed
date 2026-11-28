"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ADSENSE_CLIENT, AD_SLOTS, type AdPlacement } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * One responsive AdSense display unit in a box with reserved height, so text does not jump when the ad loads.
 * Renders nothing until the slot ID is set in lib/ads.ts. Hides itself if Google has no ad to show.
 */
export function AdSlot({ placement }: { placement: AdPlacement }) {
  const slot = AD_SLOTS[placement];
  const path = usePathname();
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!slot || !ref.current || ref.current.dataset.adsbygoogleStatus) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ad blockers and offline reading make this fail; the page is fine without the ad.
    }
  }, [slot, path]);

  if (!slot) return null;
  return (
    <aside className="ad-slot" aria-label="Advertisement">
      <p className="ad-label">Advertisement</p>
      <ins
        key={path}
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
