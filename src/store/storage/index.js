import weappStorage from 'redux-persist-weapp-storage/lib/bundle';
import swanStorage from './swan';

export default process.env.TARO_ENV === 'swan' ? swanStorage : weappStorage;
