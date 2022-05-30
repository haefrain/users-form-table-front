import ApiService from '@/utils/api.service'

ApiService.init();

// Actions
export const GET_USERS = "getUsers";
export const ADD_USER = "addUser";

// Mutations
export const SET_USERS = "setUsers";
export const SET_USER = "setUser";


const urlUsers = "https://reqres.in/api/users?page=1"
// initial state
const state = () => ({
  users: []
})

// getters
const getters = {
  users: (state) => {
    return state.users;
  }
}

// actions
const actions = {
  [GET_USERS](context) {
    return new Promise(resolve => {
      if (context.state.users.length <= 0) {
        ApiService.query(urlUsers).then(result => {
          context.commit(SET_USERS, result.data.data)
          resolve(result.data.data)
        });
      }

    })

  },
  [ADD_USER](context, data) {
    context.commit(SET_USER, data)
  }
}

// mutations
const mutations = {
  [SET_USERS](state, data) {
    state.users = [...data]
  },
  [SET_USER](state, data) {
    state.users.push(data)
    console.log(state.users)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
