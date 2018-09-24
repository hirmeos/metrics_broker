export function getName() {
  return localStorage.getItem('metrics-broker-name') || '';
}

export function setName(name) {
  return localStorage.setItem('metrics-broker-name', name);
}

export function getSurname() {
  return localStorage.getItem('metrics-broker-surname') || '';
}

export function setSurname(surname) {
  return localStorage.setItem('metrics-broker-surname', surname);
}

export function getToken() {
  return localStorage.getItem('metrics-broker-token') || '';
}

export function setToken(token) {
  return localStorage.setItem('metrics-broker-token', token);
}

export function getAuthority() {
  return localStorage.getItem('metrics-broker-authority') || 'guest';
}

export function setAuthority(authority) {
  return localStorage.setItem('metrics-broker-authority', authority);
}

