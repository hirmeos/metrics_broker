import { getWorkTypes } from '../services/api';

export default {
  namespace: 'workType',

  state: {
    workType: []
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(getWorkTypes, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : []
      });
    }
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        workType: action.payload
      };
    }
  }
};
