const path = require('path');
const webpack = require('webpack');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  externals: {
    rollbar: 'rollbar',
  },
  define: {
    REACT_APP_URI_API: process.env.NODE_ENV === 'production'
                       ? process.env.REACT_APP_URI_API
                       : (process.env.NODE_ENV === 'testing'
                           ? 'http://localhost:8000'
                           : ''),
    REACT_APP_DRIVER_API: process.env.NODE_ENV === 'production'
                       ? process.env.REACT_APP_DRIVER_API
                       : (process.env.NODE_ENV === 'testing'
                           ? 'http://localhost:8000'
                           : ''),
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};
