import dayjs from 'dayjs';
export * from './const';
export * from './sms';

export const getImageUrl = name => {
  return new URL(`../assets/img/${name}`, import.meta.url).href;
};

export function assert(condition, msg) {
  if (!condition) throw new Error(`[Apior] ${msg}`);
}

export function formatTime(time, type = 'YYYY-MM-DD HH:mm:ss') {
  if (!time) {
    return dayjs().format(type);
  }
  return dayjs(time).format(type);
}
//格式化身份证
// export const forMatIDcard = value => {
//   if (value.length >= 8 && /^\w\d+$/.test(value)) {
//     var prefix = value[0];
//     var number = value.slice(1, 7);
//     var suffix = '(' + value[7] + ')';
//     return prefix + number + suffix;
//   } else {
//     return false;
//   }
// };
/**
 * 拿缓存数据
 * @param {String} key
 */
export function getStorage(key) {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return '';
}

/**
 * 设置缓存数据
 * @param {String} key
 * @param {all} val
 */
export function setStorage(key, val) {
  return localStorage.setItem(key, JSON.stringify(val));
}
/**
 * 移除缓存数据
 * @param {String} key
 */
export function removeStorage(key) {
  return localStorage.removeItem(key);
}
