/** @type {import('next').NextConfig} */

const withSvgr = require('@newhighsco/next-plugin-svgr');
const nextConfig = {
	reactStrictMode: true,
};

module.exports = withSvgr(nextConfig);
