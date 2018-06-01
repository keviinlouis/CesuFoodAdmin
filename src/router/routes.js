import Login from '@/components/Auth/Login'
import DashBoard from '@/components/Dashboard'
import Produtos from '@/components/Produtos'
import Produto from '@/components/Produto'
import Categorias from '@/components/Categorias'
import EntregarProduto from '@/components/EntregarProduto'
import Funcionarios from '@/components/Funcionarios'
import LerQrCode from '@/components/LerQrCode'
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
        path: '/',
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
        path: 'produto/:id?',
        component: Produto,
        name: 'produto',
        meta: {
          auth: true
        }
      },
      {
        path: 'categorias',
        component: Categorias,
        name: 'categorias',
        meta: {
          auth: true
        }
      },
      {
        path: 'vender/:hash',
        component: EntregarProduto,
        name: 'entregar-produto',
        meta: {
          auth: true
        }
      },
      {
        path: 'qrcode',
        component: LerQrCode,
        name: 'ler-qr-code',
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
