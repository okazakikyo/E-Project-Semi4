<template>
    {{ errors }}
    <v-form @submit="onSubmit">
      <div
        class="
          surface-ground
          flex
          align-items-center
          justify-content-center
          min-h-screen min-w-screen
          overflow-hidden
        "
      >
        <div class="flex flex-column align-items-center justify-content-center">
          <img
            src="@/assets/images/logo-dark.svg"
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
              <Dialog
                header="Confirmation"
                v-model:visible="displayConfirmation"
                :style="{ width: '350px' }"
                :modal="true"
              >
                <div class="flex align-items-center justify-content-center">
                  <i
                    class="pi pi-exclamation-triangle mr-3"
                    style="font-size: 2rem"
                  />
                  <span>{{ errors }}</span>
                </div>
                <template #footer>
                  <Button
                    label="OK"
                    icon="pi pi-check"
                    @click="closeConfirmation"
                    class="p-button-text"
                    autofocus
                  />
                </template>
              </Dialog>
              <div class="text-center mb-5">
                <div class="text-900 text-3xl font-medium mb-3">
                  Login
                </div>
              </div>
              <div class="p-error" v-if="errMsg">{{ errMsg }}</div>
              <div>
                <label
                  for="email1"
                  class="block text-900 text-xl font-medium mb-2"
                  >Email</label
                >
                <v-field
                  type="text"
                  rules="required|email"
                  name="email"
                  v-slot="{ field, meta }"
                >
                  <InputText
                    placeholder="Email address"
                    v-bind="field"
                    v-model="userInfo.email"
                    :class="{ 'p-invalid': !meta.valid && meta.touched }"
                    class="w-full md:w-30rem mb-2"
                    style="padding: 1rem"
                  />
                </v-field>
                <div>
                  <error-message class="p-error" :name="'email'"></error-message>
                </div>
                <label
                  for="password1"
                  class="block text-900 font-medium text-xl mb-2"
                  >Password</label
                >
                <v-field
                  type="text"
                  rules="required"
                  name="password"
                  v-slot="{ field, meta }"
                >
                <Password
                  v-model="userInfo.password"
                  v-bind="field"
                  placeholder="Password"
                  :toggleMask="true"
                  class="w-full mb-2"
                  inputClass="w-full"
                  inputStyle="padding:1rem"
                  :class="{ 'p-invalid': !meta.valid && meta.touched }"
                ></Password>
                </v-field>
                <div>
                  <error-message class="p-error" :name="'password'"></error-message>
                </div>
  
                <div
                  class="
                    flex
                    align-items-center
                    justify-content-between
                    mb-5
                    gap-5
                  "
                >
                  <div class="flex align-items-center">
                      <RouterLink
                      :to="{ name: 'UserRegistration' }"
                      class="
                        font-medium
                        no-underline
                        text-right
                        cursor-pointer
                      "
                      style="color: var(--primary-color)"
                      >Registration
                    </RouterLink>
                  </div>
                  <a
                    class="
                      font-medium
                      no-underline
                      ml-2
                      text-right
                      cursor-pointer
                    "
                    style="color: var(--primary-color)"
                    >Forgot password?</a
                  >
                </div>
                <Button
                  type="submit"
                  label="Sign In"
                  class="w-full p-3 text-xl"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppConfig simple />
    </v-form>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import { useUserStore } from "@/stores/user";
  import { useErrorStore } from "@/stores/errors";
  import type { UserLogin } from "@/http/type";
  import { Field, Form, ErrorMessage } from "vee-validate";
  import AppConfig from "@/layout/AppConfig.vue";
  import InputComponent from "@/components/InputComponent.vue";
  import { useLoading } from "vue-loading-overlay";
  import { mapActions, mapState } from "pinia";
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
  
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
      errMsg : '',
    }),
    components: {
      VForm: Form,
      VField: Field,
      ErrorMessage: ErrorMessage,
      AppConfig,
      InputComponent,
    },
    computed: {
      ...mapState(useErrorStore, ["errors"]),
    },
    methods: {
      ...mapActions(useErrorStore, ['setEmptyError']),
      ...mapActions(useUserStore, ['login']),
      async onSubmit() {
        const $loading = useLoading();
        const loader = $loading.show({});
        // const auth = getAuth()
        // signInWithEmailAndPassword(auth, this.userInfo.email, this.userInfo.password)
        // .then((data) => {
        //   this.$router.push({ name: "Dashboard" });
        // })
        // .catch((error) => {
        //   this.displayConfirmation = true;
        //   switch (error.code) {
        //     case "auth/invalid-email":
        //       this.errMsg = "Invalid email"
        //       break;
        //     case "auth/user-not-found":
        //       this.errMsg = "User not found"
        //       break;
        //     case "auth/wrong-password":
        //       this.errMsg = "Wrong password"
        //       break;
        //     default:
        //       this.errMsg = "Email or password is incorrect"
        //       break;
        //   }
        // })
        await this.login(this.userInfo)
        if(!this.errors) {
          this.$router.push({ name: "UserHome" });
        } else {
          this.displayConfirmation = true
        }
        loader.hide();
      },
      closeConfirmation() {
        this.setEmptyError();
        this.displayConfirmation = false;
      },
    },
  });
  </script>
  