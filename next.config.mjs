import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the project root so Next.js doesn't get confused by lockfiles
  // that may exist in parent directories.
  turbopack: {
    root: path.resolve("."),
  },
};

export default nextConfig;
