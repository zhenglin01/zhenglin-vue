
import Manager from '@/views/manager.vue'
import login from '@/views/login.vue'
import User from '@/views/user/index'
import Org from '@/views/org/index'
import Tree from '@/views/org/tree'

let routes = [
  {
    path: '/login',
    component: login
  },
  {
    path: '/manager',
    name: 'manager',
    component: Manager,
    children: [{
      path: '/user',
      name: 'user',
      component: User,
      meta: ['用户管理', '用户列表']
    }, {
      path: '/org',
      name: 'org',
      component: Org,
      meta: ['组织管理', '组织查询']
    }, {
      path: '/tree',
      name: 'tree',
      component: Tree,
      meta: ['组织管理', '组织管理']
    }
    ]
  }
]

export default routes
