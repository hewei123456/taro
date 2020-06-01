import Taro, { PureComponent } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtButton, AtForm, AtInput, AtMessage } from 'taro-ui';

import './index.scss';

const validatePhone = phone => /^[1][3,4,5,7,8][0-9]{9}$/.test(phone);
const validateCode = code => /^[0-9]{4}$/.test(code);

let timer, seconds = 60;

export default class Index extends PureComponent {
  config = {
    navigationBarTitleText: '绑定手机',
  };

  static options = {
    addGlobalClass: true,
  };

  state = {
    phone: '',
    code: '',
    seconds,
    showSeconds: false,
  };

  get bindable() {
    return validateCode(this.state.code) && validatePhone(this.state.phone);
  }

  setTimer = () => {
    this.setState(prev => ({ showSeconds: true }));
    timer = setInterval(() => {
      this.setState(prev => ({ seconds: prev.seconds - 1 }), () => {
        if (this.state.seconds === 0)
          this.clearTimer();
      });
    }, 1000);
  };

  clearTimer = () => {
    this.setState(prev => ({ seconds, showSeconds: false }));
    clearTimeout(timer);
    timer = null;
    console.log(timer);
  };

  componentDidHide() {
    this.clearTimer();
  }

  render() {
    return (
      <View>
        <AtMessage/>
        <View className='binding-page'>
          <View className='binding-content'>
            <View className='row-wrapper'>
              <View className='input-wrapper'>
                <AtInput
                  name='phone'
                  border={false}
                  type='text'
                  placeholder='手机号码'
                  value={this.state.phone}
                  onChange={phone => {
                    this.setState(prevState => ({ phone }));
                  }}
                  onBlur={() => {
                    if (!validatePhone(this.state.phone))
                      Taro.atMessage({
                        'message': '手机号码格式不正确',
                        'type': 'error',
                        'duration': 500,
                      });
                  }}
                />
              </View>
            </View>
            <View className='row-wrapper'>
              <View className='input-wrapper'>
                <AtInput
                  name='code'
                  type='text'
                  maxLength='4'
                  placeholder='验证码'
                  value={this.state.code}
                  onChange={code => {
                    this.setState(prevState => ({ code }));
                  }}
                  onBlur={() => {
                    if (!validateCode(this.state.code))
                      Taro.atMessage({
                        'message': '验证码格式不正确',
                        'type': 'error',
                        'duration': 500,
                      });
                  }}
                >
                  <AtButton
                    size='small'
                    type='primary'
                    disabled={!validatePhone(this.state.phone) || this.state.showSeconds}
                    onClick={() => {
                      Taro.showToast({
                        title: '验证码发送成功',
                        icon: 'none',
                        duration: 2000,
                      });
                      this.setTimer();
                    }}>
                    {this.state.showSeconds ? this.state.seconds + 's' : '获取验证码'}
                  </AtButton>
                </AtInput>
              </View>
            </View>

            <View className='at-row button-wrapper'>
              <View className='at-col'>
                <AtButton
                  disabled={!this.bindable}
                  type='primary'
                  onClick={() => {
                    Taro.navigateBack();
                  }}>绑 定</AtButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
