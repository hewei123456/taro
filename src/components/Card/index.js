import Taro from '@tarojs/taro';
import { View, Image } from '@tarojs/components';

import './index.scss';

const Card = props => {
  return (
    <View className='card-wrapper' onClick={() => {
      props.onClick();
    }}>
      <View className='card'>
        <View>
          <Image className='card-image' src={props.image}/>
        </View>
        <View className='card-content'>
          <View className='card-content-top'>
            <Text className='card-title'>
              {props.title}
            </Text>

            <Text className='card-price'>
              ￥{props.price}
            </Text>
          </View>

          <Text className='card-brief'>
            {props.brief}
          </Text>
        </View>
      </View>
    </View>
  );
};

Card.defaultProps = {
  title: 'title',
  image: 'http://kaoyan-project.oss-cn-zhangjiakou.aliyuncs.com/police/1589356383353.png',
  price: 500,
  brief: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A alias amet fugiat minima nihil odit rem rerum. Obcaecati quaerat, rerum. Cupiditate dicta libero nesciunt, omnis perferendis porro praesentium sit sunt ? ',
};

export default Card;
