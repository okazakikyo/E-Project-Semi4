<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import ProductService from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';
import { useUserStore } from '@/stores/user';
import { useErrorStore } from '@/stores/errors';
import { mapActions } from 'pinia';
import { useLoading } from "vue-loading-overlay";
import _ from 'lodash';

const { isDarkTheme, contextPath } = useLayout();

const user = ref({});
const room = ref({});
const booking = ref({});
const lineOptions = ref(null);
const productService = new ProductService();

const callList = mapActions(useUserStore, ['getListUser', 'getBookingList', 'getRoomList'])


onMounted(async () => {
    const $loading = useLoading();
    const loader = $loading.show({});
    try {
        user.value = await callList.getListUser();
        booking.value = await callList.getBookingList();
        room.value = await callList.getRoomList();
    } catch (error) {}
    loader.hide();
});

const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};

const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};

watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Bookings</span>
                        <div class="text-900 font-medium text-xl">{{ _.size(booking) }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-book text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium"></span>
                <span class="text-500">visit</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Users</span>
                        <div class="text-900 font-medium text-xl">{{ _.size(user) }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium"></span>
                <span class="text-500">registered</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Rooms</span>
                        <div class="text-900 font-medium text-xl">{{ _.size(room) }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-home text-purple-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium"></span>
                <span class="text-500">rooms</span>
            </div>
        </div>
    </div>
</template>
