# Api

L'api utilise le principe de singleton (pour éviter de créer 500 instance de la même api ..)

``Api.getInstance()``: Récupère l'instance actuelle


## Méthode : 

``getContainers()`` : Retourne la liste des containers.
``getImages()`` : Retourne la liste des images disponible.

``createContainer(name, fingerprint)`` :  
- ``name`` : Nom du conteneur
- ``fingerprint`` : hash de l'image

# Formulaire

## Validation des formulaires


FormValidator, permet de valider (ou non) les champs des formulaires avant n'importe quelle action, ceci permet de résoudre des erreurs avant même d'envoyer une donnée (**La vérification se fait en client et ne doit donc pas être la seul vérification**).

FormValidator prend en paramètres, les données (sous forme de *[FormData](https://developer.mozilla.org/fr/docs/Web/API/FormData)*) ainsi que les règles de validation.

### Les règles de validation

Les règles de validation se présente ainsi :

```js

let formRules = [{
	name: string,
	validator: []string
	}]
```

``name`` : Nom utilisé dans le formulaire (``input name="title"``)  
``validator`` : Tableau de ``string`` qui correspond aux règles de validations.

### Liste des règles disponibles

|  Regle    | vérifie          |
|-----------|------------------|
| string    | si chaine        |
| number    | si nombre        |
| max:[int] | taille > [int]   |
| min:[int] | taille < [int]   |
| required  | si obligatoire   |

### Fonction de validation

La fonction de validation retourne deux informations, un boolean (``true`` si toutes les validations sont passées, ``false`` dans le cas contraire)
et un tableau des champs invalides (si champs invalide, il y a).

### Exemple d'utilisation

```js

	let formData = new FormData(document.getElementById('#monFormulaire'));
	let formRules = [{
		name: "name",
		validator: ["required", "string", "max:15", "min:5"]
	}]

	let formValidator = new FormValidator(formData, formRules);
	console.log("Final");
	let [isValidate, unValidatedRules] = formValidator.isValidate();
	if(!isValidate)
	{
		console.log("Champ invalide", unValidatedRules);
		return;
	}
	console.log("Champ valide")


```

### Exemple de retours (si champs invalide)

```js
[
	{ field: "name", invalidated: "required" }
]
​
```
