/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
				/* hostname: 'dreik.d.qarwe.online', */
				hostname: 'frontend-zeta-two-39.vercel.app',
                port: '',
                pathname: '/api/avatar/**',
            },
        ],
    }
};

export default nextConfig;
