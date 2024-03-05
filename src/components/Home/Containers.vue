<script setup>
import Container from "./Container.vue"

</script>
<script>

import Api from "../../api/Api.js"

//const containers = await Api.getInstance().getContainers()

const containers = []

console.log(containers);


</script>

<template>

   <div class="cards">
        <Container v-for="(container, item) in containers" :status=container.metadata.status_code>
            {{  container.metadata.name }}
        </Container>
   </div>

</template>