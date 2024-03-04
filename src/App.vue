<script setup>

import ContainerButton from './components/ContainerButton.vue';

import { RouterLink } from 'vue-router';

</script>
<template>


<div id="index">
    <nav class="nav-bar">
        <ContainerButton class="newContainer">Nouveau conteneur</ContainerButton>
    </nav>

  <p>
      <!-- use the router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will render an `<a>` tag with -->
      <!-- the correct `href` attribute -->
      <router-link class="router-link" to="/">Containers</router-link>
      <router-link class="router-link" to="/about">A propos</router-link>
    </p>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>

</div>

</template>

<style scoped>
  
.router-link 
{
  color: blue;
  padding: 10px 15px;
  background: transparent;
  text-decoration: none;
  border: 1px solid blue;
  margin: 10px;
}


</style>
