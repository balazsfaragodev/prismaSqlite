/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: { serverComponentsExternalPackages: ['@aws-sdk'] },
    images: {
        domains: [
            `uxdesign-prisma-nextjs.s3.eu-central-1.amazonaws.com`,
        ],
    },
}

module.exports = nextConfig
