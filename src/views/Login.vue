<template>
  <form @submit="onSubmit">
    <div
      class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    >
      <div class="flex flex-column align-items-center justify-content-center">
        <img
          src="public/layout/images/logo-dark.svg"
          alt="Sakai logo"
          class="mb-5 w-6rem flex-shrink-0"
        />
        <div
          style="
            border-radius: 56px;
            padding: 0.3rem;
            background: linear-gradient(
              180deg,
              var(--primary-color) 10%,
              rgba(33, 150, 243, 0) 30%
            );
          "
        >
          <div
            class="w-full surface-card py-8 px-5 sm:px-8"
            style="border-radius: 53px"
          >
          <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{ width: '350px' }" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span>Username or password is required</span>
                        <span>Invalid username or password! Please check again!</span>
                    </div>
                    <template #footer>
                        <Button label="OK" icon="pi pi-check" @click="closeConfirmation" class="p-button-text" autofocus />
                    </template>
          </Dialog>
            <div class="text-center mb-5">
              <img
                src="/demo/images/login/avatar.png"
                alt="Image"
                height="50"
                class="mb-3"
              />
              <div class="text-900 text-3xl font-medium mb-3">
                Welcome, Isabel!
              </div>
              <span class="text-600 font-medium">Sign in to continue</span>
            </div>

            <div>
              <label
                for="email1"
                class="block text-900 text-xl font-medium mb-2"
                >Email</label
              >
              <InputText
                required
                id="email1"
                v-model="userInfo.userName"
                type="text"
                placeholder="Email address"
                class="w-full md:w-30rem mb-5"
                style="padding: 1rem"
              />
              <label
                for="password1"
                class="block text-900 font-medium text-xl mb-2"
                >Password</label
              >
              <Password
                required
                id="password1"
                v-model="userInfo.password"
                placeholder="Password"
                :toggleMask="true"
                class="w-full mb-3"
                inputClass="w-full"
                inputStyle="padding:1rem"
              ></Password>

              <div
                class="flex align-items-center justify-content-between mb-5 gap-5"
              >
                <div class="flex align-items-center">
                  <Checkbox
                    v-model="checked"
                    id="rememberme1"
                    binary
                    class="mr-2"
                  ></Checkbox>
                  <label for="rememberme1">Remember me</label>
                </div>
                <a
                  class="font-medium no-underline ml-2 text-right cursor-pointer"
                  style="color: var(--primary-color)"
                  >Forgot password?</a
                >
              </div>
              <Button type="submit" label="Sign In" class="w-full p-3 text-xl"></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppConfig simple />
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
import type { UserLogin } from "@/http/type";
import { Field, Form, ErrorMessage } from "vee-validate";
import AppConfig from "@/layout/AppConfig.vue";
import InputComponent from "@/components/InputComponent.vue";

export default defineComponent({
  setup() {
    const storeUser = useUserStore();

    return { storeUser };
  },
  data: () => ({
    userInfo: {} as UserLogin[],
    password: "",
    checked: false,
    focusInput: false,
    displayConfirmation: false,

  }),
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
    AppConfig,
    InputComponent,
  },
  methods: {
    onSubmit() {
      this.displayConfirmation = true
      this.$router.push({ name: "Home" });
    },
    closeConfirmation() {
      this.displayConfirmation = false
    }
  },
});
</script>
