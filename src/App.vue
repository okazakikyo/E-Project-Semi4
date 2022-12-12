<template>
  <div class="body">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const route = useRoute();

    return { route };
  },
  data: () => ({
    
  }),
});
</script>

<style scoped>

</style>
