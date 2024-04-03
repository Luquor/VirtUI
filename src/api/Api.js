import config from '../../env.json'
import Toastify from "toastify-js/src/toastify-es.js";
import {ModifyObserver, Toast} from "./Utils.js";
import {useRouter} from "vue-router";

export default class Api {
	
	static INSTANCE;
	static CONFIG;
	static URL_API


	static ROUTE_AUTH = "/auth"


	static GET_VALUE = (token = null) => {
		const headers = {}
		if(token) {headers["Authorization"] = "Bearer " + token}
		return {
			method: "GET",
			headers: headers
		}
	}

	static DELETE_VALUE = (token = null) => {
		const headers = {}
		if(token) {headers["Authorization"] = "Bearer " + token}
		return {
			method: "DELETE",
			headers: headers
		}
	}
	static POST_VALUE = (body, token =null) => {


		const headers = {
			"Content-Type": "application/json"
		}

		if(!token && sessionStorage.getItem("TOKEN")) headers["Authorization"] = "Bearer " + sessionStorage.getItem("TOKEN")


		return {
			method: "POST",
			headers: headers,

			body: JSON.stringify(body),
		}
	}

	static TOAST_ERR_API = Toastify({

		text: "Une erreur API est survenue, merci de contacter un administrateur si le problème persiste",
		close: true,
		position: "right",
		className: "error",
		duration: 2000
	}).showToast;


	async fetchApi(route, param = null, type = "json")
	{
		if(!param) param = Api.GET_VALUE(sessionStorage.getItem("TOKEN"))
		if(!sessionStorage.getItem("TOKEN") && route !== Api.ROUTE_AUTH)
		{
			Toast("Merci de vous connecter pour accéder au service !", 2000, "error")
			await useRouter().push({path: '/auth'})
			return;
		}
		let request = await (await fetch(this.URL_API + route, param).catch((err) => {console.log(err); Api.TOAST_ERR_API()}));
		if(type === "json")
		{
			if(request.status === 404) { return null}
			return request.json();
		}
		return request.text();
	}

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
		let urlApi = "/container/" + name + "/console";
		return await this.fetchApi(urlApi)
	}



	async getContainers() {
		let urlApi = "/containers";
		return await this.fetchApi(urlApi)
	}

	async getContainer(name)
	{
		let urlApi = "/container/" + name;
		return await this.fetchApi(urlApi)
	}

	async getImages()
	{
		let urlApi = "/images";
		return await this.fetchApi(urlApi)
	}


	async getClusters()
	{
		// /clusters
		let urlApi = "/clusters";
		return await this.fetchApi(urlApi)
	}

	async getCluster(cluster)
	{
		let urlApi = "/cluster/" + cluster;
		return await this.fetchApi(urlApi)
	}

	async getContainersFromCluster(clustername)
	{
		// /cluster/{clustername}/container
		let urlApi = "/cluster/" + clustername + "/container";
		return await this.fetchApi(urlApi)
	}

	async getOperation(idOperation) {
		let urlApi = "/operation/" + idOperation
		return this.fetchApi(urlApi)
	}


	// "/container/{container}/actions"
	// ACTION : start, stop, restart
	async controlContainer(containerName, action)
	{
		if(!["start", "stop", "restart"].includes(action)) {
			Toast("L'action n'existe pas", 2000, "error")
			return;
		}
		let json = {"Action": action}
		let urlApi = "/container/" + containerName + "/actions"
		return await this.fetchApi(urlApi, Api.POST_VALUE(json), "json")
	}

	async deleteContainer(containerName)
	{
		let urlApi = "/container/" + containerName;
		return await this.fetchApi(urlApi, Api.DELETE_VALUE(sessionStorage.getItem("TOKEN")), "json")

	}


	async createContainer(name, fingerprint)
	{
		let json = {"name": name, "fingerprint": fingerprint};
		let urlApi = "/container";
		return await this.fetchApi(urlApi, Api.POST_VALUE(json), "json")
	}

	async authUser(username, password)
	{

		let json = {"username": username, "password": password}
		return await this.fetchApi(Api.ROUTE_AUTH, Api.POST_VALUE(json), "json")
	}

}
