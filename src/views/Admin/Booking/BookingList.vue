<template>
  <div class="grid">
    <!-- <div class="col-12">
      <div class="card">
        <h5>Row Expand</h5>
        <DataTable :value="products" v-model:expandedRows="expandedRows" dataKey="id" responsiveLayout="scroll">
          <template #header>
            <div>
              <Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2 mb-2" />
              <Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" class="mb-2" />
            </div>
          </template>
          <Column :expander="true" headerStyle="width: 3rem" />
          <Column field="name" header="Name" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column header="Image">
            <template #body="slotProps">
              <img :src="
                contextPath + 'demo/images/product/' + slotProps.data.image
              " :alt="slotProps.data.image" class="shadow-2" width="100" />
            </template>
          </Column>
          <Column field="price" header="Price" :sortable="true">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
          </Column>
          <Column field="category" header="Category" :sortable="true">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.category) }}
            </template>
          </Column>
          <Column field="rating" header="Reviews" :sortable="true">
            <template #body="slotProps">
              <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
            </template>
          </Column>
          <Column field="inventoryStatus" header="Status" :sortable="true">
            <template #body="slotProps">
              <span :class="
                'product-badge status-' +
                (slotProps.data.inventoryStatus
                  ? slotProps.data.inventoryStatus.toLowerCase()
                  : '')
              ">{{ slotProps.data.inventoryStatus }}</span>
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3">
              <h5>Orders for {{ slotProps.data.name }}</h5>
              <DataTable :value="slotProps.data.orders" responsiveLayout="scroll">
                <Column field="id" header="Id" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.id }}
                  </template>
                </Column>
                <Column field="customer" header="Customer" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.customer }}
                  </template>
                </Column>
                <Column field="date" header="Date" :sortable="true">
                  <template #body="slotProps">
                    {{ slotProps.data.date }}
                  </template>
                </Column>
                <Column field="amount" header="Amount" :sortable="true">
                  <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.amount) }}
                  </template>
                </Column>
                <Column field="status" header="Status" :sortable="true">
                  <template #body="slotProps">
                    <span :class="
                      'order-badge order-' +
                      (slotProps.data.status
                        ? slotProps.data.status.toLowerCase()
                        : '')
                    ">{{ slotProps.data.status }}</span>
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
          <Column field="title" header="Name" :sortable="true">
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

const { contextPath } = useLayout();

const loading2 = ref(null);
const products = ref(null);
const bookingList = ref(null);
const expandedRows = ref([]);
const displayModal = ref(false);
const roomDetails = ref({});

const productService = new ProductService();

onBeforeMount(() => {
  productService
    .getProductsWithOrdersSmall()
    .then((data) => (products.value = data));

  productService
    .getBookingList()
    .then((data) => (bookingList.value = data));
  
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
