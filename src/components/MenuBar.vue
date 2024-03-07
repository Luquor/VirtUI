<script setup>

    import { RouterLink } from 'vue-router';    

</script>


<template>
    <h2 id="nomClusterHeader">NomCluster</h2>


    <div class="headerButton">
        <router-link class="router-link" to="/container/add">New Container</router-link>
        <router-link class="router-link" to="/">Containers</router-link>
        <router-link class="router-link" to="/about">A propos</router-link>
        <router-link class="router-link" to="/container">Container</router-link>
    </div>

    <div class="test">
        <div class="partieagauche">
            <h2>NomCluster</h2>
            <div class="listeContainers">
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<style scoped>

.listeContainers > p {
    padding-left: 1em;
}

#nomClusterHeader {
    text-align: center;
}

.headerButton {
    display: flex;
    justify-content: space-evenly
}

.router-link {
    padding: 6px 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
    border-radius: 6px;
    border: none;

    background: #6E6D70;
    box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.12);
    color: #DFDEDF;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    text-decoration: none;
    margin-bottom: 1em;
}

.router-link:focus {
  box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
  outline: 0;
}


</style>