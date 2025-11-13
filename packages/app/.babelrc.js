module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-flow',
  ],
  plugins: [],
  env: {
    production: {
      plugins: ['nativewind/babel'],
    },
  },
};
