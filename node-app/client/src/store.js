import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const types = {
  // 是否认证通过
  SET_AUTHENTIVCATED: 'SET_AUTHENTIVCATED',
  //   用户信息
  SET_USER: 'SET_USER'
}
const state = {
  // 需要维护的认证状态信息
  isAuthenticated: false,
  // 需要维护的用户信息
  user: {}
}
const getters = {
  // 获取认证状态信息
  isAuthenticated: state => state.isAuthenticated,
  // 获取用户信息
  user: state => state.user
}
const mutations = {
  // 更新认证状态信息
  [types.SET_AUTHENTIVCATED] (state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated
    else state.isAuthenticated = false
  },
  // 更新用户信息
  [types.SET_USER] (state, user) {
    if (user) state.user = user
    else state.user = {}
  }
}
const actions = {
  setAuthenticated: ({
    commit
  }, isAuthenticated) => {
    commit(types.SET_AUTHENTIVCATED, isAuthenticated)
  },
  setUser: ({
    commit
  }, user) => {
    commit(types.SET_USER, user)
  },
  clearCurrentState: ({
    commit
  }) => {
    commit(types.SET_AUTHENTIVCATED, false)
    commit(types.SET_USER, null)
  }
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
