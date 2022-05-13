/** @type {import('next').NextConfig} */

const withSvgr = require('@newhighsco/next-plugin-svgr');
const nextConfig = {
	reactStrictMode: true,
	env: {
		SOCKET_URL: process.env.SOCKET_URL,
	},
};

module.exports = withSvgr(nextConfig);
