import instance from './interceptor';

const apiList = {
  get(url, configs) {
    return instance({
      method: 'get',
      url,
      ...configs
    });
  },
  post(url, data, configs) {
    return instance({
      method: 'post',
      url,
      data,
      ...configs
    });
  },
  postFile(url, data, configs) {
    const config = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    const mixConfigs = Object.assign({}, config, configs);

    return instance({
      method: 'post',
      url,
      data,
      ...mixConfigs
    });
  },
  delete(url, data, configs) {
    return instance({
      method: 'delete',
      url,
      data,
      ...configs
    });
  }
};

export default apiList;
