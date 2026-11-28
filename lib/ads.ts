/** Google AdSense settings. The publisher ID is public by design (it is also in /ads.txt). */
export const ADSENSE_CLIENT = "ca-pub-7026554161534274";

/**
 * Ad unit IDs from AdSense (Ads > By ad unit > Display ads). A slot stays hidden until its ID is set here.
 * Ads only go on the blog, Everyday AI guides and glossary pages; lessons, levels, tracks and review stay ad-free.
 */
export const AD_SLOTS = {
  /** After the opening section of a page. */
  inContent: "",
  /** Near the end of a page, after the main content. */
  endOfPage: "",
} as const;

export type AdPlacement = keyof typeof AD_SLOTS;
