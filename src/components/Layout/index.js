import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';

import './index.scss';

const Layout = props => (
  <View>
    {
      props.loading ?
        (<View class="indicator-mask">
          <AtActivityIndicator mode='center'/>
        </View>) : null
    }

    {props.children}
  </View>
);

Layout.defaultProps = {
  loading: false,
};

export default Layout;
