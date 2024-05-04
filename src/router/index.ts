import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PhaseDisplayView from '../views/PhaseDisplayView.vue'
import FicheJoueurView from '../views/FicheJoueurView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    name: 'phase',
    component: PhaseDisplayView
  },
  {
    path: '/fiche',
    name: 'fiche',
    component: FicheJoueurView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
