import {createApp, ref} from 'vue';


import * as VueRouter from 'vue-router';
import Home from './pages/HomePage.vue';
import About from './pages/About.vue';
import AddContainer from './pages/AddContainer.vue';
import Container from './pages/Container.vue';
import GestionCluster from './pages/GestionCluster.vue';

import './style.css'
import "toastify-js/src/toastify.css"

import App from './App.vue';
import WConsole from "./api/WConsole.js";
import Auth from "./pages/Auth.vue";

const app = createApp(App);


const routes = [
  { path: '/', component: Home},
  { path: '/about', component: About},
  { path: '/container/:cluster/:container', component: Container},
  { path: '/container/add', component: AddContainer},
  { path: '/cluster', component: GestionCluster},
  { path: '/auth', component: Auth}
];



const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});




app.use(router);

app.mount('#app');
