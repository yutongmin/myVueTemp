import { Store } from 'vuex';
import _ from 'lodash';

/**
 * 方便拿到store
 * 当有些数据很通用，又在store里很深层存储的时候，可以放到这里处理
 */
class StoreMgr {
  private _store!: Store<any>;

  init(store: Store<any>) {
    this._store = store;
  }

  get store() {
    if (!this._store) {
      console.warn('storeMgr store is empty');
    }
    return this._store;
  }

  get storeState() {
    return this._store.state;
  }
}

const storeMgr = new StoreMgr();

export default storeMgr;
