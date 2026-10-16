/** Thin line icons, drawn on a 24px grid, coloured by currentColor. */
const paths = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" /></>,
  moon: <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>,
  repeat: <><path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5" /><path d="M20 3.5v5h-5" /><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5" /><path d="M4 20.5v-5h5" /></>,
  book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" /><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" /></>,
  text: <><path d="M5 5h14M5 10h14M5 15h9M5 20h6" /></>,
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  back: <path d="M19 12H5m5-5-5 5 5 5" />,
  external: <><path d="M14 4h6v6" /><path d="M20 4 11 13" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  flame: <path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.4 2.4-5.2 3.6-8.3.4 2 1.4 3 2.4 3.6.4-2.6 1.7-5.1 3.9-7.1-.3 3.4 3.1 6 3.1 10.6 0 4.6-2.6 7.4-6.5 7.4Z" />,
  thumbUp: <><path d="M7 10.5V20H4.5a1 1 0 0 1-1-1v-7.5a1 1 0 0 1 1-1H7Z" /><path d="M7 10.5 11 3c1.6 0 2.6 1.2 2.3 2.8L12.7 9H18a2 2 0 0 1 2 2.3l-1.2 6.9A2 2 0 0 1 16.8 20H7" /></>,
  thumbDown: <><path d="M7 13.5V4H4.5a1 1 0 0 0-1 1v7.5a1 1 0 0 0 1 1H7Z" /><path d="M7 13.5 11 21c1.6 0 2.6-1.2 2.3-2.8L12.7 15H18a2 2 0 0 0 2-2.3l-1.2-6.9A2 2 0 0 0 16.8 4H7" /></>,
  sparkle: <path d="M12 3.5c.6 4.4 2.1 5.9 6.5 6.5-4.4.6-5.9 2.1-6.5 6.5-.6-4.4-2.1-5.9-6.5-6.5 4.4-.6 5.9-2.1 6.5-6.5ZM18.5 15.5c.3 1.9.9 2.5 2.8 2.8-1.9.3-2.5.9-2.8 2.8-.3-1.9-.9-2.5-2.8-2.8 1.9-.3 2.5-.9 2.8-2.8Z" />,
  picture: <><rect x="3.5" y="4.5" width="17" height="15" rx="2" /><path d="m3.5 16 5-5 4 4 2.5-2.5 5.5 5.5" /><circle cx="15.5" cy="9" r="1.5" /></>,
  quiz: <><circle cx="12" cy="12" r="8.5" /><path d="M9.6 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.7" /><path d="M12 16.8v.2" /></>,
  play: <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />,
  pause: <path d="M8.5 5.5v13M15.5 5.5v13" />,
  route: <><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="6" r="2.2" /><path d="M8.2 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.8" /></>,
  share: <><path d="M12 15V3.5M7.5 8 12 3.5 16.5 8" /><path d="M5 12.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-6.5" /></>,
  download: <><path d="M12 3.5V15M7.5 10.5 12 15l4.5-4.5" /><path d="M5 19.5h14" /></>,
  cloud: <><path d="M7 18.5a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.4 1.6A3.8 3.8 0 0 1 17.2 18.5H7Z" /><path d="M12 10.5v5.5M9.5 13.5 12 16l2.5-2.5" /></>,
  install: <><rect x="6.5" y="2.5" width="11" height="19" rx="2.2" /><path d="M12 7v7M9.5 11.5 12 14l2.5-2.5" /><path d="M10.5 18.5h3" /></>,
  edit: <><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></>,
  home: <><path d="M4 10.5 12 4l8 6.5V20h-5.5v-6h-5v6H4v-9.5Z" /></>,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
