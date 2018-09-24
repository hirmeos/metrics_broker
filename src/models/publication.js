import { getWorks } from '../services/api';

export default {
  namespace: 'publication',

  state: {
    publication: [],
  },

  effects: {
    *submitAddForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('Submitted successfully');
    },
    *fetch({ payload }, { call, put }) {
      const response = yield call(getWorks, payload);
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
        publication: action.payload,
      };
    },
  },
};
