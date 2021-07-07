import Vue from "vue";
import _ from "lodash";
// import UiMgr from "./UiMgr";

export const APP_HOOKS = {
  beforeInit: "beforeInit",
  initialized: "initialized",
  beforeDestroy: "beforeDestroy",
  destroyed: "destroyed",
};

// app配置接口
export interface AppConfig {
  // uiMgr?: UiMgr;
  storeMgr: any;
  storageMgr?: any;

  hooks?: {
    // @ts-ignore
    [APP_HOOKS.beforeInit]?: any;
    // @ts-ignore
    [APP_HOOKS.initialized]?: Function;
    // @ts-ignore
    [APP_HOOKS.beforeDestroy]?: Function;
    // @ts-ignore
    [APP_HOOKS.destroyed]?: Function;
  };
  router?: any;
  store?: any;
  appComponent?: any;
  appDomStr?: string;

  componentRegisterFn?: Function; // 全局组件注册函数
}

/**
 * app类
 */
class Application {
  private appConfig!: AppConfig;

  private _hooks: {
    // @ts-ignore
    [APP_HOOKS.beforeInit]: Array<Function>;
    // @ts-ignore
    [APP_HOOKS.initialized]: Array<Function>;
    // @ts-ignore
    [APP_HOOKS.beforeDestroy]: Array<Function>;
    // @ts-ignore
    [APP_HOOKS.destroyed]: Array<Function>;
  } = {
    [APP_HOOKS.beforeInit]: [],
    [APP_HOOKS.initialized]: [],
    [APP_HOOKS.beforeDestroy]: [],
    [APP_HOOKS.destroyed]: [],
  };

  constructor(appConfig: AppConfig) {
    this.appConfig = appConfig;
    this._handleAppConfig();
    this._handleOthers(appConfig);
  }

  private _handleAppConfig() {
    this._validateConfig();
    this._initHooks();

    // 初始化storeMgr
    if (this.appConfig.storeMgr && this.appConfig.store) {
      this.appConfig.storeMgr.init(this.appConfig.store);
    }
  }

  private _handleOthers(options: any) {
    this._setVueConfig();

    this._handleDebug();
    this._remAdaptive();
    this._extendNativeJs();
    this._extendVue();
    this.selectUIPlugin();
    this._registerGlobalComponents();

    this._initCommon({
      router: options && options.router,
    });
  }

  private _validateConfig() {
    if (!this.appConfig) {
      console.error("appConfig is empty");
      return;
    }

    if (!this.appConfig.appComponent) {
      console.error("appComponent is empty");
    }
  }

  private _initHooks() {
    const appConfigHooks: any = this.appConfig.hooks;
    const appHooks: any = this._hooks;
    for (const key in appConfigHooks) {
      if (
        appConfigHooks.hasOwnProperty(key) &&
        _.isFunction(appConfigHooks[key]) &&
        appHooks[key]
      ) {
        appHooks[key].push(appConfigHooks[key]);
      }
    }
  }

  start() {
    try {
      this._callHook(APP_HOOKS.beforeInit);
      new Vue({
        router: this.appConfig.router,
        store: this.appConfig.store,
        render: (h) => h(this.appConfig.appComponent),
      }).$mount(this.appConfig.appDomStr || "#app");
      this._callHook(APP_HOOKS.initialized);
    } catch (err) {
      console.error("app start err:", err);
      // this.appConfig.uiMgr.showToast(err.message);
    }
  }

  reStart() {}

  end() {}

  private _callHook(hookName: string) {
    const hooks: any = this._hooks;

    const handles: Array<any> = hooks[hookName];
    if (!handles) {
      console.warn("app hook handles is empty");
      return;
    }

    for (let i = 0; i < handles.length; ++i) {
      try {
        handles[i].call(this);
      } catch (err) {
        console.log("app hooks invoke err:", err);
      }
    }
  }

  private _updateRemRatio(remNum: number) {
    if (!document) {
      console.error("updateRemRatioError:document is empty");
      return;
    }
    const html = document.getElementsByTagName("html")[0];
    const docEleWidth =
      document.documentElement && document.documentElement.clientWidth;
    const oWidth = docEleWidth || document.body.clientWidth;
    html.style.fontSize = `${(oWidth / remNum) * 100}px`;
  }

  /**
   * 设置vue配置
   */
  private _setVueConfig() {
    Vue.config.productionTip = false;
  }

  /**
   * 扩展原生js
   */
  private _extendNativeJs() {}

  /**
   * rem适配
   */
  private _remAdaptive() {
    window.onload = () => {
      this._updateRemRatio(1920);
    };
    window.onresize = () => {
      this._updateRemRatio(1920);
    };
  }

  /**
   * 扩展UI组件
   */
  private selectUIPlugin() {}

  /**
   * 扩展Vue类的prototype
   */

  private _extendVue() {
    // Vue.prototype.$uiMgr = this.appConfig.uiMgr;
    Vue.prototype.$storeMgr = this.appConfig.storeMgr;
  }

  /**
   * 初始化公共模块
   * @param options
   */
  private _initCommon(options: any) {
    // this.appConfig.uiMgr.init({
    //   router: options && options.router,
    // });
  }

  /**
   * 注册全局组件
   */
  private _registerGlobalComponents() {
    if (!this.appConfig.componentRegisterFn) {
      return;
    }

    this.appConfig.componentRegisterFn.call(null);
  }

  /**
   * 处理debug环境下要做的事情
   */
  private _handleDebug() {
    console.groupCollapsed("== == == process.env == == ==");
    console.log(
      "%c process.env:",
      "color: #9E9E9E; font-weight: bold",
      process.env
    );
    console.log(
      "%c process.env.NODE_ENV:",
      "color: #03A9F4; font-weight: bold",
      process.env.NODE_ENV
    );
    console.log(
      "%c process.env.VUE_APP_ENV:",
      "color: #4CAF50; font-weight: bold",
      process.env.VUE_APP_ENV
    );
    console.groupEnd();
  }

  static mixin({ selectUIPlugin }: { selectUIPlugin?: (...arg: any) => any }) {
    if (selectUIPlugin && typeof selectUIPlugin === "function") {
      Application.prototype.selectUIPlugin = selectUIPlugin;
    }
  }
}

export default Application;
