<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>Booking List</h5>
        <DataTable :value="bookingList" v-model:expandedRows="expandedRows" dataKey="id" responsiveLayout="scroll">
          <template #header>
            <div>
              <Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2 mb-2" />
              <Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" class="mb-2" />
            </div>
          </template>
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column :field="name" header="Name" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.title }}
            </template>
          </Column>
          <Column header="Image">
            <template #body="slotProps">
              <img :src="
                contextPath + 'demo/images/room/' + slotProps.data.image
              " :alt="slotProps.data.image" class="shadow-2" width="100" />
            </template>
          </Column>
          <Column field="host" header="Host" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.host }}
            </template>
          </Column>
          <Column field="description" header="Description" :sortable="true">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.description) }}
            </template>
          </Column>
          <Column field="start_time" header="Start date" :sortable="true">
            <template #body="slotProps">
              {{ (slotProps.data.start_time) }}
            </template>
          </Column>
          <Column field="end_time" header="End date" :sortable="true">
            <template #body="slotProps">
              {{ (slotProps.data.end_time) }}
            </template>
          </Column>
          <Column field="status" header="Status" :sortable="true">
            <template #body="slotProps">
              <span :class="
                'product-badge status-' +
                (slotProps.data.status
                  ? 'instock'
                  : 'outofstock')
              ">{{ slotProps.data.status ? 'Available' : 'Full' }}</span>
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3">
              <h5>Orders for {{ slotProps.data.name }}</h5>
              <DataTable :value="slotProps.data.orders" responsiveLayout="scroll">
                <Column field="name" header="Name" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.name }}
                  </template>
                </Column>
                <Column field="start_date" header="Start Date" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.start_date }}
                  </template>
                </Column>
                <Column field="end_date" header="End Date" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.end_date }}
                  </template>
                </Column>
                <Column field="status" header="Status" :sortable="true">
                  <template #body="slotProps">
                    <span :class="
                      'order-badge order-' +
                      (slotProps.data.status
                        ? 'delivered'
                        : 'cancelled')
                    ">{{ slotProps.data.status ? 'Active' : 'Deactive' }}</span>
                  </template>
                </Column>
                <Column headerStyle="width:4rem">
                  <template #body="slotProps">
                    <Button icon="pi pi-pencil" @click="editTrainerRoom(slotProps.data)" />
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
        </DataTable>
      </div>
    </div>

    <!-- <div class="col-12">
      <div class="card">
        <h5>Booking List</h5>
        <DataTable :value="nameRoom" v-model:expandedRows="expandedRows" dataKey="id" responsiveLayout="scroll">
          <Column :expander="true" headerStyle="width: 3rem"/>
          <Column header="Name" :sortable="true">
            <template #body="name">
              {{ name.index }}
            </template>
          </Column>
          <Column header="Image">
            <template #body="slotProps">
              <img :src="
                contextPath + 'demo/images/room/' + slotProps.data[0].image
              " :alt="slotProps.data[0].name" class="shadow-2" width="100" />
            </template>
          </Column>
          <Column field="host" header="Host" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data[0].host }}
            </template>
          </Column>
          <Column field="description" header="Description" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data[0].description }}
            </template>
          </Column>
          <Column field="start_time" header="Start date" :sortable="true">
            <template #body="slotProps">
              {{ (slotProps.data[0].start_time) }}
            </template>
          </Column>
          <Column field="end_time" header="End date" :sortable="true">
            <template #body="slotProps">
              {{ (slotProps.data[0].end_time) }}
            </template>
          </Column>
          <Column field="status" header="Status" :sortable="true">
            <template #body="slotProps">
              <span :class="
                'product-badge status-' +
                (slotProps.data[0].status
                  ? 'instock'
                  : 'outofstock')
              ">{{ slotProps.data[0].status ? 'Available' : 'Full' }}</span>
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3">
              {{ slotProps }}
              <h5>Orders for</h5>
              <DataTable :value="groupName(slotProps.data)" responsiveLayout="scroll">
                <Column header="Name" :sortable="true">
                  <template #body="props">
                    {{ props.data }}
                  </template>
                </Column>
                <Column field="start_date" header="Start Date" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.start_date }}
                  </template>
                </Column>
                <Column field="end_date" header="End Date" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.end_date }}
                  </template>
                </Column>
                <Column field="status" header="Status" :sortable="true">
                  <template #body="slotProps">
                    <span :class="
                      'order-badge order-' +
                      (slotProps.data.status
                        ? 'delivered'
                        : 'cancelled')
                    ">{{ slotProps.data.status ? 'Active' : 'Deactive' }}</span>
                  </template>
                </Column>
                <Column headerStyle="width:4rem">
                  <template #body="slotProps">
                    <Button icon="pi pi-pencil" @click="editTrainerRoom(slotProps.data)" />
                  </template>
                </Column>
              </DataTable>
            </div>
          </template>
        </DataTable>
      </div>
    </div> -->
  </div>

  <!-- Edit modal -->
  <Dialog header="Header" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }" :modal="true">
    <p class="m-0">
      {{ roomDetails }}
    </p>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="closeEdit" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" @click="closeEdit" autofocus />
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from "primevue/api";
import CustomerService from "@/service/CustomerService";
import ProductService from "@/service/ProductService";
import { ref, onBeforeMount } from "vue";
import { useLayout } from "@/layout/composables/layout";
import { useUserStore } from "@/stores/user";
import { mapActions } from "pinia";
import _ from 'lodash';
import Column from "primevue/column";

const { contextPath } = useLayout();

const loading2 = ref(null);
const products = ref(null);
const bookingList = ref({});
const expandedRows = ref([]);
const displayModal = ref(false);
const roomDetails = ref({});
const nameRoom = ref({});

const listBooking = mapActions(useUserStore, ['getBookingList'])

const productService = new ProductService();

onBeforeMount(async () => {
  productService
    .getProductsWithOrdersSmall()
    .then((data) => (products.value = data));

  try {
    bookingList.value = await listBooking.getBookingList()
    const groupRoom = _.groupBy(bookingList.value, 'title')
    // nameRoom.value = groupRoom
    console.log(bookingList.value)
    const lengthObj = Object.keys(groupRoom)
    console.log(lengthObj)
    nameRoom.value = lengthObj
    console.log(nameRoom.value)
  } catch (error) {
    console.log(error)
  }
  
  loading2.value = false;

});

const editTrainerRoom = (id: any) => {
  displayModal.value = true;
  roomDetails.value = id;
};

const closeEdit = () => {
  displayModal.value = false;
};

const expandAll = () => {
  expandedRows.value = products.value.filter((p) => p.id);
};
const collapseAll = () => {
  expandedRows.value = null;
};
const formatCurrency = (value) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const formatDate = (value) => {
  return value.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
</script>

<style scoped lang="scss">
@import "@/assets/demo/styles/badges.scss";

::v-deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>