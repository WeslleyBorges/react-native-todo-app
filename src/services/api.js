import axios from 'axios';
import {getToken} from './auth';
import {REACT_APP_BASE_URL} from '../env';

const token = getToken();

const api = axios.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
});

export default api;
