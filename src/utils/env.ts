export const hasProto = "__proto__" in {};

export const inBrowser = typeof window !== "undefined";
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
export const isIE = UA && /msie|trident/.test(UA);
export const isIE9 = UA && UA.indexOf("msie 9.0") > 0;
export const isEdge = UA && UA.indexOf("edge/") > 0;
export const isAndroid = UA && UA.indexOf("android") > 0;
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
export const isMobileDev = isAndroid || isIOS;
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

export const getEnv = () => process.env;

export const getEnvValByKey = (key: string) => {
  const env = getEnv();
  if (!env) {
    return "";
  }
  return env[key] || "";
};

export const getCordovaConfig = () => {
  const urlArr: Array<string> = [];
  const keys = ["VUE_APP_CORDOVA_COMMON", "VUE_APP_CORDOVA_URL"];

  for (let i = 0; i < keys.length; ++i) {
    const keyVal = getEnvValByKey(keys[i]);
    if (keyVal) {
      urlArr.push(keyVal);
    }
  }
  return urlArr;
};

export const APP_ENV = {
  localDev: "localDev", // 本地开发环境
  ft: "ft", // ft环境
  sit: "sit", // sit测试环境
  production: "production", // 生产环境
};

export function getCurAppEnv() {
  return process.env.VUE_APP_ENV;
}

/**
 * 是否是本地环境
 */
export const isLocalEnv = process.env.VUE_APP_ENV === APP_ENV.localDev;

/**
 * 是否是ft环境
 */
export const isFtEnv = process.env.VUE_APP_ENV === APP_ENV.ft;

/**
 * 是否是sit环境
 */
export const isSitEnv = process.env.VUE_APP_ENV === APP_ENV.sit;

/**
 * 是否是生产环境
 */
export const isProductionEnv = process.env.VUE_APP_ENV === APP_ENV.production;

/**
 * 本地真机环境
 */
export const isLocalMobileEnv =
  isLocalEnv && !(window.location.href.indexOf("localhost") >= 0);

export default {};
