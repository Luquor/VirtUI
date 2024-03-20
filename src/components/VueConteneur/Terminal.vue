<template>
<body>
    <link rel="stylesheet" href="node_modules/@xterm/xterm/css/xterm.css" />
    <div id="terminal"></div>
</body>

</template>

<script>
    import { Terminal } from '@xterm/xterm';
    import WConsole from "../../api/WConsole.js";
    import {watch} from "vue";
    import {useRoute} from "vue-router";


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



          let wConsole = new WConsole(route.params.name);
          wConsole.defineTerminal(term)


          term.onData(data => {
            wConsole.getWebSocket()?.send(textEncoder.encode(data));
          });


          watch(() => route.params.name, (newName, oldName) => {
            term.dispose()
            term = new Terminal({
              cursorBlink: true, // Optionally, if you want cursor blinking
              cursorStyle: 'underline' // Optionally, customize cursor style
            });
            term.open(document.getElementById('terminal'));
            wConsole?.closeSocket(oldName)
            wConsole = new WConsole(newName)
            wConsole.defineTerminal(term)
            term.onData(data => {
              wConsole.getWebSocket()?.send(textEncoder.encode(data));
            });
          })







        }
    }

</script>