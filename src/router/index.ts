import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Admin from '../views/admin/index.vue'
import NotFound from '../views/not-found.vue'

const routes = [
  { path: '/', component: Home },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        component: () => import('../views/admin/dashboard/index.vue')
      },
      {
        path: 'students',
        component: () => import('../views/admin/student-list/index.vue')
      },
      {
        path: 'students/create',
        component: () => import('../views/admin/student-create/index.vue'),
        children: [
          {
            path: '',
            component: () =>
              import('../views/admin/student-create/step-personal.vue')
          },
          {
            path: 'education',
            component: () =>
              import('../views/admin/student-create/step-education.vue')
          },
          {
            path: 'confirmation',
            component: () =>
              import('../views/admin/student-create/step-confirmation.vue')
          }
        ]
      },
      {
        path: 'students/:id',
        component: () => import('../views/admin/student-detail/index.vue')
      },
      {
        path: 'teachers',
        component: () => import('../views/admin/teacher-list/index.vue')
      },
      {
        path: 'teachers/create',
        component: () => import('../views/admin/teacher-create/index.vue')
      },
      {
        path: 'teachers/:id',
        component: () => import('../views/admin/teacher-detail/index.vue')
      }
    ]
  },
  { path: '/:_(.*)', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
