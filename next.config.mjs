/** @type {import('next').NextConfig} */

const nextConfig = { 
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dreik.d.qarwe.online',
                port: '',
                pathname: '/api/avatar/**',
            },
        ],
    },
};

export default nextConfig;
