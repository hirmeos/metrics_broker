import { queryCurrent } from '@/services/api';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {}
  },

  effects: {
    *fetchCurrent({ payload }, { call, put }) {
      const response = yield call(queryCurrent, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: Array.isArray(response.data) ? response.data[0] : []
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {}
      };
    }
  }
};
