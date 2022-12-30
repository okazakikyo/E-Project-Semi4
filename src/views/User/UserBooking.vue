<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Booking List</h5>
                <DataTable :value="userId" v-model:expandedRows="expandedRows" dataKey="id"
                    responsiveLayout="scroll">
                    <Column field="name" header="Name" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.title }}
                        </template>
                    </Column>
                    <Column header="Image">
                        <template #body="slotProps">
                            <img :src="'/demo/images/room/' + slotProps.data.image"
                                :alt="slotProps.data.image" class="shadow-2" width="100" />
                        </template>
                    </Column>
                    <Column field="name" header="Name" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="slots" header="Slots" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.slots }}
                        </template>
                    </Column>
                    <Column field="description" header="Description" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.description }}
                        </template>
                    </Column>
                    <Column field="start_time" header="Start date" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.start_date }}
                        </template>
                    </Column>
                    <Column field="end_time" header="End date" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.end_date }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
import { mapActions } from "pinia";
import _ from 'lodash'

export default defineComponent({
    setup: () => ({

    }),
    data: () => ({
        bookingList: {},
        userId: '',
    }),
    computed: {

    },
    methods: {
        ...mapActions(useUserStore, ['getBookingHistory']),
        async getListBook() {
           this.bookingList = await this.getBookingHistory();
           const user = JSON.parse(localStorage.getItem('user'))
           const idUser = _.filter(this.bookingList, (o) => {
                return o.email == user.user.email
           })
           const sortList = _.reverse(idUser)
           this.userId = sortList
        }
    },
    async created() {
        await this.getListBook();
    }
});
</script>

<style lang="scss" scoped>

</style>
