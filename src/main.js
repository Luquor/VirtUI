import { createApp } from 'vue';
import { Terminal } from '@xterm/xterm';


import * as VueRouter from 'vue-router';
import Home from './pages/HomePage.vue';
import About from './pages/About.vue';

import './style.css'

import App from './App.vue';
import Container from './pages/Container.vue';

const app = createApp(App);


const routes = [
  { path: '/', component: Home},
  { path: '/about', component: About},
  { path: '/container', component: Container}
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});



app.use(router);

app.mount('#app');
