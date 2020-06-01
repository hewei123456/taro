import Taro, { PureComponent } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import Card from './components/Card';
import { order, order_wait, person } from '@static';
import { navigateToInfo, navigateToOrder } from '@utils/router';

import './index.scss';

class Mine extends PureComponent {
  config = {
    navigationBarTitleText: '我的',
  };

  render() {
    return (
      <View className='wrapper'>
        <Card/>

        <AtList hasBorder={false}>
          <AtListItem
            title='个人信息'
            arrow='right'
            thumb={person}
          />
          <AtListItem
            title='已完成订单'
            arrow='right'
            thumb={order}
          />
          <AtListItem
            title='待收货订单'
            arrow='right'
            thumb={order_wait}
          />
        </AtList>
      </View>
    );
  }
}

export default Mine;
