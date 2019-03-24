export default {
  method: 'post',
  baseURL: process.env.VUE_APP_BASE_URL_API,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // headers: {
  //   'Content-Type': 'multipart/form-data'
  // },
  // data: {},
  timeout: 10000,
  withCredentials: false,
  responseType: 'json'
};
