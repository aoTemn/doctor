export const data = [
  {
    title: '個人資料',
    con: [
      {
        label: '姓名',
        value: '陳大文',
        key: 'name',
      },
      {
        label: '身份證號碼',
        value: 'H093334(6)',
        key: 'hkid_no',
      },
      {
        label: '手提電話',
        value: '+852 5232 2323',
        key: 'phone_no',
      },
      {
        label: '出生日期',
        value: '12/02/1996',
        key: 'dob',
      },
      {
        label: '國家',
        value: '香港',
        key: '',
      },
      {
        label: '地區',
        value: '油尖旺',
        key: 'district',
      },
      {
        label: '城市',
        value: '尖沙咀',
        key: '',
      },
      {
        label: '住址1',
        value: '打鼓嶺道 23號',
        key: 'address',
      },

      {
        label: '住宅類型',
        value: '公屋',
        key: 'residence_type',
      },
      {
        label: '住宅電話',
        value: '+852 5232 2323',
        key: 'home_phone_no',
      },
      {
        label: '居住年期',
        value: '10',
        key: 'residence_length',
      },
    ],
  },
  {
    title: '工作資料',
    con: [
      {
        label: '公司名稱',
        value: 'JS Pro',
        key: 'company_name',
      },
      {
        label: '職位',
        value: '經理',
        key: 'position',
      },
      {
        label: '公司國家',
        value: '香港',
        key: '',
      },
      {
        label: '公司地區',
        value: '油尖旺',
        key: 'company_district',
      },
      {
        label: '公司城市',
        value: '尖沙咀',
        key: '',
      },
      {
        label: '公司地址',
        value: '打鼓嶺道 23號',
        key: 'company_address',
      },
      {
        label: '公司電話',
        value: '+852 5232 2323',
        key: 'company_phone_no',
      },
      {
        label: '在職年期',
        value: '10',
        key: '',
      },
      {
        label: '每月薪金',
        value: 'HK$15,000-20,000',
        key: 'company_monthly_salary',
      },
      {
        label: '出糧方式',
        value: '過數',
        key: 'company_salary_method',
      },
      {
        label: '每月出糧日',
        value: '31',
        key: 'company_payment_day',
      },
    ],
  },
  {
    title: '強積金資料',
    key: 'mpf',
    con: [
      {
        label: '有否提取',
        value: 'mpf_coverage',
        key: 'mpf_coverage',
        option: [
          {
            key: '0',
            label: '未提取',
          },
          {
            key: '1',
            label: '有提取',
          },
        ],
      },
      {
        label: '強積金保存信託公司名稱',
        value: 'mpf_company',
        key: 'mpf_company',
      },
    ],
  },
  {
    title: '同住人資料',
    key: 'residentfamily',
    con: [
      {
        label: '姓名',
        value: '陳大文',
        key: 'resident_family_name',
      },
      {
        label: '關係',
        value: '夫妻',
        key: 'resident_family_relationship',
      },
      {
        label: '年齡',
        value: '31',
        key: 'resident_family_age',
      },
      {
        label: '手提電話',
        value: '+852 5232 2323',
        key: 'resident_family_work_phone_no',
      },
      {
        label: '工作國家',
        value: '香港',
        key: '',
      },
      {
        label: '工作地區',
        value: '油尖旺',
        key: 'resident_family_work_district',
      },
      {
        label: '工作城市',
        value: '尖沙咀',
        key: '',
      },
      {
        label: '工作地址',
        value: '打鼓嶺道 23號',
        key: 'resident_family_work_address',
      },
      {
        label: '公司電話',
        value: '+852 5232 2323',
        key: 'resident_family_work_phone_no',
      },
    ],
  },
  {
    title: '非同住咨詢人資料',
    key: 'nonresidentfamily',
    con: [
      {
        label: '姓名',
        value: '陳大文',
        key: 'non_resident_family_name',
      },
      {
        label: '關係',
        value: '夫妻',
        key: 'non_resident_family_relationship',
      },
      {
        label: '年齡',
        value: '31',
        key: 'non_resident_family_age',
      },
      {
        label: '手提電話',
        value: '+852 5232 2323',
        key: 'non_resident_family_phone_no',
      },
      {
        label: '工作國家',
        value: '香港',
        key: '',
      },
      {
        label: '工作地區',
        value: '油尖旺',
        key: 'non_resident_family_work_district',
      },
      {
        label: '工作城市',
        value: '尖沙咀',
        key: '',
      },
      {
        label: '工作地址',
        value: '打鼓嶺道 23號',
        key: 'non_resident_family_work_address',
      },
      {
        label: '公司電話',
        value: '+852 5232 2323',
        key: 'non_resident_family_work_phone_no',
      },
    ],
  },
  {
    title: '證明文件',
    con: [
      {
        label: '身份證',
        value: '身份證.jpg',
        key: 'upload_hkid',
        btn: '下载',
      },
      {
        label: '自拍摣住身份證',
        value: '自拍摣住身份證.jpg',
        key: 'upload_photo_hkid',
        btn: '下载',
      },
      {
        label: '銀行卡',
        value: '銀行卡.jpg',
        key: 'upload_bank_card',
        btn: '下载',
      },
      {
        label: '住址證明',
        value: '住址證明.pdf',
        key: 'upload_address_proof',
        btn: '下载',
      },
      {
        label: '供款紀錄',
        value: '供款紀錄.pdf',
        key: 'upload_mpf',
        btn: '下载',
      },
      {
        label: '入息證明',
        value: '-',
        key: 'upload_income_proof',
        btn: '下载',
      },
    ],
  },
];
