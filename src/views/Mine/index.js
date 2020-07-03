import Taro, { PureComponent } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import Card from './components/Card'
import { order, order_wait, person } from '@static'

import './index.scss'

class Mine extends PureComponent {
  static config = {
    navigationBarTitleText: '我的'
  }

  static options = {
    addGlobalClass: true
  }

  render () {
    return (
      <View className="wrapper">
        <Card />

        <AtList hasBorder={false}>
          <AtListItem
            arrow="right"
            thumb={person}
            title="个人信息"
          />
          <AtListItem
            arrow="right"
            thumb={order}
            title="已完成订单"
          />
          <AtListItem
            arrow="right"
            thumb={order_wait}
            title="待收货订单"
          />
        </AtList>
      </View>
    )
  }
}

export default Mine
