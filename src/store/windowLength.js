export default {
  namespaced: true,

  state: () => ({
    display: 0,
  }),

  getters: '',

  mutations: {
    changeDisplay(state) {
      return state.display = window.innerWidth
    }
  },

  actions: {
    displayLength(context, payload) {
      context.state.display = window.innerWidth;
  
      return context.commit('changeDisplay')
    }
  },
}