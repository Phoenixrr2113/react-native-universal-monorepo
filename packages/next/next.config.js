/** @type {import('next').NextConfig} */
const path = require("path");

// Necessary to handle statically imported images
const withImages = require('next-images');
// Necessary to handle statically imported fonts
const withFonts = require('next-fonts');

module.exports = withImages(withFonts({
  // Allows us to access other directories in the monorepo
  experimental: {
    externalDir: true,
  },
  // Transpile specific packages that need it
  transpilePackages: [
    'react-native-web',
    'react-native-safe-area-context',
    '@react-navigation/native',
    '@react-navigation/native-stack',
  ],
  // This feature conflicts with next-images
  images: {
    disableStaticImages: true,
  },
  webpack: (config, options) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web` CJS version
      'react-native$': path.resolve(__dirname, 'node_modules', 'react-native-web', 'dist', 'cjs', 'index.js'),
      'react-native-web$': path.resolve(__dirname, 'node_modules', 'react-native-web', 'dist', 'cjs', 'index.js'),
      'react': path.resolve(__dirname, 'node_modules', 'react'),
      'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
      // Use polyfill for use-latest-callback to avoid import.meta issues
      'use-latest-callback': path.resolve(__dirname, 'polyfills', 'use-latest-callback.js'),
    }
    config.resolve.extensions = [
      '.web.js',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ]

    // Add support for transpiling the @my-app/app package
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Transpile the app package source code (but not its node_modules)
    config.module.rules.push({
      test: /\.(jsx?|tsx?)$/,
      include: [path.resolve(__dirname, '..', 'app', 'src')],
      use: options.defaultLoaders.babel,
    });

    return config;
  }
}));