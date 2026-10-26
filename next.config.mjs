/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // One address for search engines: send the bare domain and the Vercel URL to www.aiinbed.com.
  // Plain Markdown of any lesson for AI assistants: add .md to its address.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/learn/:level/:slug.md", destination: "/md/:level/:slug" }],
    };
  },
  async redirects() {
    return ["aiinbed.com", "ai-in-bed.vercel.app"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: "https://www.aiinbed.com/:path*",
      permanent: true,
    }));
  },
};

export default nextConfig;
