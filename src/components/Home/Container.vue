<script setup>

const props = defineProps(['status'])

</script>

<template>
    <div class="card">
        <div class="card-header">
            <h2><slot /></h2>
        </div>
        <div class="card-status">
            <p>{{  props.status }}</p>
        </div>
        <div class="card-actions">
            <button v-if="props.status == 'Stopped'" class="start">Lancer</button>
            <button v-if="props.status == 'Running'" class="stop">Stopper</button>
            <button v-if="props.status == 'Running'" class="restart">Relancer</button>
            <button class="delete">Supprimer</button>
        </div>
    </div>
</template>