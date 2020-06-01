import Taro, { PureComponent } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtSearchBar, AtTabs, AtFab } from 'taro-ui';
import { Card, Layout } from '@components';

import { connect } from '@tarojs/redux';
import { addItem, deleteItem } from '@store/reducers/app';

import './index.scss';

let timeoutid, id = 0;

@connect(({ app }) => ({
  list: app.list,
}), dispatch => ({
  addItem(item) {
    dispatch(addItem(item));
  },
  deleteItem(index) {
    dispatch(deleteItem(index));
  },
}))
export default class Index extends PureComponent {
  config = {
    navigationBarTitleText: '首页',
  };

  static options = {
    addGlobalClass: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      keywords: '',
      current: 0,
      loading: false,
      showToTop: false,
    };
  }

  static get tabList() {
    return [{ title: '精选' },
      { title: '寒假' },
      { title: '冲刺' },
      { title: '复试' },
      { title: '在职考研' },
      { title: 'VIP课程' },
      { title: '专业课课程' },
    ];
  }

  onPageScroll = ({ scrollTop }) => {
    if (timeoutid)
      clearTimeout(timeoutid);

    timeoutid = setTimeout(() => {
      this.setState(state => ({ showToTop: scrollTop > 100 }));
    }, 100);
  };

  scrollToTop = () => {
    Taro.pageScrollTo({
      scrollTop: 0,
    });
  };

  changeLoading = loading => {
    this.setState(state => ({ loading }));
  };

  changeCurrent = current => {
    this.scrollToTop();
    this.setState(state => ({
      current,
    }));
  };

  fetchData = () => {
    this.scrollToTop();
    this.changeLoading(true);
    setTimeout(() => {
      this.changeLoading(false);
    }, 5000);
  };

  render() {
    const list = this.props.list.toJS();
    const { deleteItem, addItem, regressionList } = this.props;
    const { loading, keywords, current } = this.state;

    return (
      <Layout loading={loading}>
        <View className='home-page'>
          {
            this.state.showToTop ?
              <View className='to-top'>
                <AtFab size='small' onClick={this.scrollToTop}>
                  <Text className='at-fab__icon at-icon at-icon-chevron-up'/>
                </AtFab>
              </View> : null
          }
          <View className='add-item'>
            <AtFab size='small' onClick={() => {
              id++;
              addItem({ id, title: `title ${id}` });
            }}>
              <Text className='at-fab__icon at-icon at-icon-add'/>
            </AtFab>
          </View>

          <View className='mounting'>
            <AtSearchBar
              value={keywords}
              onChange={keywords => {
                this.setState(state => ({ keywords }));
              }}
              onClear={() => {
                this.setState(state => ({ keywords: '' }));
                this.fetchData();
              }}
              onConfirm={() => {
                this.fetchData();
              }}
              onActionClick={() => {
                this.fetchData();
              }}
            />
            <AtTabs
              current={current}
              scroll
              tabList={Index.tabList}
              onClick={this.changeCurrent}/>
          </View>

          <View className='card-list clearfix'>
            {
              list.map((item, index) => (
                <View className='card-item' key={item.id}>
                  <Card title={item.title} image={item.image} price={item.price} onClick={() => {
                    deleteItem(index);
                  }}/>
                </View>
              ))
            }
          </View>
        </View>
      </Layout>
    );
  }
}
