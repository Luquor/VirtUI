<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router';

import '@spectrum-css/treeview/index.css'

const props = defineProps({
  model: Object
})

const isOpen = ref(false)
const isFolder = computed(() => {
  return props.model.children && props.model.children.length
})

function toggle() {
  isOpen.value = !isOpen.value
}

function changeType() {
  if (!isFolder.value) {
    props.model.children = []
    isOpen.value = true
  }
}
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <li>
    <div
      :class="{ bold: isFolder }"
      @click="toggle"
      @dblclick="changeType">
      <span v-if="isFolder" class="spectrum-TreeView-itemLabel">{{ model.name }}</span>
      <router-link v-if="!isFolder" :to="`/container/${model.name}`" class="router-link spectrum-TreeView-item">{{ model.name }}</router-link>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <TreeItem
        v-for="model in model.children"
        :model="model">
      </TreeItem>
    </ul>
  </li>
</template>

<style scoped>
  .material-symbols-outlined {
    font-size: 15px;
  }

  div {
    color: white;
  }



  .router-link {

    background-color: white; /* Green */
    border: none;
    border-radius: 5px;
    color: black;
    padding: 4px 8px;
    text-align: center;
    margin: 5px;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;

  }
</style>