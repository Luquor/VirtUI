export default class {

	rules;
	data;

	constructor(formData, formRules)
	{
		this.data = formData;
		this.rules = formRules;	
	}

	isValidate()
	{
		for(const [name, value] of this.data) {
			let validator = this.rules.find((elem) => {
				return elem.name === name;
			});

			if(validator != undefined)
			{
				let isValidate = this.isValidateFor(validator, value)
				if(!isValidate[0])
				{
					return isValidate;
				}
			}
		};
		return [true, undefined];
	}

	// To Do : Ajouter des règles et debug règle avec : (value)
	isValidateFor(rule, value)
	{
		const invalidatedRules = [];
		return [rule.validator.every((elem) => {
			let [ruleName, ruleVal] = elem.split(":");
			switch (ruleName) {
				case "required":
					if(value == '') { invalidatedRules.push({field: rule.name, invalidated: 'required'})} 
					return (value !== '')
				case "string":
					if(typeof value !== "string") { invalidatedRules.push({field: rule.name, invalidated: 'string'})} 
					return typeof value === "string";
				case "number":
					if(typeof value !== "number") { invalidatedRules.push({field: rule.name, invalidated: 'number'})}
					return typeof value === "number"
				case 'max':
					if(value.length >= ruleVal) { invalidatedRules.push({field: rule.name, invalidated: 'max'})} 
					return value.length <= ruleVal;
				case 'min':
					if(value.length < ruleVal) { invalidatedRules.push({field: rule.name, invalidated: 'min'})} 
					return value.length > ruleVal;
				default:
					return true;
					break;
			}
		}), invalidatedRules];
	}

}