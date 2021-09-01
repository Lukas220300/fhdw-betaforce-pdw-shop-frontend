export default function ({store, redirect}) {

  const role = 'ROLE_EMPLOYEE'

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
    if(auth.name === role ||auth.name === 'ROLE_ADMIN') {
      hasRoleEmployee = true
    }
  })

  if(!hasRoleEmployee) {
    return redirect('/')
  }

}
