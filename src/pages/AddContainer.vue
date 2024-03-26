<script setup>

import JsForm from '../components/Forms/JsForm.vue';
import Group from '../components/Forms/Group.vue';
import JsInput from '../components/Forms/JsInput.vue';


import Api from "../api/Api.js";


import FormValidator from '../api/FormValidator.js';

import Toastify from "toastify-js/src/toastify-es.js";
import {getTextedRuleInvalidate} from "../api/Utils.js";
import {onMounted, ref} from "vue";


const images = ref([]);
const clusters = ref([]);


onMounted(async () => {
  images.value = await Api.getInstance().getImages()
  clusters.value = await Api.getInstance().getClusters()
})

function addContainer(event)
{
	event.preventDefault();
	const formData = new FormData(event.target);
	const formValidator = new FormValidator(formData, [
    {name: 'name', validator: ['required','string','max:15']},
    {name: 'image', validator: ['required', 'string', 'min:3']},
    {name: 'cluster', validator: ['required', 'string']}
  ]);

	let [isValide, unRespectedRules] = formValidator.isValidate();
	if(!isValide)
	{
    console.log(unRespectedRules);
    Toastify({

      text: getTextedRuleInvalidate(unRespectedRules),
      close: true,
      position: "right",
      className: "warning",
      duration: 2000
    }).showToast()

		return;
	}

	(Api.getInstance().createContainer(formData.get("name"), formData.get("image"))).then((elem) => {
    Toastify({

      text: elem,
      close: true,
      position: "right",
      duration: 2000
    }).showToast()
	})




}


</script>
<template>


<Js-form @submit="addContainer($event)">
	<Group>
		<Js-input id="name" label="Nom du container">
			<input id="name" name="name" type="text">
		</Js-input>
		
	</Group>
	<Group>
		<Js-input id="image" label="Images">
			<select name="image" id="image">
				<option v-for="image in images" :value=image.metadata.fingerprint>{{  image.metadata.properties.os }} ({{ image.metadata.properties.release }}) - {{  image.metadata.update_source.alias }}</option>
			</select>
		</Js-input>
	</Group>
  <Group>
    <Js-input id="cluster" label="Cluster">
      <select name="cluster" id="cluster">
        <option v-for="cluster in clusters" :value="cluster.metadata.server_name">{{ cluster.metadata.server_name }}</option>
      </select>
    </Js-input>
  </Group>
	<Group>
		<input ref="buttonSubmit" type="submit" value="Ajouter le conteneur">
	</Group>
</Js-form>


</template>
