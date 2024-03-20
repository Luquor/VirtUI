<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router';

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
    addChild()
    isOpen.value = true
  }
}
</script>

<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <link rel="stylesheet" href="../../node_modules/@spectrum-css/treeview/index.css" />
  <li>
    <div
      :class="{ bold: isFolder }"
      @click="toggle"
      @dblclick="changeType">
      <span v-if="isFolder && !isOpen" class="spectrum-TreeView-itemLabel">{{ model.name }} </span>
      <span v-if="isFolder && isOpen" class="spectrum-TreeView-itemLabel">{{ model.name }} </span>
      <router-link v-if="!isFolder" :to="`/container/${model.name}`" class="router-link spectrum-TreeView-item">{{ model.name }} </router-link>
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <!--
        A component can recursively render itself using its
        "name" option (inferred from filename if using SFC)
      -->
      <TreeItem
        class="item"
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

  
</style>