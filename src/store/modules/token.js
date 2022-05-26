export default {
  namespaced: true,
  state: {
    token: ''
  },
  mutations: {
    // 初始化token
    initToken(state) {
      state.token = localStorage.getItem('TOKEN') || ''
    },
    // 保存token
    saveToken(state, { token, keep }) {
      state.token = token
      localStorage.setItem('TOKEN', token)
    },
    // 删除token
    removeToken(state) {
      state.token = ''
      localStorage.removeItem('TOKEN')
    }
  }
}
