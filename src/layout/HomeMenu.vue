<script setup>
import { onMounted, ref, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';

import AppMenuItem from './AppMenuItem.vue';
import { mapActions, mapState } from 'pinia';

const isLoggedIn = ref(false);
const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Home', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'User Manage',
        items: [
            { label: 'Booking history', icon: 'pi pi-fw pi-user', to: '/booking-history' },
        ]
    },
]);
const handleSignOut = () => {
    localStorage.removeItem("user");
    router.push({ name: 'UserLogin' })
}
</script>

<template>
    <ul class="layout-menu">
        <div>
            <template v-for="(item, i) in model" :key="item">
                {{ item.separator }}
                <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
                <li v-if="item.separator" class="menu-separator"></li>
            </template>
        </div>
        <div tabindex="0" class="logout" @click="handleSignOut()">
            <i class="pi pi-fw pi-sign-in layout-menuitem-icon mr-2"></i>
            <span class="text-menu">Logout</span>
        </div>
    </ul>
</template>

<style lang="scss" scoped>
.logout{
    display: flex;
    align-items: center;
    position: relative;
    outline: 0 none;
    color: var(--text-color);
    cursor: pointer;
    padding: 0.75rem 1rem;
    border-radius: 12px;
    transition: background-color 0.2s, box-shadow 0.2s;
    &:hover{
        background-color: var(--surface-hover);
    }
    &:focus{
        outline: 0 none;
        outline-offset: 0;
        transition: box-shadow 0.2s;
        box-shadow: inset var(--focus-ring);
    }
}
.text-menu{
    font-size: 12px;
    font-weight: bold;
}
</style>
