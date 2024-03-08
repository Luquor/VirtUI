<script setup>

import JsForm from '../components/Forms/JsForm.vue';
import Group from '../components/Forms/Group.vue';
import JsInput from '../components/Forms/JsInput.vue';

import FormValidator from '../api/FormValidator.js';

function addContainer(event)
{
	event.preventDefault();
	const formData = new FormData(event.target);
	const formValidator = new FormValidator(formData, [{
		name: 'name',
		validator: ['required','string','max:15']
	}], {
		"name": 'image',
		"validator": ['required', 'string']
	});

	let [isValide, unRespectedRules] = formValidator.isValidate();
	if(!isValide)
	{
		console.log("Invalide formulaire data");
		console.log(unRespectedRules);
		return;
	}

	(Api.getInstance().createContainer(formData.get("name"), formData.get("image"))).then((elem) => {
		console.log(elem);
	})

}


</script>
<script>

import Api from "../api/Api.js";

const images = await Api.getInstance().getImages();



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
		<input ref="buttonSubmit" type="submit" value="Ajouter le conteneur">
	</Group>
</Js-form>


</template>
