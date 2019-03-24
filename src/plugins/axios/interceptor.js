import store from '@/store';
import axios from 'axios';
import config from './config';

const instance = axios.create(config);

instance.interceptors.request.use(reqConfig => {
  // const token = store.getters.getUserInfo('token');
  // reqConfig.headers['Authorization'] = token;
  // console.log(reqConfig);
  return reqConfig;
});

instance.interceptors.response.use(
  res => {
    // Do something with response data
    console.log(res);
    return res.data;
  },
  err => {
    // err.config
    // err.request
    // err.response
    // for (let key in err) {
    //   console.log(err[key])
    // }

    // Do something with response error

    if (err && err.response) {
      switch (err.response.status) {
        //     case 400:
        //       err.message = '請求錯誤';
        //       break;
        case 401:
          err.message = '未經過認證，請重新登入';
          store.dispatch('logout');
          break;
          //     case 403:
          //       err.message = '無訪問權限';
          //       break;
          //     case 404:
          //       err.message = "請求網路位置無效";
          //       break;
          //     case 405:
          //       err.message = '請求方法不被允許';
          //       break;
          //     case 408:
          //       err.message = '請求超時';
          //       break;
          //     case 414:
          //       err.message = '請求URI長度超過限制';
          //       break;
          //     case 421:
          //       err.message = '伺服器無法產生回應';
          //       break;
          //     case 500:
          //       err.message = '伺服器內部錯誤';
          //       break;
          //     case 501:
          //       err.message = '伺服器無法支援回應請求';
          //       break;
          //     case 502:
          //       err.message = '網路錯誤';
          //       break;
          //     case 503:
          //       err.message = '伺服器過載或維護中，請稍後訪問';
          //       break;
          //     case 504:
          //       err.message = '網路閘道回應超時';
          //       break;
          //     case 505:
          //       err.message = 'HTTP版本不受支持';
          //       break;
          //     default:
          //       err.message = '不明錯誤';
          //       break;
      }
    }
    console.log(err);

    if (err.response && err.response.data && err.response.data.ErrorMessage) {
      return Promise.reject(err.response.data.ErrorMessage.Description);
    } else {
      return Promise.reject(err);
    }
  }
);

export default instance;