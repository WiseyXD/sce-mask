/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pbs.twimg.com',
                port: '',
                pathname: '/profile_images/**',
            },
        ],
    },
};

export default nextConfig;
