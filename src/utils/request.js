import fetch from 'dva/fetch';
import { notification } from 'antd';
import { getToken } from './user';

function checkStatus(responseBody) {
  if (responseBody.code >= 200 && responseBody.code < 300) {
    return responseBody;
  }
  notification.error({
    message: responseBody.message,
    description: responseBody.description,
  });
  const error = new Error(responseBody.message);
  error.name = responseBody.code;
  error.response = responseBody;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  const token = getToken();
  if (token) {
    newOptions.headers = {
      'Authorization': `Bearer ${token}`,
      ...newOptions.headers,
    };
  }
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(response => {
      if (response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .then(checkStatus)
    .catch(e => {
      const status = e.name;
      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        window.g_app._store.dispatch({
          type: 'login/logout',
        });
        return;
      }
      return;
    });
}
