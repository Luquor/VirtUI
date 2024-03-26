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

	// (Api.getInstance().createContainer(formData.get("name"), formData.get("image"))).then((elem) => {
	// 	console.log(elem);
	// })

}


</script>
<script>

import Api from "../api/Api.js";

const images =[];



</script>
<template>


<Js-form class="formAddContainer" @submit="addContainer($event)">
	<Group>
		<Js-input class="title" label="Nom du container">
			<br>
			<input class="name" name="name" type="text">
		</Js-input>
		
	</Group>
	<Group>
		<Js-input class="title" label="Images">
			<br>
			<select name="image" id="image">
				<option v-for="image in images" :value=image.metadata.fingerprint>{{  image.metadata.properties.os }} ({{ image.metadata.properties.release }}) - {{  image.metadata.update_source.alias }}</option>
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

.title label { 
	color: white;
	background-color: #1f1f1f;
}



</style>