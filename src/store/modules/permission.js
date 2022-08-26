export default {
  namespaced: true,
  state: {
    permission: ''
  },
  mutations: {
    // 初始化token
    initPermission(state) {
      state.permission = localStorage.getItem('Permission') || ''
    },
    // 保存token
    savePermission(state, { permission }) {
      state.permission = permission
      localStorage.setItem('Permission', permission)
      console.log(permission)
    }
    // 删除token
    // removeToken(state) {
    //   state.token = ''
    //   localStorage.removeItem('TOKEN')
    // }
  }
}
