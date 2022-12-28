<script setup>
import { onMounted, ref, onBeforeMount } from 'vue';
// import { getAuth, signOut } from 'firebase/auth';
import { useUserStore } from '@/stores/user';
import router from '@/router';

import AppMenuItem from './AppMenuItem.vue';
import { mapActions, mapState } from 'pinia';

const isLoggedIn = ref(false);
const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'List management',
        items: [
            { 
                label: 'User', icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'User List',
                        icon: 'pi pi-fw pi-list',
                        to: '/hr/user-list'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/erorr'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            { 
                label: 'Staff', icon: 'pi pi-fw pi-id-card',
                items: [
                    {
                        label: 'Trainee List',
                        icon: 'pi pi-fw pi-list',
                        to: '/trainee-list'
                    },
                    {
                        label: 'Staff Manage',
                        icon: 'pi pi-fw pi-user',
                        to: '/hr/staff'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            { 
                label: 'Booking', icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Booking List',
                        icon: 'pi pi-fw pi-list',
                        to: '/admin/booking-list'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            { 
                label: 'Department', icon: 'pi pi-fw pi-home',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            { 
                label: 'Training', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            { 
                label: 'Room', icon: 'pi pi-fw pi-home',
                items: [
                    {
                        label: 'Room List',
                        icon: 'pi pi-fw pi-list',
                        to: '/room-list'
                    },
                    {
                        label: 'Create Room',
                        icon: 'pi pi-fw pi-pencil',
                        to: '/admin/create-room'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
        ]
    },
]);
const handleSignOut = () => {
    // let auth = getAuth()
    // signOut(auth).then(() => {
    //     router.push("/login")
    // })
    localStorage.removeItem("user");
    router.push("/login")
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
