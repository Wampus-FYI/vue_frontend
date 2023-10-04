// Use vue-router to achieve routing configuration
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // routing option hash
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/home/index.vue'),
      name: 'home'
    },
    {
      path: '/details',
      component: () => import('@/views/housing_details/index.vue'),
      name: 'housing_d'
    },
    {
      path: '/survey',
      component: () => import('@/views/survey/index.vue'),
      name: 'survey'
    },
    {
      path: '/404',
      component: () => import('@/views/404/index.vue'),
      name: '404'
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '404',
      name: 'Any'
    }
  ],
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
