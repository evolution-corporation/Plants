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
          '~components': './src/core/components',
          '~containers': './src/core/containers',
          '~services': './src/core/services',
          '~store': './src/core/store',
          '~screens': './src/core/screens',
          '~assets': './src/core/assets',
          '~models': './src/core/models',
          '~i18n': './src/core/i18n',
          '~constant': './src/core/constant',
          '~routes': './src/core/routes',
          '~elements': './src/core/elements',
          '~icons': './src/core/elements/icons',
          '~layouts': './src/core/layouts',
          '~globalStyle': './src/core/globalStyle'
        },
      },
      "@babel/plugin-transform-typescript"
    ],
  ],
};