<template>


  <div id="terminal"></div>


</template>

<script>
import {Terminal} from '@xterm/xterm';
import WConsole from "../../api/WConsole.js";
import {watch} from "vue";
import {useRoute} from "vue-router";

//    <link rel="stylesheet" href="node_modules/@xterm/xterm/css/xterm.css" />
import "@xterm/xterm/css/xterm.css"

// TO DO : fix dimension terminal : https://www.npmjs.com/package/xterm-addon-fit

export default {
  mounted() {
    let term;
    term = new Terminal({
      cursorBlink: true, // Optionally, if you want cursor blinking
      cursorStyle: 'underline' // Optionally, customize cursor style
    });
    term.open(document.getElementById('terminal'));

    const textEncoder = new TextEncoder();
    const route = useRoute()


    let wConsole = new WConsole(route.params.container, route.params.cluster);
    wConsole.defineTerminal(term)


    term.onData(data => {
      wConsole.getWebSocket()?.send(textEncoder.encode(data));
    });


    watch(() => route.params.container, (newName, oldName) => {
      term.dispose()
      term = new Terminal({
        cursorBlink: true, // Optionally, if you want cursor blinking
        cursorStyle: 'underline' // Optionally, customize cursor style
      });
      term.open(document.getElementById('terminal'));
      wConsole?.closeSocket(oldName)
      wConsole = new WConsole(newName, route.params.cluster)
      wConsole.defineTerminal(term)
      term.onData(data => {
        wConsole.getWebSocket()?.send(textEncoder.encode(data));
      });
    })


  }
}

</script>