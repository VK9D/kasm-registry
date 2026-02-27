/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  distDir: "../public",
  env: {
    name: "VK9D Kasm Registry",
    description: "VK9D Kasm Workspace Registry.",
    icon: "https://vk9d.github.io/kasm-registry/1.1/swlogo.png",
    listUrl: "https://vk9d.github.io/kasm-registry/",
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
