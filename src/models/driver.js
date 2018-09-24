import { driverData } from '../services/api';

export default {
  namespace: 'driver',

  state: {
    driver: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(driverData);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data: [],
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        driver: action.payload,
      };
    },
    clear() {
      return {
        driver: [],
      };
    },
  },
};
