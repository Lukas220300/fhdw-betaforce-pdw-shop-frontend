export default function ({store, redirect}) {
  if(!store.state.access.access) {
    return redirect('/accessProtection')
  }
}
