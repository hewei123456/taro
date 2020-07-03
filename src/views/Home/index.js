import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtSearchBar, AtTabs, AtFab } from 'taro-ui'
import { Card, Layout } from '@/components'

import { connect } from '@tarojs/redux'
import { addItem, deleteItem } from '@/store/reducers/todo'

import './index.scss'

let timeoutid, id = 0

@connect(({ todo }) => ({
  list: todo.list
}), dispatch => ({
  addItem (item) {
    dispatch(addItem(item))
  },
  deleteItem (index) {
    dispatch(deleteItem(index))
  }
}))
export default class Index extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      keywords: '',
      current: 0,
      loading: false,
      showToTop: false
    }
  }

  static config = {
    navigationBarTitleText: '首页'
  }

  static options = {
    addGlobalClass: true
  }

  get tabList () {
    return [{ title: '精选' },
      { title: '寒假' },
      { title: '冲刺' },
      { title: '复试' },
      { title: '在职考研' },
      { title: 'VIP课程' },
      { title: '专业课课程' }
    ]
  }

  onPageScroll = ({ scrollTop }) => {
    if (timeoutid)
      clearTimeout(timeoutid)

    timeoutid = setTimeout(() => {
      this.setState(state => ({ showToTop: scrollTop > 100 }))
    }, 100)
  }

  scrollToTop = () => {
    Taro.pageScrollTo({
      scrollTop: 0
    })
  }

  changeLoading = loading => {
    this.setState(state => ({ loading }))
  }

  changeCurrent = current => {
    this.scrollToTop()
    this.setState(state => ({
      current
    }))
  }

  fetchData = () => {
    this.scrollToTop()
    this.changeLoading(true)
    setTimeout(() => {
      this.changeLoading(false)
    }, 5000)
  }

  render () {
    const list = this.props.list.toJS()
    const { deleteItem, addItem } = this.props
    const { loading, keywords, current } = this.state

    return (
      <Layout loading={loading}>
        <View className="home-page">
          {
            this.state.showToTop ?
              <View className="to-top">
                <AtFab
                  onClick={this.scrollToTop}
                  size="small"
                >
                  <Text className="at-fab__icon at-icon at-icon-chevron-up" />
                </AtFab>
              </View> : null
          }
          <View className="add-item">
            <AtFab
              onClick={() => {
                id++
                addItem({ id, title: `title ${id}` })
              }}
              size="small"
            >
              <Text className="at-fab__icon at-icon at-icon-add" />
            </AtFab>
          </View>

          <View className="mounting">
            <AtSearchBar
              onActionClick={() => {
                this.fetchData()
              }}
              onChange={keywords => {
                this.setState(state => ({ keywords }))
              }}
              onClear={() => {
                this.setState(state => ({ keywords: '' }))
                this.fetchData()
              }}
              onConfirm={() => {
                this.fetchData()
              }}
              value={keywords}
            />
            <AtTabs
              current={current}
              onClick={this.changeCurrent}
              scroll
              tabList={Index.tabList}
            />
          </View>

          <View className="card-list clearfix">
            {
              list.map((item, index) => (
                <View
                  key={item.id}
                  className="card-item"
                >
                  <Card i
                    mage={item.image}
                    onClick={() => {
                          deleteItem(index)
                        }}
                    price={item.price}
                    title={item.title}
                  />
                </View>
              ))
            }
          </View>
        </View>
      </Layout>
    )
  }
}
