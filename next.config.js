/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/swagger-jsdoc\/src\/utils\.js/ },
      { file: /node_modules\/swagger-jsdoc\/src\/index\.js/ },
    ];

    return config;
  },
};

module.exports = nextConfig;
