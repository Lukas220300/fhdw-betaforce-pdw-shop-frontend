<template>
  <div>
    <h1>Layout admin</h1>
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: "Admin",
  middleware: ['accessProtection']
}
</script>

