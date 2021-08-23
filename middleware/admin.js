export default function ({store, redirect}) {

  const role = 'ROLE_ADMIN'

  if(!store.$auth.loggedIn) {
    return redirect('/login')
  }

  const user = store.$auth.user

  let hasRoleAdmin = false
  user.roles.forEach((auth) => {
    if(auth.name === role) {
      hasRoleAdmin = true
    }
  })

  if(!hasRoleAdmin) {
    return redirect('/')
  }

}
