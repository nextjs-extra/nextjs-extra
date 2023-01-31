/** @type {import('next').NextConfig} */

const { buildDynamiComponents } = require("@nextjs-extra/dynamic-components");

const nextConfig = {
  reactStrictMode: true,
};

module.exports = async () => {
  await buildDynamiComponents({
    watch: process.env.NODE_ENV === "development",
  });

  return nextConfig;
};
