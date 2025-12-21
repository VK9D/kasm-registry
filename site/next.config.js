/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  distDir: "../public",
  env: {
    name: "SquirrelWorks Kasm Registry",
    description: "SquirrelWorks Kasm Workspace Registry.",
    icon: "https://squirrelworksllc.github.io/kasm-registry/1.1/swlogo.png",
    listUrl: "https://squirrelworksllc.github.io/kasm-registry/",
    contactUrl: "",
  },
  reactStrictMode: true,

  // IMPORTANT: storefront lives under /kasm-registry/1.1 on GitHub Pages
  basePath: "/kasm-registry/1.1",

  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;