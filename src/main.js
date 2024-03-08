import { createApp } from 'vue';
import { Terminal } from '@xterm/xterm';


import * as VueRouter from 'vue-router';
import Home from './pages/HomePage.vue';
import About from './pages/About.vue';
import AddContainer from './pages/AddContainer.vue';

import './style.css'

import App from './App.vue';
import Container from './pages/Container.vue';
import AddContainer from './pages/AddContainer.vue';

const app = createApp(App);


const routes = [
  { path: '/', component: Home},
  { path: '/about', component: About},
  { path: '/container', component: Container},
  { path: '/container/add', component: AddContainer}
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});



app.use(router);

app.mount('#app');
