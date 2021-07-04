<template>
  <b-table :data="data" :columns="columns" :striped="true" ></b-table>
</template>

<script>
export default {
  name: "Table",
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
  }
}
</script>

