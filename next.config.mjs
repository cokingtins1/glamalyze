/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*",
				port: "",
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
