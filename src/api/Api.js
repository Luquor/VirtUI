import config from '../../env.json'

export default class Api {
	
	static INSTANCE;
	static CONFIG;
	static URL_API

	static getInstance()
	{

		if(this.INSTANCE == undefined) { this.INSTANCE = new Api();}
		return this.INSTANCE;
	}

	constructor()
	{
		this.CONFIG = config;
		this.URL_API = config.API_URL
	}


	async getContainers() {
		let urlApi = this.URL_API + "/containers";
		return await (await fetch(urlApi)).json()
	} 


	async getImages()
	{
		let urlApi = this.URL_API + "/images";
		return await (await fetch(urlApi)).json()
	}

	async createContainer(name, fingerprint)
	{
		let json = JSON.stringify({"name": name, "fingerprint": fingerprint});
		let urlApi = this.URL_API + "/container";
		return await (await fetch(urlApi, {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},

			body: json,
		  })).text();
	}

}
