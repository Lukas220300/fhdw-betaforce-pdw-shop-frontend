export default function ({store, redirect}) {

  const role = 'ROLE_ADMIN'

  if(!store.$auth.loggedIn) {
    return redirect('/auth/login')
  }

  let user = store.$auth.user

  let hasRoleAdmin = false
  if(!user.roles) {
    location.reload()
    user = store.$auth.user
  }
  user.roles.forEach((auth) => {
    if(auth.name === role) {
      hasRoleAdmin = true
    }
  })

  if(!hasRoleAdmin) {
    return redirect('/')
  }

}
