/** @format */

import axios from 'axios';

import { requestSuccessFunc, requestFailFunc, responseSuccessFunc, responseFailFunc } from './intercept';
import { AXIOS_DEFAULT_CONFIG } from './config';

let axiosInstance = {};
axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG);

// 注入请求拦截
axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc);

// 注入返回拦截
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc);

export default axiosInstance;
