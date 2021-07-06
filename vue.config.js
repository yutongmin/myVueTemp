const px2rem = require('postcss-px2rem');
const TerserPlugin = require('terser-webpack-plugin');
const bodyParser = require('body-parser')
const debug = process.env.NODE_ENV !== 'production'

const postcss = px2rem({
  remUnit: 100,
})

console.log('isDebug: ',debug)

function getCurrentDevEnv(original) {
  if (!original) {
    return 'dev'; // 默认用dev
  }
  for (let i = 0; i < original.length; ++i) {
    if (original[i].indexOf('-') >= 0) {
      const env = original[i].replace('-', '');
      if (env === 'sit' || env === 'ft') {
        return env;
      }
    }
  }
  return 'dev'; // 默认用dev
}
// TODO 根据实际情况调整
const devServerTargetConfig = {
  ft: 'https://xxx-ft.lemon.com.cn',
  sit: 'https://xxx-sit.lemon.com.cn',
  production: 'https://lemon.cpic.com.cn',
  dev: 'http://xxx-dev.lemon.com.cn', 
};

const devTarget = devServerTargetConfig[getCurrentDevEnv(process.argv)];
console.log('devTarget:', devTarget);

const proxy = {};
// TODO 根据实际情况调整
const proxyApis = ['/api', '/verify'];
// const proxyApis = []
proxyApis.forEach((item) => {
  proxy[item] = {
    target: devTarget,
    secure: false, // if you want to verify the SSL Certs
    ws: true, // if you want to proxy websockets
    changeOrigin: true, // changes the origin of the host header to the target URL
    logLevel: 'debug'
  };
});
console.log('proxy:', proxy)

// vue.config.js 配置
module.exports = {
  // 一些配置选项
  publicPath: debug ? '/' : './', // 基本路径
  assetsDir: 'assets', // 静态资源目录（js css img fonts）
  lintOnSave: false, // 是否开启eslint 保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行版本时是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度

  configureWebpack: (config) => {
    // webpack配置，值为对象时会合并配置，为方法时会改写配置
    config.module.unknownContextCritical = false
    if (debug) {
      // 开发环境配置
      config.devtool = 'cheap-module-eval-source-map';
    } else {
      // 生产环境配置
      // config.devtool = 'source-map'
      const plugins = [
        new TerserPlugin({
          // cache: true,
          parallel: true,
          // sourceMap: false, // Must be set to true if using source-maps in production
          terserOptions: {
            compress: {
              warnings: false,
              drop_console: false,
              drop_debugger: true,
            },
          },
        }),
      ];
      config.plugins = [...config.plugins, ...plugins];
    }
  },

  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //         // @代表src
  //         'assets': '@/assets',
  //         'common': '@/common',
  //         'components': '@/components',
  //         'network': '@/network',
  //         'views': '@/views',
  //     }
  //   }
  // }

  chainWebpack: (config) => {
    // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    if (debug) {
      // 本地开发配置
      // Object.keys(mulPagesConfig.pages).forEach((page) => {
      //   config.plugins.delete(`preload-${page}`);
      //   config.plugins.delete(`prefetch-${page}`);
      // });
    } else {
      // 生产配置
      // Object.keys(mulPagesConfig.pages).forEach((page) => {
      //   config.plugins.delete(`preload-${page}`)
      //   config.plugins.delete(`prefetch-${page}`)
      // })
    }
  },

  pluginOptions: {
    // 第三方插件配置
  },

  devServer: {
    // historyApiFallback: {
    //   rewrites: devServerApiFallBackArr,
    // },
    open: true,
    disableHostCheck: true,
    proxy,
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [postcss],
      },
      sass: {
        prependData: '@import "~@/styles/global.scss";', // 引入全局变量
      },
    },
  },
}