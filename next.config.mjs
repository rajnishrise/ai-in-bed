/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // One address for search engines: send the bare domain and the Vercel URL to www.aiinbed.com.
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
