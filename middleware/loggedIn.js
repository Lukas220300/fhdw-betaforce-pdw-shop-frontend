export default function ({store, redirect}) {
  if(!store.$auth.loggedIn) {
    return redirect({path: '/auth/login', query: {redirectUri: '/ich'}})
  }
}
