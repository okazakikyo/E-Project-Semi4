// import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/layout/AppLayout.vue';
import HomeLayout from '@/layout/HomeLayout.vue';
import Error from '@/views/Error.vue';
import Home from '@/views/User/Home.vue';
import RoomDetail from '@/views/User/RoomDetail.vue';
const Login = () => import("@/views/Login.vue");
import UserCreate from '@/views/HR/User/UserCreate.vue';
// import { getAuth, onAuthStateChanged, UserCredential } from 'firebase/auth';

// const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const removeListener = onAuthStateChanged(
//       getAuth(),
//       (user) => {
//         removeListener();
//         resolve(user)
//       },
//       reject
//     )
//   })
// }
const ifNotAuthenticated = async (to: any, from: any, next: any) => {
  const userInfo: any = JSON.parse(localStorage.getItem("user"));
     if(userInfo) {
        next("/")
     } else{
        if (to.path === "/") {
          next("/");
        }
        next()
     }
}

const ifAuthenticated = (async (to: any, from: any, next: any) => {
  const userInfo: any = JSON.parse(localStorage.getItem("user"));
    if(userInfo) {
      next()
    } else{
      next('/login')
    }
});

const routes = [
  {
    path: '/user',
    name: 'HomeUser',
    component: HomeLayout,
    children: [
      {
        path: '/user/home',
        name: 'UserHome',
        component: Home
      },
      {
        path: '/user/home/room/:id?',
        name: 'RoomDetail',
        component: RoomDetail
      }
    ]
  },
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
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      // {
      //   path: '/calendar',
      //   name: 'Calendar',
      //   component: () => import('@/components/CalendarTest.vue')
      // },
      {
        path: '/calendar-demo',
        name: 'CalendarDemo',
        component: () => import('@/components/CalendarDemo.vue')
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
        path: '/hr/staff',
        name: 'StaffManage',
        component: () => import('@/views/HR/StaffManage.vue')
      },
      {
        path: '/hr/user-account',
        name: 'UserCreate',
        component: UserCreate
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

// router.beforeEach(async (to, from, next) => {
//   const userInfo: any = JSON.parse(localStorage.getItem("user"));
  // if(to.matched.some((record) => record.meta.requiresAuth)) {
  //   if(await getCurrentUser()) {
  //     next()
  //   } else{
  //     next('/login')
  //   }
  // } else {
  //   next()
  // }
// });

export default router
