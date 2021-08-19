<template>
  <div class="c-Ich">
    {{$auth.user}}
    <div>
      <h1 class="title is-1">Hallo {{$auth.user.firstName}} {{$auth.user.lastName}},</h1>
    </div>


  </div>
</template>

<script>
export default {
  name: "Index",
  middleware: ['loggedIn'],
}
</script>

