/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com", "vercel-storage.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

module.exports = nextConfig

