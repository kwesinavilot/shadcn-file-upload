const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
})

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/shadcn-file-upload',
  assetPrefix: '/shadcn-file-upload/'
}

module.exports = withNextra(nextConfig)