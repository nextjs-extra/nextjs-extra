/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const { buildStyle } = require("@nextjs-extra/build-style");

module.exports = async function () {
  await buildStyle({
    watch: process.env.NODE_ENV === "development",
    variables: {
      "bg-color": "#eec",
      "text-color": "#115",
      "main-borders": "2px solid #115",
    },
  });

  return nextConfig;
};
