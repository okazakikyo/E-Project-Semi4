// import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/layout/AppLayout.vue';
import Error from '@/views/Error.vue';
const Login = () => import("@/views/Login.vue");

const ifNotAuthenticated = (to: any, from: any, next: any) => {
  if (to.path !== '/login') {
    //if not logead and join to other page distinc of login or register redirect to login
    next('/login')
  }
  else {
    if (to.path === "/") {
      next("/top");
    }
    next()
  }
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Registration',
    component: () => import('@/views/Registration.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: AppLayout,
    // beforeEnter: ifNotAuthenticated,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: '/calendar',
        name: 'Calendar',
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
  //     {
  //       path: '/theme/colors',
  //       name: 'Colors',
  //       component: () => import('@/views/theme/Colors.vue'),
  //     },
  //     {
  //       path: '/theme/typography',
  //       name: 'Typography',
  //       component: () => import('@/views/theme/Typography.vue'),
  //     },
  //     {
  //       path: '/base',
  //       name: 'Base',
  //       component: {
  //         render() {
  //           return h(resolveComponent('router-view'))
  //         },
  //       },
  //       redirect: '/base/breadcrumbs',
  //       children: [
  //         {
  //           path: '/base/accordion',
  //           name: 'Accordion',
  //           component: () => import('@/views/base/Accordion.vue'),
  //         },
  //         {
  //           path: '/base/breadcrumbs',
  //           name: 'Breadcrumbs',
  //           component: () => import('@/views/base/Breadcrumbs.vue'),
  //         },
  //         {
  //           path: '/base/cards',
  //           name: 'Cards',
  //           component: () => import('@/views/base/Cards.vue'),
  //         },
  //         {
  //           path: '/base/carousels',
  //           name: 'Carousels',
  //           component: () => import('@/views/base/Carousels.vue'),
  //         },
  //         {
  //           path: '/base/collapses',
  //           name: 'Collapses',
  //           component: () => import('@/views/base/Collapses.vue'),
  //         },
  //         {
  //           path: '/base/list-groups',
  //           name: 'List Groups',
  //           component: () => import('@/views/base/ListGroups.vue'),
  //         },
  //         {
  //           path: '/base/navs',
  //           name: 'Navs',
  //           component: () => import('@/views/base/Navs.vue'),
  //         },
  //         {
  //           path: '/base/paginations',
  //           name: 'Paginations',
  //           component: () => import('@/views/base/Paginations.vue'),
  //         },
  //         {
  //           path: '/base/placeholders',
  //           name: 'Placeholders',
  //           component: () => import('@/views/base/Placeholders.vue'),
  //         },
  //         {
  //           path: '/base/popovers',
  //           name: 'Popovers',
  //           component: () => import('@/views/base/Popovers.vue'),
  //         },
  //         {
  //           path: '/base/progress',
  //           name: 'Progress',
  //           component: () => import('@/views/base/Progress.vue'),
  //         },
  //         {
  //           path: '/base/spinners',
  //           name: 'Spinners',
  //           component: () => import('@/views/base/Spinners.vue'),
  //         },
  //         {
  //           path: '/base/tables',
  //           name: 'Tables',
  //           component: () => import('@/views/base/Tables.vue'),
  //         },
  //         {
  //           path: '/base/tooltips',
  //           name: 'Tooltips',
  //           component: () => import('@/views/base/Tooltips.vue'),
  //         },
  //       ],
  //     },
  //     {
  //       path: '/buttons',
  //       name: 'Buttons',
  //       component: {
  //         render() {
  //           return h(resolveComponent('router-view'))
  //         },
  //       },
  //       redirect: '/buttons/standard-buttons',
  //       children: [
  //         {
  //           path: '/buttons/standard-buttons',
  //           name: 'Buttons',
  //           component: () => import('@/views/buttons/Buttons.vue'),
  //         },
  //         {
  //           path: '/buttons/dropdowns',
  //           name: 'Dropdowns',
  //           component: () => import('@/views/buttons/Dropdowns.vue'),
  //         },
  //         {
  //           path: '/buttons/button-groups',
  //           name: 'Button Groups',
  //           component: () => import('@/views/buttons/ButtonGroups.vue'),
  //         },
  //       ],
  //     },
  //     {
  //       path: '/forms',
  //       name: 'Forms',
  //       component: {
  //         render() {
  //           return h(resolveComponent('router-view'))
  //         },
  //       },
  //       redirect: '/forms/form-control',
  //       children: [
  //         {
  //           path: '/forms/form-control',
  //           name: 'Form Control',
  //           component: () => import('@/views/forms/FormControl.vue'),
  //         },
  //         {
  //           path: '/forms/select',
  //           name: 'Select',
  //           component: () => import('@/views/forms/Select.vue'),
  //         },
  //         {
  //           path: '/forms/checks-radios',
  //           name: 'Checks & Radios',
  //           component: () => import('@/views/forms/ChecksRadios.vue'),
  //         },
  //         {
  //           path: '/forms/range',
  //           name: 'Range',
  //           component: () => import('@/views/forms/Range.vue'),
  //         },
  //         {
  //           path: '/forms/input-group',
  //           name: 'Input Group',
  //           component: () => import('@/views/forms/InputGroup.vue'),
  //         },
  //         {
  //           path: '/forms/floating-labels',
  //           name: 'Floating Labels',
  //           component: () => import('@/views/forms/FloatingLabels.vue'),
  //         },
  //         {
  //           path: '/forms/layout',
  //           name: 'Layout',
  //           component: () => import('@/views/forms/Layout.vue'),
  //         },
  //         {
  //           path: '/forms/validation',
  //           name: 'Validation',
  //           component: () => import('@/views/forms/Validation.vue'),
  //         },
  //       ],
  //     },
  //     {
  //       path: '/charts',
  //       name: 'Charts',
  //       component: () => import('@/views/charts/Charts.vue'),
  //     },
  //     {
  //       path: '/icons',
  //       name: 'Icons',
  //       component: {
  //         render() {
  //           return h(resolveComponent('router-view'))
  //         },
  //       },
  //       redirect: '/icons/coreui-icons',
  //       children: [
  //         {
  //           path: '/icons/coreui-icons',
  //           name: 'CoreUI Icons',
  //           component: () => import('@/views/icons/CoreUIIcons.vue'),
  //         },
  //         {
  //           path: '/icons/brands',
  //           name: 'Brands',
  //           component: () => import('@/views/icons/Brands.vue'),
  //         },
  //         {
  //           path: '/icons/flags',
  //           name: 'Flags',
  //           component: () => import('@/views/icons/Flags.vue'),
  //         },
  //       ],
  //     },
  //     {
  //       path: '/notifications',
  //       name: 'Notifications',
  //       component: {
  //         render() {
  //           return h(resolveComponent('router-view'))
  //         },
  //       },
  //       redirect: '/notifications/alerts',
  //       children: [
  //         {
  //           path: '/notifications/alerts',
  //           name: 'Alerts',
  //           component: () => import('@/views/notifications/Alerts.vue'),
  //         },
  //         {
  //           path: '/notifications/badges',
  //           name: 'Badges',
  //           component: () => import('@/views/notifications/Badges.vue'),
  //         },
  //         {
  //           path: '/notifications/modals',
  //           name: 'Modals',
  //           component: () => import('@/views/notifications/Modals.vue'),
  //         },
  //       ],
  //     },
  //     {
  //       path: '/widgets',
  //       name: 'Widgets',
  //       component: () => import('@/views/widgets/Widgets.vue'),
  //     },
  //   ],
  // },
  // {
  //   path: '/pages',
  //   redirect: '/pages/404',
  //   name: 'Pages',
  //   component: {
  //     render() {
  //       return h(resolveComponent('router-view'))
  //     },
  //   },
  //   children: [
  //     {
  //       path: '404',
  //       name: 'Page404',
  //       component: () => import('@/views/pages/Page404'),
  //     },
  //     {
  //       path: '500',
  //       name: 'Page500',
  //       component: () => import('@/views/pages/Page500'),
  //     },
  //     {
  //       path: 'login',
  //       name: 'Login',
  //       component: () => import('@/views/pages/Login'),
  //     },
  //     {
  //       path: 'register',
  //       name: 'Register',
  //       component: () => import('@/views/pages/Register'),
  //     },
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


export default router
