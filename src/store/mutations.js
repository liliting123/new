export default {
  savePermissionMap(state, { permissionMap }) {
    // 储存权限表
    state.permissionMap = permissionMap
  },
  switchPermissionMapFilterStatus(state, { status }) {
    // 切换权限表过滤状态
    state.isPermissionFilter = status
  },
  switchLang(state, { lang }) {
    // 切换当前语言
    state.lang = lang
  },
  initLang(state) {
    if (localStorage.getItem('myLanguage')) {
      state.lang = localStorage.getItem('myLanguage')
    }
  },
  switchBtnLoading(state, { status }) {
    // 切换按钮loading状态
    state.btn_loading = status
  },
  getSystemStatus(state, { res }) {
    state.systemStatus = res
  },
  switchSearchFlag(state, { res }) {
    state.search_flag = res
  },
  switchSiderFlag(state, { res }) {
    state.sider_show_flag = res
  }
}
