// import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/layout/AppLayout.vue';
import Error from '@/views/Error.vue';
const Login = () => import("@/views/Login.vue");
import { getAuth, onAuthStateChanged, UserCredential } from 'firebase/auth';

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user)
      },
      reject
    )
  })
}
const ifNotAuthenticated = async (to: any, from: any, next: any) => {
     if(await getCurrentUser()) {
        next("/")
     } else{
        if (to.path === "/") {
          next("/");
        }
        next()
     }
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/register',
    name: 'Registration',
    component: () => import('@/views/Registration.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/',
    name: 'Home',
    component: AppLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: '/calendar',
        name: 'Calendar',
        component: () => import('@/components/CalendarTest.vue')
      },
      {
        path: '/calendar-demo',
        name: 'CalendarDemo',
        component: () => import('@/components/CalendarDemo.vue')
      },
      {
        path: '/hr/user-list',
        name: 'UserList',
        component: () => import('@/views/HR/User/UserList.vue')
      },
      {
        path: '/admin/booking-list',
        name: 'BookingList',
        component: () => import('@/views/Admin/Booking/BookingList.vue')
      },
      {
        path: '/admin/create-room',
        name: 'CreateRoom',
        component: () => import('@/views/Admin/Booking/CreateRoom.vue')
      },
      {
        path: '/room-list',
        name: 'RoomList',
        component: () => import('@/views/Room/RoomList.vue')
      },
      {
        path: '/trainee-list',
        name: 'TraineeList',
        component: () => import('@/views/Trainee/TraineeList.vue')
      },
      {
        path: '/hr/staff',
        name: 'StaffManage',
        component: () => import('@/views/HR/StaffManage.vue')
      },
    ],
  },
  { path: "/:pathMatch(.*)*", component: Error },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    if(await getCurrentUser()) {
      next()
    } else{
      next('/login')
    }
  } else {
    next()
  }
});

export default router
