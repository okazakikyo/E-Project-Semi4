<template>
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
                <span>Username or password is required</span>
                <span>Invalid username or password! Please check again!</span>
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
                Member registration
              </div>
            </div>
            <div>
              <label
                for="userName"
                class="block text-900 text-xl font-medium mb-2"
                >Email</label
              >
              <v-field
                type="text"
                rules="required"
                name="userName"
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
                <error-message class="p-error" :name="'userName'"></error-message>
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
              <label
                for="password2"
                class="block text-900 font-medium text-xl mb-2"
                >Password confirm</label
              >
              <v-field
                type="text"
                rules="required|confirmed:@password"
                name="password_conifrm"
                v-slot="{ field, meta }"
              >
              <Password
                v-model="userInfo.passwordConfirm"
                placeholder="Password confirm"
                :toggleMask="true"
                class="w-full mb-2"
                inputClass="w-full"
                inputStyle="padding:1rem"
                v-bind="field"
                :class="{ 'p-invalid': !meta.valid && meta.touched }"
              ></Password>
              </v-field>
              <div>
                <error-message class="p-error" :name="'password_conifrm'"></error-message>
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
                <RouterLink
                  :to="{ name: 'Login' }"
                  class="
                    font-medium
                    no-underline
                    text-right
                    cursor-pointer
                  "
                  style="color: var(--primary-color)"
                  >Has account ? (Login)
                </RouterLink>
              </div>
              <Button
                type="submit"
                label="Sign Up"
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
import type { UserLogin } from "@/http/type";
import { Field, Form, ErrorMessage } from "vee-validate";
import AppConfig from "@/layout/AppConfig.vue";
import InputComponent from "@/components/InputComponent.vue";
import { getAuth, createUserWithEmailAndPassword, UserCredential, sendEmailVerification, onAuthStateChanged } from 'firebase/auth'

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
    async onSubmit() {
      await createUserWithEmailAndPassword(getAuth(), this.userInfo.email, this.userInfo.password)
      .then((data) => {
        alert('Registration successful')
        this.$router.push({ name: "Login" });
      })
      .catch((error) => {
        alert(error.message)
      })
    },
    closeConfirmation() {
      this.displayConfirmation = false;
    },
  },
});
</script>
  