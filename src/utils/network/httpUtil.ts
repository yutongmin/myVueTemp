import _ from 'lodash';
import axios, { Method } from 'axios';
import { Message, Loading  } from 'element-ui'
import { apiConfig } from '@/constants/apiConstants';
import { timeout } from './promise';

export interface InterfaceConfig {
  default: {
    timeout: number;
    isShowLoading: boolean; // 是否需要显示loading遮罩
    loadingText: string; // 显示loading遮罩的显示内容
    method: Method;
    headers: any;
    isNeedCors: boolean;
    isResolveError: boolean;
    isShowNetErr: boolean;
  };
  [propName: string]: {
    timeout?: number;
    isShowLoading?: boolean;
    loadingText?: string;
    method?: Method;
    headers?: any;
    isNeedCors?: boolean;
    isResolveError?: boolean;
    isShowNetErr?: boolean;
  };
}

interface ErrorMessage {
  timeout: string
  error: string
}

class HttpUtil {
  private _interfaceConfig: InterfaceConfig = {
    default: {
      timeout: 30000,
      isShowLoading: true, // 是否需要显示loading遮罩
      loadingText: '正在加载中...', // 显示loading遮罩的显示内容
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // 是否需要跨域，如果需要跨域，则会将header里的content-type改为application/x-www-form-urlencoded
      // 将其变成简单请求
      isNeedCors: false,
      isResolveError: false, // 是否将服务端的错误当成resolve丢给外面 结构为 { errCode:'10001', errMsg:'错误信息...'}
      isShowNetErr: true,
    },
  };

  private _requestCount = 0;

  private _curData: any = {
    url: '',
    requestParams: {
      userToken: '',
    },
    method: '',
    headers: {},
    showLoading: true,
    timeout: 0,
    loadingText: '',
    isNeedCors: false,
    isResolveError: false,
    isShowNetErr: true,
  };

  private _tempErr: Error | null = null;

  private _loading: any

  private _errorMessage: ErrorMessage = {
    timeout: '请求超时，请稍后重试',
    error: '系统繁忙，请稍后再试',
  };

  constructor(options: {
    interfaceConfig: InterfaceConfig;
  }) {
    this._init(options);
  }

  private _init(options: {
    interfaceConfig: InterfaceConfig;
  }) {
    // 初始化处理
    this._interfaceConfig = _.get(options, 'interfaceConfig');
  }

  // httpUtil 暴露给外面的接口
  async request(
    url: string,
    requestParams = {},
    {
      method = this._interfaceConfig.default.method,
      showLoading = this._interfaceConfig.default.isShowLoading, // 是否需要遮罩
      headers = this._interfaceConfig.default.headers, // 默认header
    } = {}
  ) {
    console.log('url:', url)
    this._preHandle({
      url,
      requestParams,
      method,
      showLoading,
      headers,
    });

    try {
      // 请求
      const responseData = await this._handleRequest();
      // console.log('responseData:', responseData)
      const result: any = await this.handleResponse(responseData);
      return result;
    } catch (err) {
      // 当是网络超时错误时，且接口配置为不展示接口错误提示，则将_tempErr置为null
      if (
        err &&
        err.message === this._errorMessage.timeout &&
        !this._curData.isShowNetErr
      ) {
        this._tempErr = null;
      } else {
        this._tempErr = err; // 记录错误
      }

      throw err; // 然后将错误继续抛出去
    } finally {
      this._finalHandle();
      if (this._tempErr) {
        // 弱提示错误，然后将错误置为null
        Message({
          type: 'error',
          message: this._tempErr.message
        });

        this._tempErr = null;
      }
    }
  }

  private _showMask() {
    if (this._curData.showLoading) {
      this._requestCount += 1;
    }
    if (this._requestCount > 0) {
      this._loading = Loading.service({
        lock: true,
        text: this._curData.loadingText,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
  }

  private _hideMask() {
    if (this._curData.showLoading) {
      this._requestCount -= 1;
    }
    if (this._requestCount <= 0) {
      this._requestCount = 0;
      this._loading.close();
    }
  }

  /**
   * 预处理
   * @param param0
   */
  private _preHandle({
    url,
    requestParams,
    method,
    showLoading,
    headers,
  }: {
    [propName: string]: any;
  }) {
    this._curData.url = '/iams_serve'+url;
    this._curData.requestParams = requestParams;
    this._curData.method = method;
    this._curData.showLoading = showLoading;
    this._curData.headers = headers;
    this._curData.timeout = this._interfaceConfig.default.timeout;
    this._curData.loadingText = '正在加载中...';
    this._curData.isNeedCors = this._interfaceConfig.default.isNeedCors;
    this._curData.isResolveError = this._interfaceConfig.default.isResolveError;
    this._curData.isShowNetErr = this._interfaceConfig.default.isShowNetErr;

    // 根据配置文件重写部分参数 start
    const customConfig: any = this._interfaceConfig[url];
    if (customConfig) {
      for (let key in customConfig) {
        if (customConfig.hasOwnProperty(key)) {
          if (_.isObject(this._curData[key]) && _.isObject(customConfig[key])) {
            this._curData[customConfig[key]] = {
              ...this._curData[customConfig[key]],
              ...customConfig[key],
            };
          } else {
            this._curData[key] = customConfig[key];
          }
        }
      }
    }
    // 根据配置文件重写部分参数 end
    this._showMask(); // 打开遮罩
  }

  // 请求
  private async _handleRequest() {
    let params: any = {
      url: this._curData.url,
      method: this._curData.method,
      headers: this._curData.headers,
      data: this._curData.requestParams,
    };

    const fetchPromise = axios(params);

    const response = await timeout(this._curData.timeout, this._errorMessage.timeout)(fetchPromise)
    try {
      return response;
    } catch (err) {
      throw err;
    }
  }

  public handleResponse(responseData: any) {
    console.log('handleResponse====11:', responseData)

    if (!responseData || !responseData.data) {
      return Promise.reject(new Error(this._errorMessage.error));
    }

    const serverData = responseData.data;

    // TODO 待联调
    if (serverData.success || serverData.code === '0') {
      return Promise.resolve(serverData.data);
    } else if (this._curData.isResolveError) {
      return Promise.resolve({
        errCode: '',
        errMsg: serverData.message,
      });
    } else {
      return Promise.reject(new Error(serverData.message));
    }
  }

  // 收尾处理
  private _finalHandle() {
    this._hideMask(); // 关闭遮罩
  }
}

const http = new HttpUtil({
  interfaceConfig: apiConfig,
});

export default http
