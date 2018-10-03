import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { addWork, editWork, getWorks } from '../services/api';

export default {
  namespace: 'publication',

  state: {
    publication: []
  },

  effects: {
    *submitAddForm({ payload }, { call, put }) {
      const response = yield call(addWork, payload);
      if (response !== undefined && response.status === 'ok') {
        message.success('Publication saved successfully.');
        yield put(routerRedux.replace('/publications/list'));
      }
    },
    *submitEditForm({ payload }, { call, put }) {
      const response = yield call(editWork, payload);
      if (response !== undefined && response.status === 'ok') {
        message.success('Publication saved successfully.');
        yield put(routerRedux.replace('/publications/list'));
      }
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(getWorks, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data)
          ? response.data.length === 1
            ? response.data[0]
            : response.data
          : []
      });
    }
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        publication: action.payload
      };
    },
    clear() {
      return {
        publication: []
      };
    }
  }
};
