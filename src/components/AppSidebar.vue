<template>
  <div>
    <Button icon="pi pi-arrow-right" v-model:visible="visibleLeft" @click="visibleLeft = true" class="mr-2" />

    <Sidebar v-model:visible="visibleLeft" :baseZIndex="10000">
      <h3>Left Sidebar</h3>
      <div>aaa</div>
    </Sidebar>

  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { AppSidebarNav } from "./AppSidebarNav";
import { logoNegative } from "@/assets/brand/logo-negative";
import { sygnet } from "@/assets/brand/sygnet";
import download from "@/assets/icons/download.png";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";
export default defineComponent ({
  name: "AppSidebar",
  components: {
    AppSidebarNav,
    Button,
    Sidebar,
  },
  setup() {
    const visibleLeft = ref(false);
    const visibleRight = ref(false);
    const visibleTop = ref(false);
    const visibleBottom = ref(false);
    const visibleFull = ref(false);

    return {
      visibleLeft,
      visibleRight,
      visibleTop,
      visibleBottom,
      visibleFull,
    };
  },
  data: () => ({}),
});
</script>
<style lang="scss">
.brand-image {
  float: left !important;
  line-height: 0.8 !important;
  margin: -1px 8px 0 6px !important;
  opacity: 0.8 !important;
  --pf-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23) !important;
}

.img-circle {
  --pf-box-shadow: 0 3px 6px #00000029, 0 3px 6px #0000003b !important;
}

.form-inline {
  width: 100%;
  justify-content: center;
}
</style>
  