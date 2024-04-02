<script setup>

const props = defineProps(['label', 'id']);


</script>

<template>

	<div>
		<label :for=props.id>{{  props.label }}</label>
		<slot></slot>
	</div>


</template>
<style scoped>
div 
{
	display: flex;
	position: relative;
	flex-direction: column;
}
label 
{
	color: black;
	font-size: 0.9em;
	position: absolute;
	top: -10px;
	left: 5px;
	background-color: white;

}

</style>