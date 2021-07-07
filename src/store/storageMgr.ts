import _ from 'lodash';

class StorageMgr {
  static REDIRECT_PARAMS = 'REDIRECT_PARAMS';

  private _sessionStorage: any = window.sessionStorage;

  private _localStorage: any = window.localStorage;

  get redirectParams() {
    const paramsStr: any = this._sessionStorage[StorageMgr.REDIRECT_PARAMS];
    this._sessionStorage.removeItem(StorageMgr.REDIRECT_PARAMS);
    return _.isString(paramsStr) ? JSON.parse(paramsStr) : undefined;
  }

  set redirectParams(param: any) {
    this._sessionStorage[StorageMgr.REDIRECT_PARAMS] = JSON.stringify(param);
  }
}

const storageMgr: StorageMgr = new StorageMgr();
export default storageMgr;
