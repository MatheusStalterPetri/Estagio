import { createRouter, createWebHistory } from 'vue-router';
import Log from './views/LogView.vue';

const routes = [
      {
        path: '/LogView',
        name: 'LogView',
        component: Log,
      },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
