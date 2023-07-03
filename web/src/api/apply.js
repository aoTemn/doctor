export default [
  {
    name: 'list',
    method: 'GET',
    desc: 'app数据',
    path: '/member/applications',
  },
  {
    name: 'detail',
    method: 'GET',
    desc: 'app数据',
    path: '/member/application/47',
  },
  {
    name: 'update',
    method: 'POST',
    desc: '申请app数据',
    path: '/member/applications/store',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
  {
    name: 'updateGuest',
    method: 'POST',
    desc: '申请app数据',
    path: '/member/applications/store/guest',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  },
];
