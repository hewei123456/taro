import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';

import { Provider } from '@tarojs/redux';
import { PersistGate } from 'redux-persist/integration/react';
import configStore from '@store';

import './style/custom-variables.scss';
import './style/iconfont/iconfont.css';
import './app.scss';

const { store, persistor } = configStore();

class App extends Component {
  config = {
    pages: [
      'views/Home/index',
      'views/Mine/index',
    ],
    window: {
      'navigationBarTextStyle': 'black',
      'navigationBarBackgroundColor': '#ffffff',
    },
    tabBar: {
      color: '#aaa',
      borderStyle: 'white',
      selectedColor: '#6190e8',
      list: [
        {
          pagePath: 'views/Home/index',
          text: '首页',
          iconPath: 'static/images/tab/home.png',
          selectedIconPath: 'static/images/tab/home_h.png',
        },
        {
          pagePath: 'views/Mine/index',
          text: '我的',
          iconPath: 'static/images/tab/mine.png',
          selectedIconPath: 'static/images/tab/mine_h.png',
        },
      ],
    },
  };

  store = store;

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Index/>
        </PersistGate>
      </Provider>
    );
  }
}

Taro.render(<App/>, document.getElementById('app'));
