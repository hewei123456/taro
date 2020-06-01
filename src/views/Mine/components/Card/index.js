import Taro, { PureComponent } from '@tarojs/taro';
import { OpenData, View } from '@tarojs/components';
import { AtAvatar } from 'taro-ui';
import { navigateToBinding } from '@utils/router';

import './index.scss';

export default class Card extends PureComponent {

  render() {
    return (
      <View className='user-card'>
        <View className='user-info'>
          <View className='user-nickname'>
            <OpenData className='name' type='userNickName' lang='zh_CN'/>
          </View>
          <View className='user-phone' onClick={() => {
            navigateToBinding();
          }}>
            13439093625
          </View>
        </View>
        <View className='user-avatar'>
          <AtAvatar size='large' circle openData={{ type: 'userAvatarUrl' }}/>
        </View>
      </View>
    );
  };
}

