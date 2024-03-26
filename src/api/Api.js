import config from '../../env.json'
import Toastify from "toastify-js/src/toastify-es.js";
import {Toast} from "./Utils.js";

export default class Api {
	
	static INSTANCE;
	static CONFIG;
	static URL_API


	static POST_VALUE = (body) => {
		return {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},

			body: body,
		}
	}

	static TOAST_ERR_API = 	Toastify({

		text: "Une erreur API est survenue, merci de contacter un administrateur si le problème persiste",
		close: true,
		position: "right",
		className: "error",
		duration: 2000
	}).showToast();

	static getInstance()
	{

		if(this.INSTANCE === undefined) { this.INSTANCE = new Api();}
		return this.INSTANCE;
	}

	constructor()
	{
		this.CONFIG = config;
		this.URL_API = config.API_URL
	}

	async getWebSocketsConsoleURL(name)
	{
		let urlApi = this.URL_API + "/container/" + name + "/console";
		return await (await fetch(urlApi).catch(Api.TOAST_ERR_API)).json();
	}



	async getContainers() {
		let urlApi = this.URL_API + "/containers";
		return await (await fetch(urlApi).catch(Api.TOAST_ERR_API)).json()
	} 

	async getContainer(name)
	{
		let urlApi = this.URL_API + "/container/" + name;
		return await (
			await fetch(urlApi).catch(Api.TOAST_ERR_API)).json();
	}

	async getImages()
	{
		let urlApi = this.URL_API + "/images";
		return await (await fetch(urlApi).catch(Api.TOAST_ERR_API)).json()
	}


	async getClusters()
	{
		// /clusters
		let urlApi = this.URL_API + "/clusters";
		return await (await fetch(urlApi).catch(Api.TOAST_ERR_API)).json()
	}

	async getCluster(cluster)
	{
		let urlApi = this.URL_API + "/cluster/" + cluster;
		return await (await fetch(urlApi).catch(Api.TOAST_ERR_API)).json()
	}

	async getContainersFromCluster(clustername)
	{
		// /cluster/{clustername}/container
		let urlApi = this.URL_API + "/cluster/" + clustername + "/container";
		return await (await fetch(urlApi).catch(Api.TOAST_ERR_API)).json()
	}

	// "/container/{container}/actions"
	// ACTION : start, stop, restart
	async controlContainer(containerName, action)
	{
		if(!["start", "stop", "restart"].includes(action)) {
			Toast("L'action n'existe pas", 2000, "error")
			return;
		}
		let json = JSON.stringify({"action": action})
		let urlApi = this.URL_API + "/container/" + containerName + "/actions"
		return await (await fetch(urlApi, Api.POST_VALUE(json)).catch(Api.TOAST_ERR_API)).text();
	}


	async createContainer(name, fingerprint)
	{
		let json = JSON.stringify({"name": name, "fingerprint": fingerprint});
		let urlApi = this.URL_API + "/container";
		return await (await fetch(urlApi, Api.POST_VALUE(json)).catch(Api.TOAST_ERR_API)).text();
	}

}
