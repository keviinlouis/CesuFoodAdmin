import Login from '@/components/Auth/Login'
import DashBoard from '@/components/Dashboard'
import Produtos from '@/components/Produtos'
import Funcionarios from '@/components/Funcionarios'
import BasePage from '@/components/BasePage'

export default [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      auth: false
    }
  },
  {
    path: '/',
    component: BasePage,
    children: [
      {
        path: '',
        component: DashBoard,
        name: 'dashboard',
        meta: {
          auth: true
        }
      },
      {
        path: 'produtos',
        component: Produtos,
        name: 'produtos',
        meta: {
          auth: true
        }
      },
      {
        path: 'funcionarios',
        component: Funcionarios,
        name: 'funcionarios',
        meta: {
          auth: true
        }
      }
    ],
    meta: {
      auth: true
    }
  }
]
