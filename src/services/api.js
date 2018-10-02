import { stringify } from 'qs';
import request from '@/utils/request';

export async function getWorks(params) {
  return request(`${REACT_APP_URI_API}/works?${stringify(params)}`);
}

export async function login(params) {
  return request(`${REACT_APP_URI_API}/auth`, {
    method: 'POST',
    body: params
  });
}

export async function getWorkTypes(params) {
  return request(`${REACT_APP_URI_API}/work_types?${stringify(params)}`);
}

export async function addWork(params) {
  return request(`${REACT_APP_URI_API}/works`, {
    method: 'POST',
    body: params
  });
}

export async function editWork(params) {
  return request(`${REACT_APP_URI_API}/works`, {
    method: 'PUT',
    body: params
  });
}

export async function driverData() {
  return request(`${REACT_APP_DRIVER_API}/drivers`);
}

export async function queryCurrent(params) {
  return request(`${REACT_APP_DRIVER_API}/auth?${stringify(params)}`);
}
