/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/gs-:paper", destination: "/gs/:paper" },
    ];
  },
};

export default nextConfig;
