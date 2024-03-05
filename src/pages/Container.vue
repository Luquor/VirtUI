<script setup>

import Terminal from '../components/VueConteneur/Terminal.vue';
import Td from '../components/VueConteneur/Td.vue';
import Nom from '../components/VueConteneur/Nom.vue';

</script>
<template>
    <main>
        <div class="partieagauche">
                <h2>MenuBar</h2>
            </div>
        <div class="partieadroite">
            <div class="info_container">
                <Nom>Oui</Nom>
                <table>
                    <tr>
                        <td>Statut</td>
                        <Td>rectum</Td>
                    </tr>
                    <tr>
                        <td>Code Statut</td>
                        <Td>anus</Td>
                    </tr>
                    <tr>
                        <td>Date de création</td>
                        <Td>caca</Td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <Td>zizi</Td>
                    </tr>
                    <tr>
                        <td>Localisation</td>
                        <Td>bite</Td>
                    </tr>

                    <Terminal>
                        
                    </Terminal>

                </table>

            </div>
            </div>  
    </main>
</template>

<style scoped>
    /* General styles */
body {
    font-family: sans-serif;
  }


main {
    display: flex;
    flex-direction: row;
    padding-top: 3vw;
}

.partieagauche {
    width: 15vw;
    margin: 1em;
  }
  /* Partieadroite container */
  .partieadroite {
    background-color: #f2f2f2;
    padding: 1rem;
  }
  
  /* Info container */
  .info_container {
    display: flex;
    flex-direction: column;
    margin: 1em;
    width: 70vw;
  }
  
  /* H1 title */
  .info_container h1 {
    text-align: left;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
  }
  
  /* Table */
  .info_container table {
    border-collapse: collapse;

  }
  
  .info_container table tr {
    border-bottom: 1px solid #ccc;
  }
  
  .info_container table th {
    background-color: #eee;
    text-align: left;
    padding: 2rem;
  }
  
  .info_container table .droite {
    background-color: #eee;
    text-align: right;
  }
  /* Terminal container */
  .terminal {
    margin-top: 2rem;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 5px;
  }
  
  .terminal h2 {
    text-align: center;
  }
  
  /* Media queries for responsive design */
  @media (max-width: 768px) {
    .partieadroite {
      flex-direction: column-reverse;
    }
  
    .info_container table {
      overflow-x: scroll;
    }
  }
  
</style>