/** @type {import('next').NextConfig} */
const path = require("path");

// Necessary to handle statically imported images
const withImages = require('next-images');
// Necessary to handle statically imported fonts
const withFonts = require('next-fonts');

module.exports = withImages(withFonts({
  // Allows us to access other directories in the monorepo
  experimental: {
    externalDir: true
  },
  // This feature conflicts with next-images
  images: {
    disableStaticImages: true,
  },
  webpack: (config, options) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
      'react-native-web': path.resolve(__dirname, 'node_modules', 'react-native-web'),
      'react': path.resolve(__dirname, 'node_modules', 'react'),
      'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
    }
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ]

    // Add support for monorepo packages that use React Native
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Ensure we transpile @my-app packages and React Native modules
    config.module.rules.push({
      test: /\.(jsx?|tsx?)$/,
      include: [
        path.resolve(__dirname, '..', 'app'),
        // Include node_modules that need transpiling
        /node_modules\/react-native-/,
        /node_modules\/@react-native/,
        /node_modules\/@react-navigation/,
        /node_modules\/@gluestack-ui/,
        /node_modules\/@gluestack-style/,
        /node_modules\/@legendapp/,
      ],
      use: options.defaultLoaders.babel,
    });

    return config;
  }
}));