import store from '@/store'
export default function auth({ next, router }) {
  if (!store.state.auth.status.loggedIn) {
    return next('/login')
  }
  return next();
}
