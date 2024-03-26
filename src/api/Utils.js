import Toastify from "toastify-js/src/toastify-es.js";

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

export function changeScheme(url, newScheme = '')
{
    return url.replace(/(^\w+:|^)\/\//, newScheme);
}