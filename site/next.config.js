/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  distDir: '../public',
  env: {
    name: 'SquirrelWorks Kasm Repository',
    description: 'SquirrelWorks 3rd Party Kasm Workspace Repository.',
    icon: '/swlogo.png',
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
