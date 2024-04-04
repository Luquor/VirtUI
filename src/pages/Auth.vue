<script setup>

import JsInput from "../components/Forms/JsInput.vue";
import JsForm from "../components/Forms/JsForm.vue";
import Group from "../components/Forms/Group.vue";
import FormValidator from "../api/FormValidator.js";
import Toastify from "toastify-js/src/toastify-es.js";
import {getTextedRuleInvalidate, ModifyObserver, sleep, Toast} from "../api/Utils.js";
import Api from "../api/Api.js";

async function auth(event) {

  event.preventDefault();
  const formData = new FormData(event.target);
  const formValidator = new FormValidator(formData, [
    {name: 'username', validator: ['required', 'string', 'min:2']},
    {name: 'password', validator: ['required', 'string', 'min:2']},
  ]);

  let [isValide, unRespectedRules] = formValidator.isValidate();
  if (!isValide) {
    console.log(unRespectedRules);
    Toastify({

      text: getTextedRuleInvalidate(unRespectedRules),
      close: true,
      position: "right",
      className: "warning",
      duration: 2000
    }).showToast()


    return;
  }

  const TOKEN = (await Api.getInstance().authUser(formData.get("username"), formData.get("password")))?.Token;

  if(!TOKEN)
  {
    Toast("Utilisateur, ou mot de passe invalide...", 2000, "error")
    return;
  }

  if(sessionStorage.getItem("TOKEN"))
  {
    Toast("Reconnexion...", 800, "warning")
  }else
  {
    Toast("Connexion...", 800)
  }

  sessionStorage.setItem("TOKEN", TOKEN)
  ModifyObserver.isUpdatedContainer = true;



}





</script>

<template>

  <Js-form class="formAddContainer" @submit="auth($event)">
    <Group>
      <Js-input class="title" label="Nom d'utilisateur">
        <input id="username" name="username" type="text">
      </Js-input>

    </Group>
    <Group>
      <Js-input class="title" label="Mot de passe">
        <input id="password" name="password" type="password">
      </Js-input>

    </Group>
    <Group>
      <input id="submit" ref="buttonSubmit" type="submit" value="Se connecter">
    </Group>
  </Js-form>




</template>

<style scoped>

</style>