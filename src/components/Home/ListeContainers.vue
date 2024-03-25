<script setup>
import Container from "./Container.vue"

</script>
<script>

import Api from "../../api/Api.js"

let containers = []
containers = []



</script>

<template>

        <div class="cards">
                <Container v-for="(container, item) in containers" :status=container.metadata.status>
                    {{  container.metadata.name }}
                </Container>
        </div>

</template>