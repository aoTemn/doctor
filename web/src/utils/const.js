export const accountStatusStragetyConst = {
  處理中: 'waiting',
  已批核: 'success',
  Unknown: 'Unknown',
};

export const relationOptions = [
  {
    value: '夫妻',
    text: '夫妻',
    label: '夫妻',
  },
  {
    value: '父子',
    text: '父子',
    label: '父子',
  },
  {
    value: '母子',
    text: '母子',
    label: '母子',
  },
  {
    value: '兄弟姐妹',
    text: '兄弟姐妹',
    label: '兄弟姐妹',
  },
  {
    value: '亲戚',
    text: '亲戚',
    label: '亲戚',
  },
  {
    value: '朋友',
    text: '朋友',
    label: '朋友',
  },
];

const areaConfig = [
  '中西區',
  '灣仔',
  '東區',
  '南區',
  '油尖旺',
  '深水埗',
  '九龍城',
  '黃大仙',
  '觀塘',
  '葵青',
  '中荃灣',
  '屯門',
  '元朗',
  '北區',
  '大埔',
  '沙田',
  '西貢',
  '離島',
];

export const areaOptions = areaConfig.map(item => ({
  value: item,
  text: item,
  label: item,
}));

export const typeOptions = [
  {
    value: '公屋',
    text: '公屋',
    label: '公屋',
  },
  {
    value: '居屋',
    text: '居屋',
    label: '居屋',
  },
  {
    value: '私人樓宇',
    text: '私人樓宇',
    label: '私人樓宇',
  },
];
export const paymentMethodOptions = [
  {
    value: '銀行轉帳',
    text: '銀行轉帳',
    label: '銀行轉帳',
  },
  {
    value: '支票',
    text: '支票',
    label: '支票',
  },
  {
    value: '現金',
    text: '現金',
    label: '現金',
  },
];
