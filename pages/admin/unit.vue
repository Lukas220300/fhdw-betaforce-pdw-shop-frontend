<template>
  <div class="c-admin-unit">
    unit
  </div>
</template>

<script>
import {ref, useContext} from "@nuxtjs/composition-api";
import {useApi} from "@/composable/api";

export default {
  name: "Unit",
  layout: 'admin',
  setup(){
    const {$axios} = useContext()
    const units = ref()
    const tempUnit = ref()
    const showModal = ref(false)
    const newMode = ref(false)

    const loadUnits = () => {
      useApi($axios).unit.findAll().then((result) => {
        units.value = result
      })
    }


    loadUnits()

    return {
      units,
      tempUnit,
      showModal,
      newMode,
    }
  },
}
</script>

