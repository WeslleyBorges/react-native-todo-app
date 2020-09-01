import api from '../services/api';
import {getToken, storeToken} from './auth';

const get = async (url) => {
  const token = getToken();
  return api.get(url, {headers: {Authorization: `Bearer ${token}`}});
};
const post = async (url, data) => {
  const token = getToken();
  return api.get(url, data, {headers: {Authorization: `Bearer ${token}`}});
};
const put = async (url, data) => {
  const token = getToken();
  return api.get(url, data, {headers: {Authorization: `Bearer ${token}`}});
};
const login = async (email, password) => {
  await api
    .post('signin', {email, password})
    .then(({data}) => storeToken(data.token));
};

export {get, post, put, login};
