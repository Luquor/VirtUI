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
		console.log(config);
		this.CONFIG = config;
		this.URL_API = config.API_URL
	}


	async getContainers() {
		let urlApi = this.URL_API + "containers";
		console.log("FETCHING... " + urlApi)
		return await (await fetch(urlApi)).json()
	} 

}