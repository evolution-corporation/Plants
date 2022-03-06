module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '~components': './src/components',
          '~services': './src/services',
          '~store': './src/store',
          '~screens': './src/screens',
          '~assets': './src/assets'
        },
      },
    ],
  ],
};
