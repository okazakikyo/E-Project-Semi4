<template>
  <v-form @submit="onSubmit">
    <div class="
          surface-ground
          flex
          align-items-center
          justify-content-center
          min-h-screen min-w-screen
          overflow-hidden
        ">
      <div class="flex flex-column align-items-center justify-content-center">
        <img src="@/assets/images/logo-dark.svg" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
        <div style="
              border-radius: 56px;
              padding: 0.3rem;
              background: linear-gradient(
                180deg,
                var(--primary-color) 10%,
                rgba(33, 150, 243, 0) 30%
              );
            ">
          <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
            <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{ width: '350px' }"
              :modal="true">
              <div class="flex align-items-center justify-content-center">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <div class="p-error" v-if="errors">{{ errors }}</div>
              </div>
              <template #footer>
                <Button label="OK" icon="pi pi-check" @click="closeConfirmation" class="p-button-text" autofocus />
              </template>
            </Dialog>
            <div class="text-center mb-5">
              <div class="text-900 text-3xl font-medium mb-3">
                Member registration
              </div>
            </div>
            <div>
              <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
              <v-field type="text" rules="required" name="email" v-slot="{ field, meta }">
                <InputText placeholder="Email address" v-bind="field" v-model="userInfo.email"
                  :class="{ 'p-invalid': !meta.valid && meta.touched }" class="w-full md:w-30rem mb-2"
                  style="padding: 1rem" />
              </v-field>
              <div>
                <error-message class="p-error" :name="'email'"></error-message>
              </div>

              <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
              <v-field type="text" rules="required" name="password" v-slot="{ field, meta }">
                <Password v-model="userInfo.password" v-bind="field" placeholder="Password" :toggleMask="true"
                  class="w-full mb-2" inputClass="w-full" inputStyle="padding:1rem"
                  :class="{ 'p-invalid': !meta.valid && meta.touched }"></Password>
              </v-field>
              <div>
                <error-message class="p-error" :name="'password'"></error-message>
              </div>

              <label for="password2" class="block text-900 font-medium text-xl mb-2">Password confirm</label>
              <v-field type="text" rules="required|confirmed:@password" name="password_conifrm"
                v-slot="{ field, meta }">
                <Password v-model="passwordConfirm" placeholder="Password confirm" :toggleMask="true"
                  class="w-full mb-2" inputClass="w-full" inputStyle="padding:1rem" v-bind="field"
                  :class="{ 'p-invalid': !meta.valid && meta.touched }"></Password>
              </v-field>
              <div>
                <error-message class="p-error" :name="'password_conifrm'"></error-message>
              </div>

              <label for="name" class="block text-900 text-xl font-medium mb-2">Name</label>
              <v-field type="text" rules="required" name="name" v-slot="{ field, meta }">
                <InputText placeholder="Name" v-bind="field" v-model="userInfo.staff_id.name"
                  :class="{ 'p-invalid': !meta.valid && meta.touched }" class="w-full md:w-30rem mb-2"
                  style="padding: 1rem" />
              </v-field>
              <div>
                <error-message class="p-error" :name="'name'"></error-message>
              </div>

              <label for="phone" class="block text-900 text-xl font-medium mb-2">Phone number</label>
              <v-field type="text" rules="required|min:10|numeric" name="phone" v-slot="{ field, meta }">
                <InputText placeholder="Phone number" v-bind="field" v-model="userInfo.staff_id.phone"
                  :maxlength="12"
                  :class="{ 'p-invalid': !meta.valid && meta.touched }" class="w-full md:w-30rem mb-2"
                  style="padding: 1rem" />
              </v-field>
              <div>
                <error-message class="p-error" :name="'phone'"></error-message>
              </div>

              <label for="birthday" class="block text-900 text-xl font-medium mb-2">Birth day</label>
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-calendar"></i>
                </span>
                <v-field type="text" rules="required" name="birthday" v-slot="{ field, meta }">
                  <Calendar inputId="calendar" placeholder="Birthday" :maxDate="new Date()" v-bind="field"
                    id="inputtext" :class="{ 'p-invalid': !meta.valid && meta.touched }"
                    v-model="userInfo.staff_id.birthday"></Calendar>
                </v-field>
              </div>
              <ErrorMessage class="p-error" :name="'birthday'"></ErrorMessage>

              <label for="address" class="block text-900 text-xl font-medium mb-2">Address</label>
                <InputText placeholder="Address" v-bind="field" v-model="userInfo.staff_id.address"
                  class="w-full md:w-30rem mb-2"
                  style="padding: 1rem" />

              <label for="address" class="block text-900 text-xl font-medium mb-2">Bank ID</label>
                <InputText placeholder="Bank ID" v-bind="field" v-model="userInfo.staff_id.ban_id"
                  class="w-full md:w-30rem mb-2"
                  style="padding: 1rem" />
              <div>

              </div>
              <div class="
                    flex
                    align-items-center
                    justify-content-between
                    mb-5
                    gap-5
                  ">
                <RouterLink :to="{ name: 'UserLogin' }" class="
                      font-medium
                      no-underline
                      text-right
                      cursor-pointer
                    " style="color: var(--primary-color)">Has account ? (Login)
                </RouterLink>
              </div>
              <Button type="submit" label="Sign Up" class="w-full p-3 text-xl"></Button>
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
import { Field, Form, ErrorMessage } from "vee-validate";
import AppConfig from "@/layout/AppConfig.vue";
import InputComponent from "@/components/InputComponent.vue";
import { mapActions, mapState } from "pinia";
import moment from "moment";
import { useLoading } from "vue-loading-overlay";
// import { getAuth, createUserWithEmailAndPassword, UserCredential, sendEmailVerification, onAuthStateChanged } from 'firebase/auth'

export default defineComponent({
  setup() {
    const storeUser = useUserStore();

    return { storeUser };
  },
  data: () => ({
    userInfo: {
      staff_id: {}
    },
    password: "",
    checked: false,
    focusInput: false,
    displayConfirmation: false,
    passwordConfirm: '',
  }),
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
    AppConfig,
    InputComponent,
  },
  computed: {
    ...mapState(useErrorStore, ['errors'])
  },
  methods: {
    ...mapActions(useUserStore, ['register']),
    async onSubmit() {
      const $loading = useLoading();
      const loader = $loading.show({});
      // await createUserWithEmailAndPassword(getAuth(), this.userInfo.email, this.userInfo.password)
      // .then((data) => {
      //   alert('Registration successful')
      //   this.$router.push({ name: "Login" });
      // })
      // .catch((error) => {
      //   alert(error.message)
      // })
      this.userInfo.staff_id.birthday = moment(this.userInfo.staff_id.birthday).format('YYYY-MM-DD')
      this.userInfo.isDelete = 0
      this.userInfo.role = "user"
      this.userInfo.createAt = moment(new Date()).format('YYYY-MM-DD')
      this.userInfo.staff_id.bank_id = this.userInfo.staff_id.bank_id ? this.userInfo.staff_id.bank_id : ''
      this.userInfo.staff_id.image = this.userInfo.staff_id.image ? this.userInfo.staff_id.image : ''
      this.userInfo.staff_id.address = this.userInfo.staff_id.address ? this.userInfo.staff_id.address : ''
      this.userInfo.staff_id.createAt = moment(new Date()).format('YYYY-MM-DD')
      this.userInfo.staff_id.isDelete = 0
      try {
        await this.register(this.userInfo)
      } catch(e){}
      if (!this.errors) {
        this.$router.push({ name: 'UserHome' })
      } else {
        this.displayConfirmation = true
      }
      loader.hide();
    },
    closeConfirmation() {
      this.displayConfirmation = false;
    },
  },
});
</script>
<style lang="scss" scoped>
.w-full-pad-calendar {
  padding: 0 !important;
  width: 100%;
}
</style>