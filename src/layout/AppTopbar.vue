<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { useLayout } from "@/layout/composables/layout";
import { useRouter } from "vue-router";

const { layoutConfig, onMenuToggle, contextPath } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const editProfile = ref(false);
const enableEdit = ref(false);
const router = useRouter();

onMounted(() => {
  bindOutsideClickListener();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const logoUrl = computed(() => {
  return `${contextPath}layout/images/${
    layoutConfig.darkTheme.value ? "logo-white" : "logo-dark"
  }.svg`;
});
// const logoUrl = computed(() => {
//   return `${contextPath}layout/images/${
//     layoutConfig.darkTheme.value ? "logo-white" : "download"
//   }.png`;
// });

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
  router.push({ name: 'Calendar' })
};

const editUserMenu = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
  editProfile.value = true;
  enableEdit.value= false;
};

const editUserProfile = () => {
  enableEdit.value = true;
};

const onSettingsClick = () => {
  topbarMenuActive.value = false;
  router.push("/documentation");
};
const topbarMenuClasses = computed(() => {
  return {
    "layout-topbar-menu-mobile-active": topbarMenuActive.value,
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };
    document.addEventListener("click", outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return;

  const sidebarEl = document.querySelector(".layout-topbar-menu");
  const topbarEl = document.querySelector(".layout-topbar-menu-button");

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
};
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img :src="logoUrl" alt="logo" />
      <span>TRAINEE MANAGEMENT</span>
    </router-link>

    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle()"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
        <i class="pi pi-calendar"></i>
        <span>Calendar</span>
      </button>
      <button @click="editUserMenu()" class="p-link layout-topbar-button">
        <i class="pi pi-user"></i>
        <span>Profile</span>
      </button>
    </div>
  </div>

  <!--Edit modal-->
  <Transition name="modal">
    <div v-if="editProfile" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>
          <div class="modal-body">
            <slot name="body" v-if="enableEdit">
                <div class="card p-fluid">
                <h5>Profile</h5>
                <div class="field">
                    <label for="name1">Name</label>
                    <InputText id="name1" type="text"/>
                </div>
                <div class="field">
                    <label for="email1">Email</label>
                    <InputText id="email1" type="text" />
                </div>
                <div class="field">
                    <label for="age1">Age</label>
                    <InputText id="age1" type="text" />
                </div>
            </div>
            </slot>
            <slot name="body" v-else>
                <div class="card p-fluid">
                <h5>Profile</h5>
                <div class="field">
                    <label for="name1">Name</label>
                    <InputText readonly id="name1" type="text" value="Name user" />
                </div>
                <div class="field">
                    <label for="email1">Email</label>
                    <InputText readonly id="email1" type="text" value="Email user"/>
                </div>
                <div class="field">
                    <label for="age1">Age</label>
                    <InputText readonly id="age1" type="text" value="Age User" />
                </div>
            </div>
            </slot>
          </div>
          <div class="">
            <slot name="footer">
              <div class="d-grid gap-2 d-flex justify-content-between" v-if="enableEdit">
                <Button class="p-button-outlined" type="submit">Save</Button>
                <Button class="p-button-outlined p-button-secondary" @click="editProfile = false">
                    Close
                </Button>
              </div>
              <div class="d-grid gap-2 d-flex justify-content-between" v-else>
                <Button class="p-button-outlined" @click="editUserProfile()">Edit</Button>
                <Button class="p-button-outlined p-button-secondary" @click="editProfile = false">
                    Close
                </Button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.modal-container {
  width: 50% !important;
}
.modal-footer {
  justify-content: space-between !important;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
