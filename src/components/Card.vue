<template>
    <div class="card">
        <div class="card-header">
            <h2><slot /></h2>
        </div>
        <div class="card-status">
            <p><slot /></p>
        </div>
        <div class="card-actions">
            <button class="start">Lancer</button>
            <button class="stop">Stopper</button>
            <button class="restart">Relancer</button>
            <button class="delete">Supprimer</button>
        </div>
    </div>
</template>


<style scoped>

</style>