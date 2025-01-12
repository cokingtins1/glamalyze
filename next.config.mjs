/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			// {
			// 	protocol: "https",
			// 	hostname: "*",
			// 	port: "",
			// },
			{
				protocol: "https",
				hostname: "www.sephora.com",
				pathname: "/productimages/**",
			},
			{
				protocol: "https",
				hostname: "media.ulta.com",
				pathname: "/i/ulta/**",
			},
		],
	},

	experimental: {
		serverComponentsExternalPackages: [
			"puppeteer-core",
			"puppeteer-extra",
			"puppeteer-extra-plugin-stealth",
			"puppeteer-extra-plugin-recaptcha",
		],
	},
};

export default nextConfig;
