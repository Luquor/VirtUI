<script setup>

import FormValidator from '../api/FormValidator.js';

function addContainer(event)
{
	let formData = new FormData(event.target);
	let formRules = [{
		name: "name",
		validator: ["required", "string", "max:15"]
	}]

	let formValidator = new FormValidator(formData, formRules);
	console.log("Final");
	let [isValidate, unValidatedRules] = formValidator.isValidate();
	if(!isValidate)
	{
		console.log("Champ invalide", unValidatedRules);
		return;
	}
	console.log("FETCHING...")

}

</script>


<template>

	<form @submit.prevent="addContainer($event)">

		<input type="text" name="name">
		<select name="image">
			<option value="Fdm566ZvhZuqfZKKFHfIFHz">Ubuntu (22.02)</option>
		</select>
		<input type="submit" value="Demander">

	</form>

</template>