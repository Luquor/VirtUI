<script setup>

import Terminal from '../components/VueConteneur/Terminal.vue';
import Td from '../components/VueConteneur/Td.vue';
import Nom from '../components/VueConteneur/Nom.vue';


import {ModifyObserver, sleep, Toast} from "../api/Utils.js";

import Api from "../api/Api.js";

import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import JsForm from "../components/Forms/JsForm.vue";
import Group from "../components/Forms/Group.vue";
import JsInput from "../components/Forms/JsInput.vue";

const route = useRoute()

let container = ref({metadata: {status: "LOADING...", created_at: "LOADING...", description: "LOADING...", location: "LOADING..."}});



async function operationStatus(operationID, message)
{
  let operation = await Api.getInstance().getOperation(operationID)
  while(operation.metadata.status === "Running")
  {
    await sleep(1000)
    operation = await Api.getInstance().getOperation(operationID)
  }
  if(operation.metadata.status === "Success")
  {
    Toast(message)
    container.value = await Api.getInstance().getContainer(route.params.container)
  }
  else
  {
    Toast("Une erreur est survenue lors de l'action...")
  }
}
async function startContainer(event) {
  Toast("Lancement...", 3000)
  const actionData = await Api.getInstance().controlContainer(route.params.cluster, route.params.container, "start")
  await operationStatus(actionData.metadata.id, "Lancement terminé")

}

async function stopContainer() {
  Toast("Stop...")
  const actionData = await Api.getInstance().controlContainer(route.params.cluster, route.params.container, "stop")
  await operationStatus(actionData.metadata.id, "Arrêt terminé")

}

async function restartContainer() {
  Toast("Restarting...")
  const actionData = await Api.getInstance().controlContainer(route.params.cluster, route.params.container, "restart")
  await operationStatus(actionData.metadata.id, "Restarting terminé")

}

async function deleteContainer() {
  Toast("Supression...", 2000, "error")
  const deleteData = await Api.getInstance().deleteContainer(route.params.cluster, route.params.container);
  console.log(deleteData);
  await operationStatus(deleteData.metadata.id, "Supression terminé")
  container.value = {metadata: {status: "Supprimé", created_at: "000000", description: "Supprimé", location: "Supprimé"}}
  ModifyObserver.isUpdatedContainer = true

}

onMounted(async () => {



  let containerData = await Api.getInstance().getContainer(route.params.container)
  if(!containerData) {
    Toast("Une erreur est survenue lors de la récupèration de l'instance", 2000, "error");
    container.value = {metadata: {status: "Invalide", created_at: "Invalide", description: "Invalide", location: "Invalide"}};

  }
  else { container.value = containerData}
})

watch(
    () => route.params.container,
    async (newName, oldName ) => {
      container.value = {metadata: {status: "LOADING...", created_at: "LOADING...", description: "LOADING...", location: "LOADING..."}};
      let containerData = await Api.getInstance().getContainer(route.params.container)
      if(!containerData) {
        Toast("Une erreur est survenue lors de la récupèration de l'instance", 2000, "error");
        container.value = {metadata: {status: "Invalide", created_at: "Invalide", description: "Invalide", location: "Invalide"}};

      }
      else { container.value = containerData}

    }
)



</script>

<template>
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
            <Terminal v-if="container.metadata.status === 'Running'"/>
            <div class="card-actions">

              <button @click="startContainer($event)" v-if="container.metadata.status === 'Stopped'" class="start">Lancer</button>
              <button @click="stopContainer($event)" v-if="container.metadata.status === 'Running'" class="stop">Stopper</button>
              <button @click="restartContainer($event)" v-if="container.metadata.status === 'Running'" class="restart">Relancer</button>
              <button @click="deleteContainer($event)" v-if="container.metadata.status !== 'Supprimé'" class="delete">Supprimer</button>
            </div>
          </div>
        <div class="snapshot">
          <js-form>
            <group>
              <js-input label="liste des snapshots">
                <select name="snapshot" id="snapshot">
                  <option value="">snap1 (12/04/2024 - 15:53)</option>
                </select>
              </js-input>
              <js-input label="Restaurer?">
                <input type="button" value="Confirmer la restauration">
              </js-input>
            </group>
          </js-form>
          <js-form>
            <group>
              <js-input label="Créer une snapshot">
                <input type="button" value="Créer une snapshot ">
              </js-input>
            </group>
          </js-form>
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
    width: 98%;
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
</style>