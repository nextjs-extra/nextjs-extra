/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // important: this is required to make the async component work
  transpilePackages: ["@next-extra/async-component"],
};

module.exports = nextConfig;
