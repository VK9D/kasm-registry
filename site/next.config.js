/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: '../public',
  env: {
    name: 'SquirrelWorks Kasm Registry',
    description: 'SquirrelWorks Kasm Workspace Registry.',
    icon: 'https://squirrelworksllc.github.io/kasm-registry/1.1/swlogo.png',
    listUrl: 'https://squirrelworksllc.github.io/kasm-registry/1.1',
    contactUrl: '',
  },
  reactStrictMode: true,
  basePath: '/kasm-registry/1.0',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig