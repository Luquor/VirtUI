export default class FormValidator 
{

	formData;
	formValidator;

	constructor(formData, formValidator)
	{
		this.formData = formData;
		this.formValidator = formValidator;
		
	}


	isValidate(){
		for(const data of this.formData.entries())
		{
			let [name, value] = data;
			let formValidatorForField = this.formValidator.filter(function (elem) {
				console.log("VERIF : " + elem.name + " - " + name);
				return elem.name == name;
			});
			console.log(formValidatorForField);
		}
	}
	

}