<script setup>

import JsForm from '../components/Forms/JsForm.vue';
import Group from '../components/Forms/Group.vue';
import JsInput from '../components/Forms/JsInput.vue';

import FormValidator from '../api/FormValidator.js';

function addContainer(event)
{
	const formData = new FormData(event.target);
	const formValidator = new FormValidator(formData, [{
		name: 'container_name',
		validation: ['required','string','max:15']
	}]);

	formValidator.isValidate();
}


</script>
<script>

import Api from "../api/Api.js";

const images = await Api.getInstance().getImages();



</script>
<template>


<Js-form @submit="addContainer($event)">
	<Group>
		<Js-input id="container_name" label="Nom du container">
			<input id="container_name" name="container_name" type="text">
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
