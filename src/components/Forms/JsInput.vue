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
	color: white;
	font-size: 0.9em;

}

</style>