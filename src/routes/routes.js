import DashboardLayout from '../layout/DashboardLayout.vue'
import GuestLayout from '../layout/GuestLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'
import auth from '../middleware/auth'

// Admin pages
import VueRouter from "vue-router";
import UserList from 'src/pages/UserList.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import Device from 'src/pages/Device.vue'
import House from 'src/pages/House.vue'
import HouseDetail from 'src/pages/HouseDetail.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import Login from 'src/pages/Login.vue'
import store from '@/store'

const routes = [
  {
    path: 'login',
    component: Login,
  },
  {
    path: '/',
    component: GuestLayout,
    redirect: '/login',
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login,
      },
    ]
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/user',
    children: [
      {
        path: 'user-list',
        name: 'UserList',
        component: UserList,
        meta: { requiresAuth: auth }
      },
      {
        path: 'user/:id',
        name: 'User',
        component: UserProfile,
        meta: { requiresAuth: auth }
      },
      {
        path: 'device',
        name: 'Device',
        component: Device,
        meta: { requiresAuth: auth }
      },
      {
        path: 'house',
        name: 'House',
        component: House,
        meta: { requiresAuth: auth }
      },
      {
        path: 'house/:id',
        name: 'HouseDetail',
        component: HouseDetail,
        meta: { requiresAuth: auth }
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade,
        meta: { requiresAuth: auth }
      },
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.state.auth.status.loggedIn) {
    next('login')
  } else {
    next()
  }
})
export default router
