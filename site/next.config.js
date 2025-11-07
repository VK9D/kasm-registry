/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: '../public',
  env: {
    name: 'SquirrelWorks Kasm Registry (DEV)',
    description: 'SquirrelWorks Kasm Workspace Registry (DEV).',
    icon: 'https://squirrelworksllc.github.io/kasm-registry/1.1/cybrsqrl.png',
    listUrl: 'https://squirrelworksllc.github.io/kasm-registry/',
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
