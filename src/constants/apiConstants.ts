import { InterfaceConfig } from "../utils/network/httpUtil";

// api枚举
export const apiEnums = {
  // --------公用接口---begin--- TODO list
  // API_COMMON_DATA_LIST: '/v1/dict/list',//数据字典接口
  // API_COMMON_AREA_LIST: '/v1/area/list', // 省市区接口
  // API_COMMON_DIAGNOSIS_CATALOG_LIST: '/v1/damage/catalog/tree', // 诊断目录接口
  // --------公用接口---end---

};

export const apiConfig: InterfaceConfig = {
  default: {
    timeout: 30000,
    isShowLoading: true, // 是否需要显示loading遮罩
    loadingText: "正在加载中...", // 显示loading遮罩的显示内容
    method: "POST",
    headers: {
      "Content-Type": "application/json", // application/json
    },
    isNeedCors: false,
    isResolveError: false, // 是否将服务端的错误当成resolve丢给外面
    isShowNetErr: true, // 是否展示网络信号原因导致的接口错误，一般用在超时上
  },
  // 定制化
  // [apiEnums.API_POST_QUERYPICTURE]: {
  //   headers: {
  //     'Accept-Language': 'zh-CN',
  //     'Content-Type': 'application/json',
  //   },
  // },
};

