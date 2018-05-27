import {NAME_TOKEN} from '@/config'
export default {
  authenticated (state) { return state.authenticated },
  user (state) { return state.user },
  getToken () { return localStorage.getItem(NAME_TOKEN) },
  isAdmin (state) { return state.user.is_master }
}
