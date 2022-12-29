<template>
<div class="">
    <div class="card" v-if="user.length > 0">
            <h5>User List</h5>
            <DataTable :value="user" :paginator="true" class="p-datatable-customers" showGridlines :rows="10"
                dataKey="id" v-model:filters="filters1" filterDisplay="menu" :loading="loading1" responsiveLayout="scroll"
                :globalFilterFields="['staff_id.name','email','staff_id.phone','role','staff_id.birthday', 'staff_id.bank_id', 'isDelete']">
                <template #header>
                    <div class="flex justify-content-between">
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined" @click="clearFilter1()"/>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters1['global'].value" placeholder="Keyword Search" />
                        </span>
                    </div>
                </template>
                <template #empty>
                    No user found.
                </template>
                <template #loading>
                    Loading user data. Please wait.
                </template>
                <Column field="staff_id.name" header="Name" style="min-width:12rem">
                    <template #body="{data}">
                        {{data.staff_id.name}}
                    </template>
                    <template #filter="{filterModel}">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                    </template>
                </Column>
                <Column header="Email" filterField="email" style="min-width:12rem">
                    <template #body="{data}">
                        <span class="image-text">{{data.email}}</span>
                    </template>
                    <template #filter="{filterModel}">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by email"/>
                    </template>
                    <template #filterclear="{filterCallback}">
                        <Button type="button" icon="pi pi-times" @click="filterCallback()" class="p-button-secondary"></Button>
                    </template>
                    <template #filterapply="{filterCallback}">
                        <Button type="button" icon="pi pi-check" @click="filterCallback()" class="p-button-success"></Button>
                    </template>
                    <template #filterfooter>
                        <div class="px-3 pt-0 pb-3 text-center font-bold">Customized Buttons</div>
                    </template>
                </Column>
                <Column header="Role" filterField="role" :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width:14rem">
                    <template #body="{data}">
                        <span class="image-text">{{data.role}}</span>
                    </template>
                </Column>
                <Column header="Date" filterField="date" dataType="date" style="min-width:10rem">
                    <template #body="{data}">
                        {{formatDate(data.staff_id.birthday, 'YYYY/MM/DD')}}
                    </template>
                </Column>
                <Column header="Phone Number" filterField="staff_id.phone" dataType="numeric" style="min-width:10rem">
                    <template #body="{data}">
                        {{data.staff_id.phone}}
                    </template>
                    <template #filter="{filterModel}">
                        <InputNumber v-model="filterModel.value" dataType="numeric" style="min-width:10rem"/>
                    </template>
                </Column>
                <Column header="Bank ID" filterField="staff_id.bank_id" dataType="numeric" style="min-width:10rem">
                    <template #body="{data}">
                        {{data.staff_id.bank_id}}
                    </template>
                    <template #filter="{filterModel}">
                        <InputNumber v-model="filterModel.value" dataType="numeric" style="min-width:10rem"/>
                    </template>
                </Column>
                <Column field="verified" header="Active" dataType="boolean" bodyClass="text-center" style="min-width:8rem">
                    <template #body="{data}">
                        <i class="pi" :class="{'text-green-500 pi-check-circle': !data.isDelete, 'text-pink-500 pi-times-circle': data.isDelete}"></i>
                    </template>
                </Column>
                <Column headerStyle="width:4rem">
                  <template #body="slotProps">
                    <Button icon="pi pi-pencil" @click="editStaff(slotProps.data.id)" />
                  </template>
                </Column>
            </DataTable>
        </div>

         <!-- Edit modal -->
  <Dialog header="Header" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }" :modal="true">
    <div class="row">
        <label>Name</label>
        <InputText type="text" v-model="userInfo.staff_id.name" :value="userInfo.staff_id.name"/>
        <label>Email (read only)</label>
        <InputText type="text" v-model="userInfo.email" :value="userInfo.email" readonly/>
        <label>Address</label>
        <InputText type="text" v-model="userInfo.staff_id.address" :value="userInfo.staff_id.address ? userInfo.staff_id.address : ''" />
        <label>BirthDay (read only)</label>
        <Calendar readonly inputId="calendar" :maxDate="new Date(userInfo.staff_id.birthday)" label="Adress" v-model="userInfo.staff_id.birthday" :value="formatDate(userInfo.staff_id.birthday, 'YYYY/MM/DD')" />
        <label>Bank ID</label>
        <InputText type="text" v-model="userInfo.staff_id.bank_id" :value="userInfo.staff_id.bank_id ? userInfo.staff_id.bank_id : ''" />
        <label>Phone number</label>
        <InputText type="number" v-model="userInfo.staff_id.phone" :value="userInfo.staff_id.phone ? userInfo.staff_id.phone : ''" />
        <label>Active</label>
        <Dropdown v-model="userInfo.isDelete" :options="active" optionLabel="name" optionValue="code" :value="userInfo.isDelete ? active[1].name : active[0].name" />
    </div>
    <template #footer>
      <Button label="Close" icon="pi pi-times" @click="displayModal = false" class="p-button-text" />
      <Button label="Save" icon="pi pi-check" @click="editUser(userInfo.id, userInfo)" autofocus />
    </template>
  </Dialog>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
import { useErrorStore } from "@/stores/errors";
import { mapActions, mapState } from "pinia";
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import { useLoading } from "vue-loading-overlay";
import moment from "moment";

export default defineComponent ({
    setup: () => ({

    }),
    data: () => ({
        filters1: {
            'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            'staff_id.name': {value: null, matchMode: FilterMatchMode.CONTAINS},
            'email': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            'staff_id.phone': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            'role': {value: null, matchMode: FilterMatchMode.IN},
            'staff_id.birthday': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
            'staff_id.bank_id': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
            'isDelete': {value: null, matchMode: FilterMatchMode.EQUALS}
        },
        loading1: true,
        userInfo: {
            staff_id: {}
        },
        displayModal: false,
        active: [
            { name: 'Active', code: 0 },
            { name: 'InActive', code: 1 }
        ]
    }),
    computed: {
        ...mapState(useUserStore, ['user'])
    },
    methods: {
        ...mapActions(useUserStore, ['getListUser', 'getUser', 'updateUser']),
        async getListUserData() {
            await this.getListUser();
            console.log(this.user)
            this.loading1 = false;
            console.log(this.filters1)
            this.initFilters1();
        },
        initFilters1() {
            this.filters1 = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'staff_id.name': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'email': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                'staff_id.phone': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                'role': {value: null, matchMode: FilterMatchMode.IN},
                'staff_id.birthday': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
                'staff_id.bank_id': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
                'isDelete': {value: null, matchMode: FilterMatchMode.EQUALS}
            }
        },
        formatDate(date: any, format: string) {
            if (moment(date).isValid()) {
                return moment(date).format(format);
            }
            return null
        },
        async editStaff(id: any) {
            const $loading = useLoading();
            const loader = $loading.show({});
            this.displayModal = true
            try {
                this.userInfo = await this.getUser(id)
            } catch (error) {
                
            }
            loader.hide();
        },
        clearFilter1() {
            this.initFilters1();
        },
        async editUser(id: any,info: any ) {
            const $loading = useLoading();
            const loader = $loading.show({});
            try {
                await this.updateUser(id, info);
            } catch (error) {}
            await this.getListUser();
            this.displayModal = false
            loader.hide();
        }
    },
    async created() {
        const $loading = useLoading();
        const loader = $loading.show({});
        await this.getListUserData();
        loader.hide();
    }
})

</script>

<style lang="scss" scoped>
::v-deep(.p-paginator) {
    .p-paginator-current {
        margin-left: auto;
    }
}

::v-deep(.p-progressbar) {
    height: .5rem;
    background-color: #D8DADC;

    .p-progressbar-value {
        background-color: #607D8B;
    }
}

::v-deep(.p-datepicker) {
    min-width: 25rem;

    td {
        font-weight: 400;
    }
}

::v-deep(.p-datatable.p-datatable-customers) {
    .p-datatable-header {
        padding: 1rem;
        text-align: left;
        font-size: 1.5rem;
    }

    .p-paginator {
        padding: 1rem;
    }

    .p-datatable-thead > tr > th {
        text-align: left;
    }

    .p-datatable-tbody > tr > td {
        cursor: auto;
    }

    .p-dropdown-label:not(.p-placeholder) {
        text-transform: uppercase;
    }
}
</style>