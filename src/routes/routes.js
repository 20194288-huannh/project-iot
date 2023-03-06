import DashboardLayout from '../layout/DashboardLayout.vue'
import GuestLayout from '../layout/GuestLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import UserList from 'src/pages/UserList.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import Device from 'src/pages/Device.vue'
import House from 'src/pages/House.vue'
import HouseDetail from 'src/pages/HouseDetail.vue'
import Upgrade from 'src/pages/Upgrade.vue'
import Login from 'src/pages/Login.vue'

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
        component: UserList
      },
      {
        path: 'user/:id',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'device',
        name: 'Device',
        component: Device
      },
      {
        path: 'house',
        name: 'House',
        component: House
      },
      {
        path: 'house/:id',
        name: 'HouseDetail',
        component: HouseDetail
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
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

export default routes
