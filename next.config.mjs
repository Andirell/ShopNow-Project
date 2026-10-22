/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // Our product photos
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/dxekfksjf/**"
            },
            // Images uploaded through the Django admin while running locally
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/media/**"
            }
        ]
    }
};

export default nextConfig;
