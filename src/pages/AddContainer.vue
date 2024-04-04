<script setup>

import JsForm from '../components/Forms/JsForm.vue';
import Group from '../components/Forms/Group.vue';
import JsInput from '../components/Forms/JsInput.vue';


import Api from "../api/Api.js";


import FormValidator from '../api/FormValidator.js';

import Toastify from "toastify-js/src/toastify-es.js";
import {getTextedRuleInvalidate, ModifyObserver, sleep, Toast} from "../api/Utils.js";
import {onMounted, ref} from "vue";


const images = ref([]);
const clusters = ref([]);




async function operationStatus(operationID, message)
{
  let operation = await Api.getInstance().getOperation(operationID)
  while(operation.metadata.status === "Running")
  {
    await sleep(1000)
    operation = await Api.getInstance().getOperation(operationID)
    console.log(operation)
  }
  if(operation.metadata.status === "Success")
  {
    Toast(message)
  }
  else
  {
    Toast("Une erreur est survenue : \n" + operation.metadata.err, 1000, "warning")
  }
}

onMounted(async () => {
  images.value = await Api.getInstance().getImages()
  clusters.value = await Api.getInstance().getClusters()
})




async function addContainer(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formValidator = new FormValidator(formData, [
    {name: 'name', validator: ['required', 'string', 'max:15']},
    {name: 'image', validator: ['required', 'string', 'min:3']},
    {name: 'cluster', validator: ['required', 'string']}
  ]);

  let [isValide, unRespectedRules] = formValidator.isValidate();
  if (!isValide) {
    console.log(unRespectedRules);
    Toast(getTextedRuleInvalidate(unRespectedRules), 2000)

    return;
  }

  Toast("Création du conteneur...", 1000)
  const operation = await Api.getInstance().createContainer(formData.get("cluster"), formData.get("name"), formData.get("image"))
  await operationStatus(operation.metadata.id, "Création terminé..")
  ModifyObserver.isUpdatedContainer = true;

}




</script>
<template>


<Js-form class="formAddContainer" @submit="addContainer($event)">
	<Group>
		<Js-input class="title" label="Nom du container">
			<input class="name" name="name" type="text">
		</Js-input>
		
	</Group>
	<Group>
		<Js-input class="title" label="Images">
			<select name="image" id="image">
				<option v-for="image in images" :value=image.metadata.fingerprint>{{  image.metadata.properties.os }} ({{ image.metadata.properties.release }}) - {{  image.metadata.update_source.alias }}</option>
			</select>
		</Js-input>
	</Group>
  <Group>
    <Js-input class="title" id="cluster" label="Cluster">
      <select name="cluster" id="cluster">
        <option v-for="cluster in clusters" :value="cluster.metadata.server_name">{{ cluster.metadata.server_name }}</option>
      </select>
    </Js-input>
  </Group>
	<Group>
		<input id="submit" ref="buttonSubmit" type="submit" value="Ajouter le conteneur">
	</Group>
</Js-form>


</template>

<style>

.name {
	color:white;
}

#submit {
	padding: 6px 14px;
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

Js-input {
  position: relative;
}

.title label { 
  position: relative;
	color: white;
	background-color: #1f1f1f;
  margin-bottom: 1vh;
}



</style>