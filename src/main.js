import { createApp } from 'vue';
import * as VueRouter from 'vue-router';
import Home from './pages/HomePage.vue';
import About from './pages/About.vue';

import './style.css'

import App from './App.vue';

const app = createApp(App);


const routes = [
  { path: '/', component: Home},
  { path: '/about', component: About}
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

app.use(router);

app.mount('#app');
