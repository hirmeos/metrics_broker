import pageRoutes from './router.config';
import webpackplugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true
        },
        locale: {
          enable: true,
          default: 'en-GB',
          baseNavigator: true
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index'
        }
      }
    ]
  ],
  externals: {
    rollbar: 'rollbar'
  },
  define: {
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_URI_API:
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_URI_API
        : process.env.NODE_ENV === 'testing'
          ? 'http://localhost:8000'
          : '',
    REACT_APP_DRIVER_API:
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_DRIVER_API
        : process.env.NODE_ENV === 'testing'
          ? 'http://localhost:8000'
          : '',
    REACT_APP_AUTH_API:
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_AUTH_API
        : process.env.NODE_ENV === 'testing'
          ? 'http://localhost:8000'
          : ''
  },
  routes: pageRoutes,
  ignoreMomentLocale: true,
  theme: {
    'primary-color': defaultSettings.primaryColor
  },
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    }
  },
  chainWebpack: webpackplugin
};
