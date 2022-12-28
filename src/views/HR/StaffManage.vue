<template>
<div class="">
    <div class="card" v-if="user.length > 0">
            <h5>Staff List</h5>
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
                    <template #filter="{filterModel}">
                        <div class="mb-3 font-bold">Role Picker</div>
                        <MultiSelect v-model="filterModel.value" :options="roles" optionLabel="name" placeholder="Any" class="p-column-filter">
                            <template #option="slotProps">
                                <div class="p-multiselect-representative-option">
                                    <span class="image-text">{{slotProps.option.name}}</span>
                                </div>
                            </template>
                        </MultiSelect>
                    </template>
                </Column>
                <Column header="Date" filterField="date" dataType="date" style="min-width:10rem">
                    <template #body="{data}">
                        {{formatDate(data.staff_id.birthday, 'YYYY/MM/DD')}}
                    </template>
                    <template #filter="{filterModel}">
                        <Calendar v-model="filterModel.value" dateFormat="yy/mm/dd/" placeholder="yyyy/mm/dd/" />
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
                    <template #filter={filterModel}>
                        <TriStateCheckbox v-model="filterModel.value" />
                    </template>
                </Column>
            </DataTable>
        </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
import { useErrorStore } from "@/stores/errors";
import { mapActions, mapState } from "pinia";
import {FilterMatchMode,FilterOperator} from 'primevue/api';
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
        roles: [
            {name: 'admin'},
            {name: 'user'},
            {name: 'hr'}
        ]
    }),
    computed: {
        ...mapState(useUserStore, ['user'])
    },
    methods: {
        ...mapActions(useUserStore, ['getListUser']),
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
        clearFilter1() {
            this.initFilters1();
        },
    },
    async created() {
        await this.getListUserData();
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