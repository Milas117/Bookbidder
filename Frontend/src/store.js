import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      user: null 
    };
  },
  mutations: {
    setUser(state, userData) {
      state.user = userData; 
      console.log('User data:', userData);
      console.log('State after mutation:', state);
    }
  },
  actions: {
    updateUser({ commit }, userData) {
      commit('setUser', userData); 
    },
    initializeStore({ commit }) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        commit('setUser', user);
      }
    }
  },
  getters: {
    user(state) {
      console.log('state.user:', state.user);
      return state.user; 
    }
  }
});

export default store;
