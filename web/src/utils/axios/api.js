/** @format */

import _assign from 'lodash/assign';
import _merge from 'lodash/merge';

import _isArray from 'lodash/isArray';
import axios from './axios';
import API_CONFIG from '@/api';
import { assert } from '@/utils';
import { AXIOS_DEFAULT_CONFIG, API_DEFAULT_CONFIG } from './config';

/**
 * 生成api接口类
 */
class Api {
  constructor(options) {
    this.api = {};
    this.apiBuilder(options);
  }

  /**
   * 创建工程接口
   * @param sep 分隔符
   * @param config 接口配置对象
   * @param mock 是否开启mock
   * @param debug 是否开启debug模式
   * @param mockBaseURL mock接口地址
   */
  apiBuilder({ sep = '/', config = {}, mock = false, debug = false, mockBaseURL = '' }) {
    Object.keys(config).forEach(namespace => {
      this._apiSingleBuilder({
        namespace,
        mock,
        mockBaseURL,
        sep,
        debug,
        config: config[namespace],
      });
    });
  }

  /**
   * 创建单个接口
   * @param sep 分隔符
   * @param config 接口配置对象
   * @param mock 是否开启mock
   * @param debug 是否开启debug模式
   * @param mockBaseURL mock接口地址
   */
  _apiSingleBuilder({ namespace, sep = '/', config = {}, mock = false, debug = false, mockBaseURL = '' }) {
    config.forEach(api => {
      const { name, desc, params, method, path, cache = true, headers, baseUrl } = api;
      const apiname = `${namespace}${sep}${name}`; // 接口调用名称 this.$api['apiname']()
      const url = path; // 接口地址
      const baseURL = baseUrl || AXIOS_DEFAULT_CONFIG.baseURL; // 接口base地址

      // // 首页文章api
      // let articleApiList = ['selectHomeList', 'selectHotLabel', 'insetCollection', 'selectArticleDownLoad', 'insetInspire', 'insetComment'];
      // // 根据接口判断端口
      // if (articleApiList.includes(name)) {
      //     baseURL = 'http://121.196.189.114:8020';
      // } else {
      //     baseURL = 'http://121.196.189.114:9000';
      // }

      debug && assert(name, `${url} :接口name属性不能为空`);
      debug && assert(url.indexOf('/') === 0, `${url} :接口路径path，首字符应为/`);

      Object.defineProperty(this.api, `${apiname}`, {
        value(outerParams, outerOptions) {
          // console.log(outerParams, outerOptions);
          // let _data = _isEmpty(outerParams) ? params : _pick(_assign({}, params, outerParams), Object.keys(params));
          // let _data;
          // _data =
          //   _isArray(outerParams) || outerParams instanceof FormData ? outerParams : _merge({}, params, outerParams);

          // /* 特殊页面，需要对数据做处理 */
          // if ((method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') && (!headers || !headers.hasOwnProperty('Content-Type'))) {
          //     _data = Qs.stringify(_data);
          // }

          return axios(
            _normoalize(
              _assign(
                {
                  name,
                  url,
                  desc,
                  baseURL,
                  method,
                  cache,
                  headers: headers || AXIOS_DEFAULT_CONFIG.headers,
                },
                outerOptions
              ),
              outerParams
            )
          );
        },
      });
    });
  }
}

/**
 * 根据请求类型处理axios参数
 * @param options
 * @param data
 * @returns {*}
 * @private
 */
function _normoalize(options, data) {
  console.log(data, 'dadada');

  // 处理IE下请求缓存
  if (!options.cache) {
    options.url = `${options.url}${options.url.includes('?') ? '&' : '?'}_=${new Date().getTime()}`;
  }

  if (options.method === 'POST' || options.method === 'PUT' || options.method === 'DELETE') {
    // options.data = data;
    if (data instanceof FormData) {
      console.log('isFormData');
      options.data = data;
    } else {
      options.data = { ...data };
    }

    // post 参数放请求头
    // if(options.desc == "注册" || options.desc == "登录" ) {
    //     options.params = Qs.parse(data);
    // }
  } else if (options.method === 'GET') {
    // options.params = data;
    options.params = { ...data };
  }
  return options;
}

/**
 * 导出接口
 */
export default new Api({
  config: API_CONFIG,
  ...API_DEFAULT_CONFIG,
}).api;
