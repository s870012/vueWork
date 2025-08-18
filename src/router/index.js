import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/week1',
      component: () => import('../views/Week-1.vue'),
    },
    {
      path: '/signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignupView.vue'),
    },
    {
      path: '/todo',
      component: () => import('../views/TodoView.vue'),
    },
    {
      path: '/week3',
      component: () => import('../views/Week-3.vue'),
    },
  ],
})

export default router
