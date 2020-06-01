import Taro from '@tarojs/taro';
import { getQuery } from '.';

export const pages = {
  home: '/views/Home/index',
  mine: '/views/Mine/index',
  binding: '/views/Binding/index',
};

const navigateTo = (url, params) => {
  url = getQuery(url, params);
  Taro.navigateTo({ url });
};

const redirectTo = (url, params) => {
  url = getQuery(url, params);
  Taro.redirectTo({ url });
};

const reLaunchTo = (url, params) => {
  url = getQuery(url, params);
  Taro.reLaunch({ url });
};

export const reLaunchToHome = () => reLaunchTo(pages.home);
export const navigateToBinding = () => navigateTo(pages.binding);
