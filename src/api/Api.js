export default class Api {
	
	static INSTANCE;
	static URL_API

	static getInstance()
	{

		if(this.INSTANCE == undefined) { this.INSTANCE = new Api();}
		return this.INSTANCE;
	}

	constructor()
	{
		this.URL_API = "http://localhost:8000/"
	}


	async getContainers() {
		let urlApi = this.URL_API + "containers";
		console.log("FETCHING... " + urlApi)
		return await (await fetch(urlApi)).json()
	} 

}