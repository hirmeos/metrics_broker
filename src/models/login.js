import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login } from '@/services/api';
import { setName, setSurname, setToken, setAuthority } from '@/utils/user';
import { reloadAuthorized } from '@/utils/Authorized';
import { getPageQuery } from '@/utils/utils';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response !== undefined && response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
      return;
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          data: [{
            status: false,
            currentAuthority: 'guest',
        }]},
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const data = payload.data[0];
      const name = data.name;
      const surname = data.surname;
      const token = data.token;
      const authority = data.authority;

      setName(name);
      setSurname(surname);
      setToken(token);
      setAuthority(authority);

      return {
        ...state,
        status: authority,
      };
    },
  },
};
