import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView.vue';
import Movies from '../views/MovieView.vue';
import Series from '../views/SerieView.vue';
import Cart from '../views/CartView.vue';
import Library from '../views/LibraryView.vue';
import Admin from '../views/AdminTerminalView.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/movies', component: Movies },
  { path: '/series', component: Series },
  { path: '/cart', component: Cart },
  { path: '/library', component: Library},
  { path: '/admin', component: Admin},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
