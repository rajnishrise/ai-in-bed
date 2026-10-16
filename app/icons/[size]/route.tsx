import { brandIcon } from "@/lib/brandIcon";

/** PNG app icons for installing the site: /icons/192, /icons/512 and a padded /icons/maskable. */
export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ size: "192" }, { size: "512" }, { size: "maskable" }];
}

export async function GET(_req: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  if (size === "maskable") return brandIcon(512, 0.25);
  const n = Number(size);
  if (n !== 192 && n !== 512) return new Response("Not found", { status: 404 });
  return brandIcon(n);
}
