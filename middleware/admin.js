export default function ({store, redirect}) {
  const authority = 'ROLE_ADMIN'
  console.log(store.$auth.loggedIn)
  console.log(redirect)

  if(!store.$auth.loggedIn) {
    return redirect('/login')
  }

  const user = store.$auth.user

  let hasRoleAdmin = false
  user.authorities.forEach((auth) => {
    console.log(auth)
    if(auth.authority === authority) {
      hasRoleAdmin = true
    }
  })

  if(!hasRoleAdmin) {
    return redirect('/')
  }
}
