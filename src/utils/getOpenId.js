import Taro from '@tarojs/taro';
import { getQuery } from '.';

const fetchOpenId = async js_code => {
  try {
    const url = getQuery(
      'https://api.weixin.qq.com/sns/jscode2session',
      {
        appid: 'wxa021bd3125f509ec',
        secret: 'c8205dcd765c643455aaabf4eab8b396',
        js_code,
        grant_type: 'authorization_code',
      });
    let response = await Taro.request({ url, header: { 'content-type': 'application/json' } });
    console.log(response);
    if (response.statusCode === 200)
      return response.data.openid;
    else
      return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default async () => {
  if (!Taro.getStorageSync('openid')) {
    const response = await Taro.login();
    const openid = await fetchOpenId(response.code);
    Taro.setStorageSync('openid', openid);
  }
  return Taro.getStorageSync('openid');
};
