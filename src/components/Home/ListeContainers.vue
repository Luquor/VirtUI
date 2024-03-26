<script setup>
import Container from "./VueContainer.vue"

import Api from "../../api/Api.js"
import {onMounted, ref} from "vue";

let clusters = ref([])

onMounted(async () => {
  const data =  await Api.getInstance().getClusters();
  for (const cluster of data) {
    clusters.value.push({"name": cluster.metadata.server_name, instances: await Api.getInstance().getContainersFromCluster(cluster.metadata.server_name)})
  }
})


</script>


<template>

        <div class="cluster" v-for="cluster in clusters">
          <h1>{{ cluster.name }}</h1>
          <div class="cards">
            <Container v-for="container in cluster.instances" :status=container.metadata.status>
              {{  container.metadata.name }}
            </Container>
          </div>
        </div>



</template>
<style scoped>

div.cluster {
  margin: 50px;
}




</style>