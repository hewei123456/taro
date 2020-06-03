const config = {};

module.exports = Object.assign({}, config, process.env.TARO_ENV === 'swan' ? require('./swan') : require('./weapp'));
