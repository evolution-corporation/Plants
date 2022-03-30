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
          '~containers': './src/containers',
          '~services': './src/services',
          '~store': './src/store',
          '~screens': './src/screens',
          '~assets': './src/assets',
          '~models': './src/models',
          '~i18n': './src/i18n',
          '~constant': './src/constant'
        },
      },
      "@babel/plugin-transform-typescript"
    ],
  ],
};
