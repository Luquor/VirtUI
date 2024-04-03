import Toastify from "toastify-js/src/toastify-es.js";
import Api from "./Api.js";
import {reactive, ref} from "vue";

export function getTextedRuleInvalidate(rules)
{
    let msg = "Formulaire invalide :\n";
    rules.forEach((rule) => {
        msg += "Le champ '" + rule.field + "' est invalide (" + rule.invalidated + ")\n"
    })
    return msg
}

export function Toast(text, duration = 2000, type = "info"){
    Toastify({

        text: text,
        close: true,
        class: type,
        position: "right",
        duration: duration
    }).showToast();

}


export const ModifyObserver = reactive({isUpdatedContainer: false})

export async function getTreeData() {

    const data = await Api.getInstance().getClusters();
    const jsonData = [];
    for (const elem of data) {
        let dataContainer = await Api.getInstance().getContainersFromCluster(elem.metadata.server_name)
        let jsonContainer = []
        if (dataContainer !== null) {
            dataContainer.forEach((container) => {
                jsonContainer.push({cluster: elem.metadata.server_name, name: container.metadata.name})
            })
        } else {
            jsonContainer.push({name: "Vide"})
        }

        jsonData.push({name: elem.metadata.server_name, children: jsonContainer})
    }
    return jsonData
}

export function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

export function changeScheme(url, newScheme = '')
{
    return url.replace(/(^\w+:|^)\/\//, newScheme);
}