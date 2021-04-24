import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import 'prismjs/themes/prism-tomorrow.css'
import Home from './pages/Home.vue'
import Categories from './pages/Categories.vue'
import Questions from './pages/Questions.vue'
import App from './App.vue'

import './css/global.less'

const app = createApp( App )

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'categories',
    path: '/categories',
    component: Categories,
  },
  {
    path: '/questions/:pid/:cid',
    component: Questions,
  },
]

const router = createRouter( {
  history: createWebHashHistory(),
  routes,
} )

app.use( router )
app.mount( '#app' )
