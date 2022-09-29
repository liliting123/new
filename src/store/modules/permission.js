export default {
  namespaced: true,
  state: {
    permission: ''
  },
  mutations: {
    // 初始化permission
    initPermission(state) {
      state.permission = localStorage.getItem('Permission') || ''
    },
    // 保存permission
    savePermission(state, { permission }) {
      state.permission = permission
      localStorage.setItem('Permission', permission)
      console.log(permission)
    },
    // 删除permission
    removePermission(state) {
      state.permission = ''
      localStorage.removeItem('Permission')
    }
  }
}
