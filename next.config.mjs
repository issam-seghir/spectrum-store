/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// This ensures that only external images from fakestoreapi or imgur can be served from the Next.js Image Optimization API.
		// Any other protocol, hostname, port, or unmatched path will respond with 400 Bad Request.
		remotePatterns: [
			{
				protocol: "https",
				hostname: "fakestoreapi.com",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "i.imgur.com",
				port: "",
				pathname: "**",
			},
		],
	},
};

export default nextConfig;
