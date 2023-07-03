export default [
  {
    name: 'countryCode',
    method: 'GET',
    desc: 'country code data',
    path: '/member/country-code',
  },
  {
    name: 'distric',
    method: 'GET',
    desc: 'distric',
    path: '/member/distric',
  },
  {
    name: 'residentType',
    method: 'GET',
    desc: '住宅类型',
    path: '/member/resident-types',
  },
  {
    name: 'version',
    method: 'GET',
    desc: '住宅类型',
    path: '/member/app-version',
  },
  {
    name: 'contact',
    method: 'POST',
    desc: '通讯录',
    path: '/member/applications/contact',
  },
  {
    name: 'location',
    method: 'POST',
    desc: '地址',
    path: '/member/applications/location',
  },
  {
    name: 'referral',
    method: 'POST',
    desc: '推荐',
    path: '/member/applications/referral',
  },
];
