<template>

	<form>
		<slot />
	</form>


</template>
<style>
form {

	padding: 15px;
	width: 100%;
	
}
form div.form-group
{
	display: flex;
	margin: 20px;
}
form div.form-group input, form div.form-group select {
	border: none;
	padding: 5px 10px;
	background-color: white;
	border: 1px solid black
}

form div.form-group input[type=submit] {
	background-color: #059862;

}

form div.form-group input[type=submit]:hover {
		background-color: #05b675;
	}

</style>