import Taro, { PureComponent } from '@tarojs/taro'
import { OpenData, View } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'

import './index.scss'

export default class Card extends PureComponent {

  render () {
    return (
      <View className="user-card">
        <View className="user-info">
          <View className="user-nickname">
            <OpenData
              className="name"
              lang="zh_CN"
              type="userNickName"
            />
          </View>
          <View className="user-phone">
            13439093625
          </View>
        </View>
        <View className="user-avatar">
          <AtAvatar
            circle
            openData={{ type: 'userAvatarUrl' }}
            size="large"
          />
        </View>
      </View>
    )
  };
}

