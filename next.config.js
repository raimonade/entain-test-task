/** @type {import('next').NextConfig} */

const withSvgr = require('@newhighsco/next-plugin-svgr');
const nextConfig = {
	reactStrictMode: true,
	env: {
		API_URL: 'http://localhost:3000',
		SOCKET_URL: 'http://localhost:8080',
	},
};

module.exports = withSvgr(nextConfig);
