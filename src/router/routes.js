import Login from '@/components/Auth/Login'
import DashBoard from '@/components/Dashboard'
import BasePage from '@/components/BasePage'

export default [
  {
    path: '/login',
    components: {
      base: Login
    },
    meta: {
      auth: false
    }
  },
  {
    path: '/dashboard',
    components: {
      base: BasePage,
      default: DashBoard
    },
    meta: {
      auth: true
    }
  }
]
