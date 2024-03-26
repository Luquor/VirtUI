<script setup>

import Terminal from '../components/VueConteneur/Terminal.vue';
import Td from '../components/VueConteneur/Td.vue';
import Nom from '../components/VueConteneur/Nom.vue';


import {Toast} from "../api/Utils.js";

import Api from "../api/Api.js";

import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";

const route = useRoute()

let container = ref({metadata: {status: "LOADING...", created_at: "LOADING...", description: "LOADING...", location: "LOADING..."}});

async function startContainer() {
  Toast("Lancement...")
  Toast(await Api.getInstance().controlContainer(route.params.container, "start"))
}

function stopContainer()
{

}

function restartContainer()
{

}

function deleteContainer()
{

}

onMounted(async () => {
  container.value = await Api.getInstance().getContainer(route.params.container)
  if(!container.value)
  {
    Toastify({

      text: "Une erreur est survenue lors de la récupèration de l'instance",
      close: true,
      position: "right",
      className: "error",
      duration: 200
    }).showToast();
  }
})

watch(
    () => route.params.container,
    async (newName, oldName ) => {
      container.value = {metadata: {status: "LOADING...", created_at: "LOADING...", description: "LOADING...", location: "LOADING..."}};
      container.value = await Api.getInstance().getContainer(route.params.container)
      if(!container.value)
      {
        Toastify({

          text: "Une erreur est survenue lors de la récupèration de l'instance",
          close: true,
          position: "right",
          className: "error",
          duration: 2000
        }).showToast();
      }
    }
)



</script>

<template>
        <div class="partieadroite">
            <div class="info_container">
                <Nom>{{  $route.params.container }}</Nom>
                <table>
                    <tr>
                        <td></td>
                        <Td></Td>
                    </tr>
                    <tr>
                        <td>Code Statut</td>
                        <Td>{{ container.metadata.status }}</Td>
                    </tr>
                    <tr>
                        <td>Date de création</td>
                        <Td>{{ new Date(container.metadata.created_at).toLocaleString("fr") }}</Td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <Td>{{ container.metadata.description}}</Td>
                    </tr>
                    <tr>
                        <td>Localisation</td>
                        <Td>{{ container.metadata.location }}</Td>
                    </tr>


                </table>

                 <div class="actionnable">
                   <Terminal v-if="container.metadata.status === 'Running'">

                   </Terminal>
                   <div class="card-actions">

                     <button @click="startContainer" v-if="container.metadata.status === 'Stopped'" class="start">Lancer</button>
                     <button v-if="container.metadata.status === 'Running'" class="stop">Stopper</button>
                     <button v-if="container.metadata.status === 'Running'" class="restart">Relancer</button>
                     <button class="delete">Supprimer</button>
                   </div>
                 </div>

            </div>
        </div>  
</template>

<style scoped>

  .actionnable
  {
    display: flex;

  }

  .card-actions {
    display: flex;
    flex-direction: column;
    height: 20%;
    gap: 10px;
  }



  #terminal
  {
    width: 90%;
  }

  /* Info container */
  .info_container {
    display: flex;
    flex-direction: column;
    margin: 1em;
    width: 70vw;
  }
  
  /* H1 title */
  .info_container h1 {
    text-align: left;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
  }
  
  /* Table */
  .info_container table {
    border-collapse: collapse;

  }
  
  .info_container table tr {
    border-bottom: 1px solid #ccc;
  }
  
  .info_container table th {
    background-color: #eee;
    text-align: left;
    padding: 2rem;
  }
  
  .info_container table .droite {
    text-align: right;
  }
  /* Terminal container */
  .terminal {
    margin-top: 2rem;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
  }
  
  .terminal h2 {
    text-align: center;
  }
  
  /* Media queries for responsive design */
  @media (max-width: 768px) {
    .partieadroite {
      flex-direction: column-reverse;
    }
  
    .info_container table {
      overflow-x: scroll;
    }
  }
  
</style>