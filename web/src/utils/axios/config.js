/** @format */
// console.log('process', process.env);
// axios 默认配置
export const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  maxContentLength: 20000000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'request-type': 'security',
  },
  baseURL: import.meta.env.PROD ? 'https://jspro.rovertech.com.hk/api' : '/api',
  // baseURL: 'https://securityapi.acb.bet',
  //   baseURL: '/api'
};

// API 默认配置
export const API_DEFAULT_CONFIG = {
  // mockBaseURL: 'http://yapi.demo.qunar.com/mock/12982/flytest/v1', // mock地址
  mock: false, // 是否开启mock
  debug: false, // 是否开启debug模式
  sep: '/', // 接口调用分隔符
};
