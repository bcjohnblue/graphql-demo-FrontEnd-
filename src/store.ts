import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userId: '',
    token: ''
  },
  getters: {
    userId: state => {
      if (state.userId) return state.userId;

      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      return userInfo.userId;
    },
    token: state => {
      if (state.token) return state.token;

      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      return userInfo.token;
    }
  },
  mutations: {
    SAVE_USERINFO(state, userInfo) {
      const { userId, token } = userInfo;
      state.userId = userId;
      state.token = token;

      localStorage.removeItem('userInfo');
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    LOGOUT(state) {
      localStorage.removeItem('userInfo');
      state.userId = '';
      state.token = '';

      router.push({ name: 'login' });
    }
  },
  actions: {
    saveUserInfo({ commit }, userInfo) {
      commit('SAVE_USERINFO', userInfo);
    },
    logout({ commit }) {
      commit('LOGOUT');
    }
  }
});
