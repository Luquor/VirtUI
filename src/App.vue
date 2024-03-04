<script setup>

import ContainerButton from './components/ContainerButton.vue';
import Td from './components/VueConteneur/Td.vue';
import Card from './components/Card.vue';

</script>
<template>
	
<ContainerButton class="newContainer">Salut</ContainerButton>
<Td class="test">Coucou</Td>
<div id="index">
    <nav class="nav-bar">
        <ContainerButton class="newContainer">Nouveau conteneur</ContainerButton>
    </nav>

    <Card>
        Test coucou
    </Card>

</div>

</template>
