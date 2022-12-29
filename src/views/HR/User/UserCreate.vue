<template>
<div class="card">
    <Form @submit="onSubmit">
        <Toast/>
        <h5>Account creation</h5>
        <div class="grid p-fluid">
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-at"></i>
                    </span>
                    <Field type="text"
                            rules="required|email"
                            name="email"
                            v-slot="{ field, meta }">
                    <InputText placeholder="Email" v-bind="field" id="inputtext" :class="{ 'p-invalid': !meta.valid && meta.touched }" v-model="user.email"/>
                    </Field>
                </div>
                <ErrorMessage class="p-error" :name="'email'"></ErrorMessage>
            </div>

            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-lock"></i>
                    </span>
                    <Field type="text"
                            rules="required"
                            name="password"
                            v-slot="{ field, meta }">
                    <InputText placeholder="Password" v-bind="field" id="inputtext" :class="{ 'p-invalid': !meta.valid && meta.touched }" type="password" v-model="user.password"/>
                    </Field>
                </div>
                <ErrorMessage class="p-error" :name="'password'"></ErrorMessage>
            </div>

            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <Field type="text"
                            rules="required"
                            name="name"
                            v-slot="{ field, meta }">
                    <InputText placeholder="Name" v-bind="field" id="inputtext" :class="{ 'p-invalid': !meta.valid && meta.touched }" v-model="user.staff_id.name" />
                    </Field>
                </div>
                <ErrorMessage class="p-error" :name="'name'"></ErrorMessage>
            </div>
        </div>

        <div class="grid p-fluid">
            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-phone"></i>
                    </span>
                    <Field type="text"
                            rules="required|min:10"
                            name="phone"
                            v-slot="{ field, meta }">
                    <InputText placeholder="Phone number" :maxlength="12" v-bind="field" id="inputtext" :class="{ 'p-invalid': !meta.valid && meta.touched }" v-model="user.staff_id.phone" />
                    </Field>
                </div>
                <ErrorMessage class="p-error" :name="'phone'"></ErrorMessage>
            </div>

            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-calendar"></i>
                    </span>
                    <Field type="text"
                            rules="required"
                            name="birthday"
                            v-slot="{ field, meta }">
                    <Calendar inputId="calendar" placeholder="Birthday" :maxDate="maxDate" v-bind="field" id="inputtext" :class="{ 'p-invalid': !meta.valid && meta.touched }" v-model="user.staff_id.birthday"></Calendar>
                    </Field>
                </div>
                <ErrorMessage class="p-error" :name="'birthday'"></ErrorMessage>
            </div>

            <div class="col-12 md:col-4">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-credit-card"></i>
                    </span>
                    <InputText placeholder="Bank Id" v-model="user.staff_id.bank_id"/>
                </div>
            </div>
        </div>

        <div class="grid p-fluid">
            <div class="col-12">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-building"></i>
                    </span>
                    <InputText placeholder="Address" v-model="user.staff_id.address"/>
                </div>
            </div>
        </div>

        <h6>Role</h6>
        <div class="grid">
            <div class="col-6">
                <div class="field-radiobutton" v-for="r in role" :key="r">
                    <RadioButton inputId="role" name="role" :value=r.name v-model="user.role" checked/>
                    <label for="role">{{ r.name }}</label>
                </div>
            </div>
        </div>
        <div class="p-error" v-if="errors">{{ errors }}</div>
        <div class="grid">
            <div class="col">
                <Button type="submit">Create</Button>
            </div>
        </div>
    </Form>
</div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { Field, Form, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import { useUserStore } from '@/stores/user'
import { mapActions, mapState } from 'pinia';
import { useLoading } from "vue-loading-overlay";
import moment from 'moment';
import { useErrorStore } from "@/stores/errors";

export default defineComponent ({
    data: () => ({
        checked1: false,
        checked2: false,
        radioValue1: '',
        radioValue2: '',
        role: [
            { name: 'admin' },
            { name: 'user' }
        ],
        user: {
            staff_id: {}
        },
        maxDate: new Date()
    }),
    components: {
        Field,
        Form,
        ErrorMessage
    },
    computed: {
        ...mapState(useErrorStore, ['errors']),
    },
    methods: {
        ...mapActions(useErrorStore, ['setEmptyError']),
        ...mapActions(useUserStore, ['register']),
        async onSubmit() {
            this.user.staff_id.birthday = moment(this.user.staff_id.birthday).format('YYYY-MM-DD')
            this.user.isDelete = 0
            this.user.createAt = moment(new Date()).format('YYYY-MM-DD')
            this.user.staff_id.bank_id = this.user.staff_id.bank_id ? this.user.staff_id.bank_id : ''
            this.user.staff_id.image = this.user.staff_id.image ? this.user.staff_id.image : ''
            this.user.staff_id.address = this.user.staff_id.address ? this.user.staff_id.address : ''
            this.user.staff_id.createAt = moment(new Date()).format('YYYY-MM-DD')
            this.user.staff_id.isDelete = 0
            try {
                const $loading = useLoading();
                const loader = $loading.show({});
                await this.register(this.user);
                if(!this.errors) {
                    this.setEmptyError();
                    this.$toast.add({severity:'success', summary:'Success Message', detail:'Create account success', life: 2000})
                    setTimeout(() => this.$router.push({ name: 'Dashboard' }), 2000)
                } else {
                    this.$toast.add({severity:'error', summary:'Error Message', detail: this.errors, life: 3000})
                    setTimeout(() => this.setEmptyError(), 2000)
                }
                loader.hide();
            } catch (error) {
                
            }
        }
    },
    created() {
        this.user.role = this.role[0].name
    }
})
</script>

<style>

</style>