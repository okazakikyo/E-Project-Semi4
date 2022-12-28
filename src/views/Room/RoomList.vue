<script setup>
import { ref, onMounted } from 'vue';
import ProductService from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';
import { useUserStore } from '@/stores/user';
import { mapActions, mapState } from 'pinia';
import { useLoading } from "vue-loading-overlay";
import { useToast } from "primevue/usetoast";

const { contextPath } = useLayout();

const toast = useToast();
const roomList = ref(null);
const layout = ref('grid');
const sortKey = ref(null);
const sortOrder = ref(null);
const sortField = ref(null);
const displayModal = ref(false);
const roomData = ref({});

const sortSlot = ref([
    { label: 'Slot High to Low', value: '!capacity' },
    { label: 'Slot Low to High', value: 'capacity' }
])

const productService = new ProductService();

const roomMethod = mapActions(useUserStore, ['getRoomList', 'getRoomById', 'updateRoom'])
const roomStore = mapState(useUserStore, ['roomList'])

onMounted( async () => {
    const $loading = useLoading();
    const loader = $loading.show({});

    productService.getRoomList().then((data) => (roomList.value = data));

    await roomMethod.getRoomList();
    loader.hide();
});

const onSortSlot = (event) => {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    } else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};

const roomDetails = async (id) => {
    const $loading = useLoading();
    const loader = $loading.show({});
    displayModal.value = true
    roomData.value = await roomMethod.getRoomById(id)
    loader.hide();
}

const updateRoom = async (id, data) => {
    const $loading = useLoading();
    const loader = $loading.show({});
    await roomMethod.updateRoom(id ,data);
    displayModal.value = false
    toast.add({severity:'success', summary: 'Success Message', detail:'Save change success', life: 3000});
    await roomMethod.getRoomList();
    loader.hide();
}

</script>

<template>
    <div class="grid">
        <Toast/>
        <div class="col-12">
            <div class="card">
                <h5>Room List</h5>
                <DataView :value="roomStore.roomList()" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
                    <template #header>
                        <div class="grid grid-nogutter">
                            <div class="col-6 text-left">
                                <Dropdown v-model="sortKey" :options="sortSlot" optionLabel="label" placeholder="Sort By Slot" @change="onSortSlot($event)" />
                            </div>
                            <div class="col-6 text-right">
                                <DataViewLayoutOptions v-model="layout" />
                            </div>
                        </div>
                    </template>
                    <template #list="slotProps">
                        <div class="col-12">
                            <div class="flex flex-column md:flex-row align-items-center p-3 w-full">
                                <img :src="contextPath + 'demo/images/room/' + slotProps.data.image" :alt="slotProps.data.name" class="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
                                <div class="flex-1 text-center md:text-left">
                                    <div class="font-bold text-2xl">{{ slotProps.data.name }}</div>
                                    <div class="mb-3">{{ slotProps.data.description }}</div>
                                    <div class="flex align-items-center">
                                        <i class="pi pi-tag mr-2"></i>
                                    </div>
                                </div>
                                <div class="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
                                    <span class="text-2xl font-semibold mb-2 align-self-center md:align-self-end">{{ slotProps.data.capacity }} slots</span>
                                    <Button icon="pi pi-book" label="Booking" :disabled="slotProps.data.active === 0" class="mb-2" @click="roomDetails(slotProps.data.id)"></Button>
                                    <span :class="'product-badge status-' + (slotProps.data.active ? 'instock' : 'outofstock')">
                                        {{ slotProps.data.active ? 'Active' : 'Deactive' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </template>

                    <template #grid="slotProps">
                        <div class="col-12 md:col-4">
                            <div class="card m-3 border-1 surface-border">
                                <div class="flex align-items-center justify-content-between">
                                    <div class="flex align-items-center">
                                        <i class="pi pi-tag mr-2"></i>
                                    </div>
                                    <span :class="'product-badge status-' + (slotProps.data.active ? 'instock' : 'outofstock')">
                                        {{ slotProps.data.active ? 'Active' : 'Deactive' }}
                                    </span>
                                </div>
                                <div class="text-center">
                                    <img :src="contextPath + 'demo/images/room/' + slotProps.data.image" :alt="slotProps.data.name" class="w-9 shadow-2 my-3 mx-0" />
                                    <div class="text-2xl font-bold">{{ slotProps.data.name }}</div>
                                    <div class="mb-3">{{ slotProps.data.description }}</div>
                                </div>
                                <div class="flex align-items-center justify-content-between">
                                    <span class="text-2xl font-semibold">{{ slotProps.data.capacity }} slots</span>
                                    <Button icon="pi pi-book" :disabled="slotProps.data.active === 0" @click="roomDetails(slotProps.data.id)"></Button>
                                </div>
                            </div>
                        </div>
                    </template>
                </DataView>
            </div>
        </div>
    </div>
    <!-- Edit modal -->
  <Dialog header="Header" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }" :modal="true">
      <div class="row m-0">
        <label class="col">Name</label>
        <InputText class="col" v-model="roomData.name"></InputText>
      </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="displayModal = false" class="p-button-text" />
      <Button label="Yes" icon="pi pi-check" @click="updateRoom(roomData.id, roomData)" autofocus />
    </template>
  </Dialog>
</template>

<style scoped lang="scss">
@import '@/assets/demo/styles/badges.scss';
</style>
