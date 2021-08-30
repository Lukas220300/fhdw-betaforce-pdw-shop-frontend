export default function ({store, redirect}) {

  const role = 'ROLE_ADMIN'

  if(!store.$auth.loggedIn) {
    return redirect('/auth/login')
  }

  let user = store.$auth.user

  let hasRoleEmployee = false
  if(!user.roles) {
    location.reload()
    user = store.$auth.user
  }
  user.roles.forEach((auth) => {
    if(auth.name === role) {
      hasRoleEmployee = true
    }
  })

  if(!hasRoleEmployee) {
    return redirect('/')
  }

}
