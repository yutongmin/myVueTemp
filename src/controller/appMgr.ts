import Vue from 'vue';
import _ from 'lodash';
import filters from '@/controller/filters';
import { apiConfig } from '@/constants/apiConstants';
import { isLocalEnv } from '@/utils/env';
import router from '../router';
// import devData, { localSurveyData } from './devData';
import storeMgr from "@/store/storeMgr";
import {defaultEncrypt} from "@/controller/secret";

const appBeforeInit = () => {
  // TODO 加载过渡页

  // 加载过滤器
  Object.keys(filters).forEach((key: string) => {
    Vue.filter(key, filters[key]);
  });
};

const appInitialized = async () => {
  // TODO
  let skToken = '';
  let sksession = '';
  let unitCode = '';
  let userCode = '';
  let branchComCode = '';
  // if (isLocalEnv) {
  //   skToken = devData.skToken;
  //   sksession = devData.sksession;
  //   userCode = devData.userCode;
  //   unitCode = devData.unitCode;
  //   branchComCode = devData.branchComCode || '';
  // }

  let appInitActionParams = {
    skToken, // token
    sksession, // 唯一标识
    unitCode, // 分公司编码
    userCode, // 用户工号
    appCode: '', // App标识
  };
  let userInfo = {
    branchComCode,
    userCode,
    unitCode,
  };
 
  apiConfig.default.headers = {
    ...apiConfig.default.headers,
    ...appInitActionParams,
  };

};

const appMgr = {
  appBeforeInit,
  appInitialized,
};

export default appMgr;
